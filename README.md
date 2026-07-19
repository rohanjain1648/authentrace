# Authentraceio AI: Academic Trust Platform for Higher Education

![Authentraceio AI](https://github.com/user-attachments/assets/c93290b2-2e5f-4a0f-ba00-753bc61b2e65) <!-- Replace with an actual screenshot if desired -->

**Authentraceio AI** is a comprehensive, enterprise-grade academic trust platform designed for Higher Education institutions (inspired by institutional responses in Alberta, Canada, and global AI-integration policies). 

Unlike traditional "AI Detectors" that often result in false positives and adversarial student-teacher relationships, Authentraceio AI is built on **pedagogical collaboration**. It combines state-of-the-art LLM analysis with transparent student disclosures and proactive professor interventions, ensuring academic integrity is maintained as a learning process rather than a purely punitive one.

---

## 🚀 Key Features

### 👨‍🏫 Professor Portal
- **Writing DNA Analysis**: Tracks a student's stylometric baseline across the semester. Instead of just flagging a single paper, the system detects critical structural deviations in an individual's writing over time.
- **Citation Verification Engine**: Automatically cross-references citations in submissions. The system specifically highlights "Citation Hallucinations"—a common byproduct of unedited LLM generation.
- **Triage Queue & Intervention Workflow**: Professors can review flagged content and immediately trigger pedagogical interventions (e.g., "Schedule Oral Defense", "Request Revision") rather than jumping straight to academic discipline.

### 🎓 Student Portal
- **Transparent AI Disclosures**: Students can transparently declare if they used AI (e.g., for grammar checking, outlining, or brainstorming). This builds a provenance graph and fosters a culture of honesty.
- **Feedback & Appeals Inbox**: Students receive clear, actionable feedback if their work triggers an alert, along with the ability to explain their writing process or file an appeal.

### 🏛️ Admin Portal
- **University-Wide Integrity Cases**: A centralized management system for tracking ongoing academic integrity investigations across all departments.
- **Faculty Management & Literacy**: Analytics showing aggregate AI flagging rates per department/professor to identify where additional AI-literacy training or policy adjustments are needed.

---

## 🛠️ Technology Stack

- **Frontend**: React (TypeScript), Vite, React Router, Framer Motion (Animations), Recharts (Data Visualization), React Three Fiber (3D Elements).
- **Backend**: Node.js, Express.js.
- **AI Engine**: [Groq API](https://groq.com/) (using the `llama3-8b-8192` model) for real-time text analysis, stylometric evaluation, and citation verification.

---

## 💻 Running Locally

To run the project on your local machine, you will need to start both the frontend and backend servers.

### Prerequisites
- Node.js installed (v18 or higher recommended).
- A free Groq API key from [console.groq.com](https://console.groq.com/).

### 1. Setup the Backend
Open a terminal in the root of the project and navigate to the `server` directory:
```bash
cd server
npm install
```
Create a `.env` file inside the `server` directory and add your Groq API key:
```env
GROQ_API_KEY=gsk_your_actual_key_here
```
Start the backend server:
```bash
node server.js
```
*The backend will run on `http://localhost:3001`.*

### 2. Setup the Frontend
Open a **second terminal** in the root of the project:
```bash
npm install
npm run dev
```
*The frontend will run on `http://localhost:5173`.*

---

## 🌐 Deployment Guide

This architecture is designed to be easily deployed using **Vercel** (for the frontend) and **Render** (for the backend).

### Step 1: Deploy Backend to Render
1. Go to [Render.com](https://render.com/) and create a **New Web Service**.
2. Connect your GitHub repository (`rohanjain1648/authentraceio`).
3. Set the **Root Directory** to `server`.
4. Set the Build Command to `npm install` and Start Command to `node server.js`.
5. Under Environment Variables, add `GROQ_API_KEY` with your actual key.
6. Deploy and copy the live Render URL (e.g., `https://authentraceio-ai-backend.onrender.com`).

### Step 2: Deploy Frontend to Vercel
1. Go to [Vercel.com](https://vercel.com/) and create a **New Project**.
2. Import your GitHub repository (`rohanjain1648/authentraceio`).
3. Vercel will automatically detect it as a Vite project.
4. Under Environment Variables, add `VITE_API_URL` and paste your live Render URL.
5. Click **Deploy**.

*Note: The frontend code is already configured to dynamically use `import.meta.env.VITE_API_URL` when in production!*

---

## 📖 Pedagogical Philosophy

Authentraceio AI was heavily influenced by emerging policies from institutions like Mount Royal University and the University of Calgary. The core philosophy is that AI detection alone is fundamentally flawed due to false positives and a lack of context. Authentraceio AI shifts the focus from "catching cheaters" to facilitating conversations about the ethical use of AI in academia.
