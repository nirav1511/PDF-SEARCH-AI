"use client";


import { useState } from "react";
import "./../pdfai.css";


export default function Page() {
  const [files, setFiles] = useState([]);
  const [prompt, setPrompt] = useState("");
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);
  const [modalMsg, setModalMsg] = useState("");


function Modal({ message, onClose }) {
  return (
    <div className="ai-modal-overlay">
      <div className="ai-modal-box">
        <div className="ai-modal-message">{message}</div>
        <button className="ai-modal-btn" onClick={onClose}>OK</button>
      </div>
    </div>
  );
}

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (files.length === 0 || !prompt) {
      let missing = [];
      if (files.length === 0) missing.push("PDF file");
      if (!prompt) missing.push("question");
      setModalMsg(
        `Please provide the following field${missing.length > 1 ? "s" : ""}: ${missing.join(" & ")}`
      );
      return;
    }

    setLoading(true);
    setResult("");

    const formData = new FormData();
    files.forEach((file, index) => {
      formData.append(`file${index + 1}`, file);
    });
    formData.append("prompt", prompt);

    try {
      const res = await fetch("/api/manual-chat", {
        method: "POST",
        body: formData,
      });
      const data = await res.json();
      // console.log(data);
      if (data.result) setResult(data.result);
      else setResult("Error: " + (data.error || "Unknown error"));
    } catch (err) {
      setResult("Request failed: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="pdfai-main">
      
      <div className="pdfai-container">
       
        <h1 className="pdfai-title">📄 Ask AI about PDFs</h1>
        

        <form onSubmit={handleSubmit} className="pdfai-form">
          {/* File Upload */}
          <div>
            <label className="pdfai-label">Upload PDFs</label>
            <input
              type="file"
              accept="application/pdf"
              multiple
              onChange={(e) => setFiles(Array.from(e.target.files || []))}
              className="pdfai-file-input"
            />
            {files.length > 0 && (
              <ul className="pdfai-file-list">
                {files.map((f, i) => (
                  <li key={i}>{f.name}</li>
                ))}
              </ul>
            )}
          </div>

          {/* Prompt Input */}
          <div>
            <label className="pdfai-label">Your Question</label>
            <input
              type="text"
              placeholder="Enter your prompt..."
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              className="pdfai-text-input"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className={`pdfai-button ${loading ? "loading" : ""}`}
          >
            {loading ? "Analyzing..." : "Submit"}
          </button>
        </form>

        {/* Response Section */}
        {result && (
          <div className="pdfai-response">
            <strong>AI Response:</strong>
            <p>{result}</p>
          </div>
        )}
      </div>

      {modalMsg && (
        <Modal message={modalMsg} onClose={() => setModalMsg("")} />
      )}
    </main>
  );
}



