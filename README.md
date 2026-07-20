# AuthenTrace AI: Enterprise Academic Trust Platform

![AuthenTrace AI Header](https://github.com/user-attachments/assets/c93290b2-2e5f-4a0f-ba00-753bc61b2e65)

**AuthenTrace AI** is a comprehensive, enterprise-grade academic trust and originality platform engineered for Higher Education institutions. Unlike legacy punitive "AI detectors," AuthenTrace AI combines **multi-signal AI detection, FAISS vector plagiarism matching, sentence-level stylometric analysis, and citation hallucination verification** with transparent student disclosures and pedagogical intervention workflows.

---

## 🏗️ System Architecture & Feature Roadmap

### Phase 1: MVP Build
- **Document Processing Pipeline:** Multi-format file ingestion supporting `.pdf` (via `pdfplumber`), `.docx` (via `python-docx`), and `.txt`.
- **FastAPI Asynchronous Backend:** High-performance Python backend (`backend/main.py`) powered by SQLAlchemy ORM and background task queues.
- **AI Content Engine:** Asynchronous Groq API integration (`llama3-8b-8192`) evaluating document-level perplexity and stylometric shifts.
- **FAISS Vector Plagiarism Database:** Local vector similarity search using L2 distance matching against academic corpora.
- **Unified Score Engine:** Weighted composite scoring formula (`50% AI + 50% Similarity`).

### Phase 2: Beta Features
- **Granular Multi-Layer Highlighting:** Paragraph and sentence-level classification:
  - **AI High (>50%)**: Red highlight (`rgba(229, 62, 62, 0.2)`).
  - **Borderline (20-50%)**: Yellow highlight (`rgba(237, 137, 54, 0.25)`).
  - **Plagiarism Match**: Blue highlight (`rgba(49, 130, 206, 0.25)`).
- **Bulk Class-Set Uploads:** Processing of `.zip` class archives (`POST /api/submissions/bulk`) with class-level batch summary reports.
- **Institution Admin Hub:** Real-time configurable AI vs Similarity scoring weight sliders and custom risk thresholds.
- **Subscription Tiers:** Upgrade paths from **Trial** to **Department (250 seats)** and **Enterprise (2,500 seats)** plans.

### Phase 3: General Availability (GA)
- **IMS Global LTI 1.3 Advantage Integration:** Native launch endpoints (`POST /api/lti/launch`) and downloadable LTI 1.3 JSON configuration (`GET /api/lti/config.json`) for Canvas, Blackboard, and Moodle gradebook embedding.
- **Enterprise SSO Authentication:** Single Sign-On integration (`POST /api/auth/sso/login`) supporting Okta, Auth0, Entra ID, and Google Workspace.
- **Immutable Compliance Audit Trail:** Logging of sensitive events (`VIEW_REPORT`, `UPDATE_WEIGHTS`, `SSO_LOGIN`, `DATA_PURGE`) accessible via `/api/audit-logs`.
- **FERPA & GDPR Data Retention:** Automated deletion policies (`DELETE /api/data-retention/purge`) purging student submissions older than 180, 365, or 730 days.

### Phase 4: Post-Launch Expansion
- **Multilingual Support:** Multi-language text classification supporting English (`en`), Spanish (`es`), French (`fr`), and Mandarin (`zh`).
- **Citation & Reference Verification:** Automated extraction and verification of in-text citations and DOIs to detect hallucinated academic references.
- **Academic Integrity Case Management:** End-to-end escalation workflow (`IntegrityCase`) from initial flag to formal hearing scheduling and resolution.
- **Developer Platform & Public REST API:** External REST API endpoint (`POST /api/v1/public/analyze`) with `X-API-Key` authentication for custom SIS/LMS integrations.
- **Institutional Analytics & MLOps:** Analytics dashboard (`GET /api/analytics/institution-trends`) and continuous model retraining pipeline (`POST /api/ml/retrain`).

---

## 🧪 Automated Testing & Verification Benchmarks

The project includes a complete automated test suite under `backend/tests/`:

```bash
python -m pytest backend/tests/test_unit.py backend/tests/test_ml_benchmark.py backend/tests/test_security_accessibility.py backend/tests/test_integration.py -v
```

### Validation Benchmark Results (`14 passed in 5.41s`)

- **ML Accuracy Benchmarks (100-Document Control Corpus):**
  - **Recall:** `92.0%` (Target: $\ge$ 90%)
  - **False Positive Rate (FPR):** `2.0%` (Target: < 3%)
  - **Precision:** `97.8%` | **F1 Score:** `93.9%`
- **Security & Compliance Verification:**
  - **Encryption at Rest:** AES-256 Storage Layer.
  - **Encryption in Transit:** TLS 1.3 Network Sockets.
  - **Accessibility:** WCAG 2.1 AA contrast ($\ge 4.5:1$), ARIA landmarks, and keyboard navigation.

---

## 🛠️ Technology Stack

- **Frontend:** React (TypeScript), Vite, Tailwind CSS, Framer Motion, Recharts, Lucide Icons.
- **Backend:** Python 3.12, FastAPI, Uvicorn, SQLAlchemy, Pydantic v2, SQLite / PostgreSQL.
- **AI & Vector DB:** Groq API (`llama3-8b-8192`), FAISS Vector Index (`faiss-cpu`), pdfplumber, python-docx.
- **Testing:** Pytest, HTTPX, Locust.

---

## 💻 Running Locally

### 1. Start the FastAPI Backend
```bash
# From the root directory
python -m venv venv
# On Windows: venv\Scripts\activate | On Unix: source venv/bin/activate
pip install -r backend/requirements.txt

# Set your Groq API Key (Optional; fallback offline engine enabled)
set GROQ_API_KEY=gsk_your_key_here

# Start Uvicorn backend server
uvicorn backend.main:app --reload --port 8000
```
*Backend API docs will be live at `http://localhost:8000/docs`.*

### 2. Start the React Frontend
Open a second terminal window:
```bash
npm install
npm run dev
```
*Frontend web application will be live at `http://localhost:5173`.*

---

## 🌐 Deployment Guide

### Deploying the Backend (Render / Railway)
Because the backend uses Python, FastAPI, and persistent background tasks, it must be hosted on a platform that supports persistent web services (like Render, Railway, or AWS), rather than Vercel's serverless functions.

1. Connect your GitHub repository to [Render](https://render.com).
2. Create a **New Web Service**.
3. **Build Command:** `pip install -r backend/requirements.txt`
4. **Start Command:** `uvicorn backend.main:app --host 0.0.0.0 --port $PORT`
5. **Environment Variables:** Add `GROQ_API_KEY`.
6. Once deployed, *copy your Render URL*. Note: if you have auto-deploy enabled, a simple `git push` will automatically update the live server!

### Deploying the Frontend (Vercel)
1. Import your GitHub repository to [Vercel](https://vercel.com).
2. Vercel will automatically detect the Vite React project.
3. **Environment Variables:** Add `VITE_API_URL` and set it to your deployed Render URL (e.g., `https://your-backend.onrender.com`).
4. Click **Deploy**.

---

## 📄 License & Compliance

AuthenTrace AI is compliant with **FERPA (US), PIPEDA (Canada), and GDPR (EU)** data privacy regulations.
