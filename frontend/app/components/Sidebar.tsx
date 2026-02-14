"use client";

import { FileText, CheckCircle, AlertCircle, Database } from "lucide-react";

interface Props {
  health: string;
  documents: string[];
  file: File | null;
  setFile: (file: File | null) => void;
  handleUpload: () => void;
  loading: boolean;
}

export default function Sidebar({
  health,
  documents,
  file,
  setFile,
  handleUpload,
  loading,
}: Props) {
  return (
    <aside className="md:col-span-4 space-y-6">
      {/* Status Card */}
      <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200">
        <h1 className="text-xl font-bold text-blue-600 mb-4 flex items-center gap-2">
          🧠 Private QA
        </h1>

        <div className="flex items-center gap-2 text-sm bg-gray-50 p-3 rounded-lg border border-gray-100">
          <span className="text-gray-500">System:</span>
          {health === "Online" ? (
            <span className="text-green-600 flex items-center gap-1 font-medium">
              <CheckCircle size={16} /> Online
            </span>
          ) : (
            <span className="text-red-600 flex items-center gap-1 font-medium">
              <AlertCircle size={16} /> Offline
            </span>
          )}
        </div>
      </div>

      {/* Knowledge Base */}
      <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200">
        <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
          <Database size={18} className="text-purple-500" />
          Knowledge Base
        </h2>

        {documents.length === 0 ? (
          <p className="text-sm text-gray-400 italic">
            No documents uploaded yet.
          </p>
        ) : (
          <ul className="space-y-2">
            {documents.map((doc, i) => (
              <li
                key={i}
                className="flex items-center gap-2 text-sm text-gray-600 bg-gray-50 p-2 rounded-lg border border-gray-100"
              >
                <FileText size={14} className="text-gray-400" />
                <span className="truncate">{doc}</span>
              </li>
            ))}
          </ul>
        )}

        {/* Upload Section */}
        <div className="mt-6 border-t border-gray-100 pt-4">
          <h3 className="text-sm font-medium mb-3 text-gray-600">
            Add New Data
          </h3>

          <input
            type="file"
            onChange={(e) => setFile(e.target.files?.[0] || null)}
            className="
              block w-full text-sm text-gray-500
              file:mr-4 file:py-2 file:px-4
              file:rounded-lg file:border-0
              file:text-sm file:font-semibold
              file:bg-blue-50 file:text-blue-700
              hover:file:bg-blue-100
              mb-3
            "
          />

          <button
            onClick={handleUpload}
            disabled={loading || !file}
            className="
              w-full bg-blue-600 text-white py-2 rounded-lg
              hover:bg-blue-700 transition font-medium
              disabled:opacity-50 disabled:cursor-not-allowed
            "
          >
            {loading ? "Uploading..." : "Upload"}
          </button>
        </div>
      </div>
    </aside>
  );
}
