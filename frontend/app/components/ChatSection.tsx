"use client";

import { Search, FileText } from "lucide-react";
import { Source } from "../page";

interface Props {
  question: string;
  setQuestion: (value: string) => void;
  handleAsk: () => void;
  loading: boolean;
  answer: string;
  sources: Source[];
}

export default function ChatSection({
  question,
  setQuestion,
  handleAsk,
  loading,
  answer,
  sources,
}: Props) {
  return (
    <section className="md:col-span-8">
      <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200 h-full flex flex-col">
        <h2 className="text-xl font-semibold mb-6 flex items-center gap-2">
          <Search size={20} className="text-green-500" />
          Ask a Question
        </h2>

        <div className="flex gap-3">
          <textarea
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            placeholder="Ask something about your documents..."
            className="
              flex-1 border border-gray-300 rounded-xl p-4
              focus:ring-2 focus:ring-green-500
              focus:outline-none resize-none transition
            "
            rows={3}
          />

          <button
            onClick={handleAsk}
            disabled={loading || !question}
            className="
              bg-green-600 text-white px-6 rounded-xl
              hover:bg-green-700 transition font-medium
              disabled:opacity-50 disabled:cursor-not-allowed
            "
          >
            {loading ? "..." : "Ask"}
          </button>
        </div>

        {answer ? (
          <div className="mt-8">
            <div className="bg-green-50 border border-green-100 p-6 rounded-xl">
              <h3 className="text-sm font-bold text-green-800 uppercase tracking-wide mb-2">
                AI Answer
              </h3>
              <p className="whitespace-pre-wrap text-gray-800">
                {answer}
              </p>
            </div>

            <div className="mt-6 space-y-3">
              {sources.map((src, i) => (
                <div
                  key={i}
                  className="bg-white p-4 rounded-xl border border-gray-200 text-sm hover:shadow-sm transition"
                >
                  <div className="flex items-center gap-2 mb-1">
                    <FileText size={14} className="text-blue-400" />
                    <span className="font-semibold text-gray-700">
                      {src.source_file}
                    </span>
                  </div>
                  <p className="text-gray-500 text-xs italic pl-6 border-l-2 border-gray-100">
                    "{src.content_snippet}"
                  </p>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="mt-12 text-center text-gray-300">
            <Search size={48} className="mx-auto mb-2 opacity-20" />
            <p>Ask a question to see results here</p>
          </div>
        )}
      </div>
    </section>
  );
}
