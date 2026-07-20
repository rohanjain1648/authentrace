import pytest
import io
from backend.utils import extract_text_from_file
from backend.vector_search import check_similarity
from backend.schemas import SubmissionResponse, CitationAnalysis, SpanHighlight
from datetime import datetime

def test_extract_text_plain_text():
    sample_bytes = b"This is a sample human essay written for academic submission."
    result = extract_text_from_file(sample_bytes, "essay.txt")
    assert result == "This is a sample human essay written for academic submission."

def test_vector_similarity_search():
    # Exact match text from mock index
    query_text = "The rapid advancement of artificial intelligence has precipitated a paradigm shift in education."
    similarity = check_similarity(query_text)
    assert isinstance(similarity, float)
    assert similarity >= 0.0 and similarity <= 100.0

def test_schema_serialization():
    data = {
        "id": "SUB-1001",
        "student": "Alex Johnson",
        "assignment": "Final Thesis",
        "ai_disclosed": False,
        "date": datetime.now(),
        "status": "Flagged",
        "risk": "High",
        "ai_score": 92.5,
        "similarity_score": 15.0,
        "overall_score": 53.75,
        "rationale": "High AI generation likelihood.",
        "language": "en",
        "flagged_passages": [{"text": "Sample text", "reason": "High perplexity"}],
        "span_highlights": [{"text": "Span text", "category": "ai_high", "reason": "LLM output", "score": 92.5}],
        "citation_analysis": CitationAnalysis(total_citations=2, valid_count=2, hallucinated_count=0, issues=[]),
        "feedback": []
    }
    obj = SubmissionResponse(**data)
    assert obj.id == "SUB-1001"
    assert obj.overall_score == 53.75
    assert obj.citation_analysis.total_citations == 2
