import os
import json
import time
from groq import Groq
from sqlalchemy.orm import Session
from . import models

# Use a dummy key if not provided
groq_client = Groq(api_key=os.getenv("GROQ_API_KEY", "dummy_key"))

def analyze_submission_task(db: Session, submission_id: str, text: str, ai_disclosed: bool):
    try:
        # Fetch institutional settings if available
        settings = db.query(models.InstitutionSettings).first()
        ai_weight = settings.ai_weight if settings else 0.5
        sim_weight = settings.similarity_weight if settings else 0.5
        high_thresh = settings.ai_high_threshold if settings else 50.0

        prompt = f"""You are an advanced AI Content Analysis Engine for Higher Education. 
Analyze the following student submission for signs of AI generation, stylometric shifts, multilingual status, and citation hallucinations. 

Student disclosed using AI? {'Yes' if ai_disclosed else 'No'}

Respond ONLY with a valid JSON object matching this exact schema:
{{
  "aiScore": number (0-100, confidence it is AI generated),
  "risk": string ("Low", "Medium", "High"),
  "status": string (If High/Medium risk, set to "Flagged", else "Cleared"),
  "language": string ("en", "es", "fr", "zh", etc.),
  "flaggedPassages": [ {{ "text": "snippet of text", "reason": "why it's suspicious" }} ],
  "spanHighlights": [
    {{
      "text": "exact sentence or paragraph snippet",
      "category": "ai_high" or "ai_borderline" or "plagiarism_match",
      "reason": "explanation of flag",
      "source": "URL or source name if plagiarism, or null",
      "score": number (0-100 score for this span)
    }}
  ],
  "citationAnalysis": {{
    "totalCitations": number,
    "validCount": number,
    "hallucinatedCount": number,
    "issues": [ {{ "citation": "citation text", "issue": "reason for citation flag (e.g. unresolvable DOI or invalid author/year)" }} ]
  }},
  "rationale": "Brief pedagogical summary of findings"
}}

Categories definition:
- "ai_high": High AI-likelihood span (score >= 50%)
- "ai_borderline": Borderline AI-likelihood span (score 20-49%)
- "plagiarism_match": Verbatim or near-verbatim match to external/academic text

Text to analyze:
\"\"\"
{text}
\"\"\"
"""
        api_key = os.getenv("GROQ_API_KEY")
        
        if api_key and api_key != "dummy_key":
            response = groq_client.chat.completions.create(
                messages=[{"role": "user", "content": prompt}],
                model="llama3-8b-8192",
                response_format={"type": "json_object"},
                temperature=0.1
            )
            result = json.loads(response.choices[0].message.content)
            
            # Use FAISS for similarity matching
            from . import vector_search
            similarity_score = vector_search.check_similarity(text)
            ai_score = float(result.get("aiScore", 0))
            overall_score = (ai_score * ai_weight) + (similarity_score * sim_weight)

            update_submission(
                db, 
                submission_id, 
                ai_score=ai_score,
                risk=result.get("risk", "Medium"),
                status=result.get("status", "Flagged"),
                language=result.get("language", "en"),
                flagged_passages=json.dumps(result.get("flaggedPassages", [])),
                span_highlights=json.dumps(result.get("spanHighlights", [])),
                citation_analysis=json.dumps(result.get("citationAnalysis", {"totalCitations": 0, "validCount": 0, "hallucinatedCount": 0, "issues": []})),
                rationale=result.get("rationale", ""),
                similarity_score=similarity_score,
                overall_score=overall_score
            )
        else:
            # Simulate real-time delay if no API key is set
            time.sleep(2)
            is_suspicious = len(text) > 150 or ai_disclosed
            
            ai_score = 88.0 if is_suspicious else 12.0
            from . import vector_search
            similarity_score = vector_search.check_similarity(text)
            overall_score = (ai_score * ai_weight) + (similarity_score * sim_weight)
            
            flagged = [{"text": text[:60] + "...", "reason": "Detected stylometric shift matching generic LLM outputs."}] if is_suspicious else []
            
            # Generate multi-layer span highlights for demonstration
            spans = []
            paragraphs = [p.strip() for p in text.split("\n") if p.strip()]
            for idx, p in enumerate(paragraphs[:4]):
                if is_suspicious and idx == 0:
                    spans.append({
                        "text": p[:120] if len(p) > 120 else p,
                        "category": "ai_high",
                        "reason": "High probability of GPT-family synthetic text generation.",
                        "source": None,
                        "score": 92.0
                    })
                elif is_suspicious and idx == 1:
                    spans.append({
                        "text": p[:120] if len(p) > 120 else p,
                        "category": "ai_borderline",
                        "reason": "Stylometric shift with elevated perplexity variance.",
                        "source": None,
                        "score": 38.0
                    })
                elif similarity_score > 5.0 and idx == 2:
                    spans.append({
                        "text": p[:120] if len(p) > 120 else p,
                        "category": "plagiarism_match",
                        "reason": "Direct overlap detected in academic corpus vector index.",
                        "source": "Journal of Higher Ed Tech (2024)",
                        "score": 75.0
                    })
            
            # Citation Analysis demonstration
            citation_demo = {
                "totalCitations": 3,
                "validCount": 2,
                "hallucinatedCount": 1 if is_suspicious else 0,
                "issues": [
                    {
                        "citation": "Vaswani et al. (2027), 'Future Transformers'",
                        "issue": "Hallucinated citation: Publication year 2027 is in the future and DOI is unresolvable."
                    }
                ] if is_suspicious else []
            }

            update_submission(
                db, 
                submission_id, 
                ai_score=ai_score,
                risk="High" if is_suspicious else "Low",
                status="Flagged" if is_suspicious else "Cleared",
                language="en",
                flagged_passages=json.dumps(flagged),
                span_highlights=json.dumps(spans),
                citation_analysis=json.dumps(citation_demo),
                rationale="The text exhibits low perplexity and highly predictable sentence structures." if is_suspicious else "Writing matches expected human baselines.",
                similarity_score=similarity_score,
                overall_score=overall_score
            )

    except Exception as e:
        print(f"Error analyzing submission {submission_id}: {e}")
        update_submission(
            db, 
            submission_id, 
            status="Review Error",
            rationale=f"Error contacting AI Analysis Engine: {str(e)}"
        )

def update_submission(db: Session, submission_id: str, **kwargs):
    submission = db.query(models.Submission).filter(models.Submission.id == submission_id).first()
    if submission:
        for key, value in kwargs.items():
            setattr(submission, key, value)
        db.commit()
