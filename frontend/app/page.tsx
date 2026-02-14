"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import Sidebar from "./components/Sidebar";
import ChatSection from "./components/ChatSection";

export type Source = {
  source_file: string;
  content_snippet: string;
};

export default function Home() {
  const [file, setFile] = useState<File | null>(null);
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [sources, setSources] = useState<Source[]>([]);
  const [loading, setLoading] = useState(false);
  const [health, setHealth] = useState<string>("Checking...");
  const [documents, setDocuments] = useState<string[]>([]);

  const BACKEND_URL =
    process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000";

  useEffect(() => {
    checkHealth();
    fetchDocuments();
  }, []);

  const checkHealth = async () => {
    try {
      await axios.get(`${BACKEND_URL}/`);
      setHealth("Online");
    } catch {
      setHealth("Offline");
    }
  };

  const fetchDocuments = async () => {
    try {
      const res = await axios.get(`${BACKEND_URL}/documents`);
      setDocuments(res.data.documents);
    } catch (error) {
      console.error(error);
    }
  };

  const handleUpload = async () => {
  if (!file) return;

  const formData = new FormData();
  formData.append("file", file);

  setLoading(true);

  try {
    await axios.post(`${BACKEND_URL}/upload`, formData);

    // ✅ Instant UI update (optimistic update)
    setDocuments((prev) => {
      if (prev.includes(file.name)) return prev;
      return [...prev, file.name];
    });

    setFile(null);

    // ✅ Optional: re-sync with backend
    await fetchDocuments();

  } catch (error) {
    console.error(error);
    alert("❌ Upload failed.");
  }

  setLoading(false);
};


  const handleAsk = async () => {
    if (!question) return;

    setLoading(true);
    setAnswer("");
    setSources([]);

    try {
      const res = await axios.post(`${BACKEND_URL}/query`, { question });
      setAnswer(res.data.answer);
      setSources(res.data.sources);
    } catch {
      alert("❌ Failed to get answer.");
    }

    setLoading(false);
  };

  return (
  <main className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 text-gray-800 font-sans flex flex-col items-center py-16 px-4">

    {/* Hero Section */}
    <div className="text-center mb-12 max-w-2xl">
      <h1 className="text-4xl font-bold text-gray-900 mb-4">
        🧠 Private Knowledge Assistant
      </h1>
      <p className="text-gray-600 text-lg">
        Upload your documents. Ask questions. Get intelligent answers powered by AI.
      </p>
    </div>

    {/* Main Content */}
    <div className="w-full max-w-6xl grid grid-cols-1 md:grid-cols-12 gap-8">
      <Sidebar
        health={health}
        documents={documents}
        file={file}
        setFile={setFile}
        handleUpload={handleUpload}
        loading={loading}
      />

      <ChatSection
        question={question}
        setQuestion={setQuestion}
        handleAsk={handleAsk}
        loading={loading}
        answer={answer}
        sources={sources}
      />
    </div>

  </main>
);

}
