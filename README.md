# 🧠 Private Knowledge Q&A

A mini AI-powered workspace where users can upload documents, ask
questions, and receive answers grounded in their own data.

Live Demo: - 🔗 Frontend: https://private-knowledge-qa-red.vercel.app/ -
🔗 Backend API:
https://private-knowledge-qa-production-f941.up.railway.app/

---

## ✨ Features

- 📄 Upload text documents (.txt)
- 📚 View uploaded document list
- ❓ Ask questions about your documents
- 🤖 Get AI-generated answers
- 📌 See which document and snippet the answer came from
- 📊 Health status page (Backend, Database, LLM connection)
- ⚠️ Basic validation for empty inputs and wrong file types

---

## 🏗️ Architecture Overview

Frontend: - Next.js (React) - Axios for API calls - TailwindCSS for
styling - Hosted on Vercel

Backend: - FastAPI - ChromaDB (vector storage) - FastEmbed (lightweight
ONNX embeddings) - Groq API (LLM: llama-3.1-8b-instant) - Hosted on
Railway

Flow: 1. Upload document → text split into chunks 2. Chunks embedded
using FastEmbed 3. Stored in Chroma vector DB 4. User question embedded 5. Similar chunks retrieved 6. Context sent to Groq LLM 7. Answer
returned with sources

---

## 🚀 How to Run Locally

### 1️⃣ Clone Repository

```bash
git clone <your-repo-url>
cd <repo-folder>
```

---

### 2️⃣ Backend Setup

```bash
cd backend
python -m venv venv
source venv/bin/activate  # Windows: venv\Scripts\activate
pip install -r requirements.txt
```

Create a `.env` file in backend:

```env
GROQ_API_KEY=your_groq_api_key_here
ALLOWED_ORIGINS=http://localhost:3000
```

Run backend:

```bash
uvicorn app.main:app --reload
```

Backend runs at:

    http://127.0.0.1:8000

---

### 3️⃣ Frontend Setup

```bash
cd frontend
npm install
```

Create `.env.local`:

```env
NEXT_PUBLIC_API_URL=http://127.0.0.1:8000
```

Run frontend:

```bash
npm run dev
```

Frontend runs at:

    http://localhost:3000

---

## 🌍 Deployment

Backend (Railway): - Uses Python 3.11 - Start Command:

    uvicorn app.main:app --host 0.0.0.0 --port $PORT

Frontend (Vercel): - Environment variable:

    NEXT_PUBLIC_API_URL=https://private-knowledge-qa-production-f941.up.railway.app

---

## 🔐 Environment Variables

### Backend `.env` example

```env
GROQ_API_KEY=your_groq_api_key_here
ALLOWED_ORIGINS=http://localhost:3000,https://private-knowledge-qa-red.vercel.app
```

### Frontend `.env.local` example

```env
NEXT_PUBLIC_API_URL=http://127.0.0.1:8000
```

---

## ⚠️ What Is Not Implemented

- Authentication
- File deletion
- Advanced document formats (PDF, DOCX)
- Persistent cloud database (uses local Chroma storage)
- Rate limiting

---

## 📌 Notes

- No API keys are committed to the repository.
- `.env.example` should be used for configuration reference.
- Lightweight FastEmbed is used instead of heavy Torch-based
  embeddings for cloud compatibility.
- The app is designed for clarity, simplicity, and demonstration
  purposes.

---

## 👤 Author

Shaik Irfan Baba\
Computer Science (AI & ML Specialization)\
Focused on building practical AI-powered systems.

---
