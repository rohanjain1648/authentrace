require('dotenv').config();
const express = require('express');
const cors = require('cors');
const Groq = require('groq-sdk');

const app = express();
app.use(cors());
app.use(express.json());

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY || 'dummy_key',
});

// In-memory database
let submissions = [
  { 
    id: 'SUB-1029', 
    student: 'Alex Johnson', 
    assignment: 'Final Thesis Draft', 
    date: '2 hours ago', 
    risk: 'High', 
    status: 'Flagged',
    text: "The rapid advancement of artificial intelligence has precipitated a paradigm shift...",
    aiDisclosed: false,
    aiScore: 94,
    feedback: []
  }
];
let counter = 1030;

app.get('/api/submissions', (req, res) => {
  res.json(submissions);
});

app.post('/api/submissions', async (req, res) => {
  const { student, assignment, text, aiDisclosed } = req.body;
  
  if (!text) {
    return res.status(400).json({ error: 'Text is required' });
  }

  const newSubmission = {
    id: `SUB-${counter++}`,
    student: student || 'Demo Student',
    assignment: assignment || 'Untitled Assignment',
    date: 'Just now',
    text,
    aiDisclosed,
    status: 'Analyzing',
    risk: 'Unknown',
    aiScore: 0,
    feedback: []
  };
  
  // Add to DB immediately as 'Analyzing'
  submissions.unshift(newSubmission);

  // Run analysis asynchronously so we don't block the response
  analyzeSubmission(newSubmission.id, text, aiDisclosed).catch(console.error);

  res.status(202).json(newSubmission);
});

async function analyzeSubmission(id, text, aiDisclosed) {
  try {
    const prompt = `You are an advanced AI Content Analysis Engine for Higher Education. 
Analyze the following student submission for signs of AI generation, stylometric shifts, and citation hallucinations. 

Student disclosed using AI? ${aiDisclosed ? 'Yes' : 'No'}

Respond ONLY with a valid JSON object matching this exact schema:
{
  "aiScore": number (0-100, confidence it is AI generated),
  "risk": string ("Low", "Medium", "High"),
  "status": string (If High/Medium risk, set to "Flagged", else "Cleared"),
  "flaggedPassages": [ { "text": "snippet of text", "reason": "why it's suspicious" } ],
  "rationale": "Brief pedagogical summary of findings"
}

Text to analyze:
"""
${text}
"""
`;

    // Attempt to call Groq API
    if (process.env.GROQ_API_KEY && process.env.GROQ_API_KEY !== 'dummy_key') {
      const response = await groq.chat.completions.create({
        messages: [{ role: 'user', content: prompt }],
        model: 'llama3-8b-8192',
        response_format: { type: 'json_object' },
        temperature: 0.1
      });

      const result = JSON.parse(response.choices[0].message.content);
      
      updateSubmissionInDb(id, result);
    } else {
      // Simulate real-time delay if no API key is set
      setTimeout(() => {
        const isSuspicious = text.length > 200 || aiDisclosed;
        updateSubmissionInDb(id, {
          aiScore: isSuspicious ? 88 : 12,
          risk: isSuspicious ? 'High' : 'Low',
          status: isSuspicious ? 'Flagged' : 'Cleared',
          flaggedPassages: isSuspicious ? [{ text: text.substring(0, 50) + "...", reason: "Detected stylometric shift matching generic LLM outputs." }] : [],
          rationale: isSuspicious ? "The text exhibits low perplexity and highly predictable sentence structures typical of LLM generation." : "Writing matches expected human baselines."
        });
      }, 3000);
    }
  } catch (error) {
    console.error('Error analyzing submission:', error);
    updateSubmissionInDb(id, {
      aiScore: 0,
      risk: 'Medium',
      status: 'Review Error',
      flaggedPassages: [],
      rationale: 'Error contacting AI Analysis Engine.'
    });
  }
}

function updateSubmissionInDb(id, result) {
  const subIndex = submissions.findIndex(s => s.id === id);
  if (subIndex > -1) {
    submissions[subIndex] = { ...submissions[subIndex], ...result };
  }
}

app.put('/api/submissions/:id/intervene', (req, res) => {
  const { id } = req.params;
  const { status, note } = req.body;
  
  const sub = submissions.find(s => s.id === id);
  if (!sub) return res.status(404).json({ error: 'Not found' });

  sub.status = status;
  if (note) {
    sub.feedback.push({ date: new Date().toISOString(), note });
  }

  res.json(sub);
});

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Authentraceio AI Backend running on port ${PORT}`);
});
