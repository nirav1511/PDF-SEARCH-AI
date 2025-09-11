"use client";
import { useState } from "react";
import Select from "react-select";

export default function FileTranslateClient() {
  const [fileContent, setFileContent] = useState("");
  const [translations, setTranslations] = useState({});
  const [loading, setLoading] = useState(false);
  const [selectedLanguages, setSelectedLanguages] = useState([]);
  const [downloadLinks, setDownloadLinks] = useState({});
  const [error, setError] = useState(null);

  const availableLanguages = [
    { value: "es", label: "Spanish" },
    { value: "fr", label: "French" },
    { value: "hi", label: "Hindi" },
    { value: "de", label: "German" },
    { value: "ja", label: "Japanese" },
    { value: "zh", label: "Chinese" },
  ];

  const handleFileUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => setFileContent(event.target?.result);
    reader.readAsText(file);
  };

  const createDownloadLinks = (translations) => {
    const links = {};
    Object.entries(translations).forEach(([lang, text]) => {
      const blob = new Blob([text], { type: "text/plain;charset=utf-8" });
      links[lang] = URL.createObjectURL(blob);
    });
    setDownloadLinks(links);
  };

  const handleTranslate = async () => {
    if (!fileContent || !selectedLanguages) return;
    setLoading(true);

    try {
      const language = selectedLanguages.value;

      const res = await fetch("/api/translate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: fileContent, language }),
      });

      if (!res.ok || !res.headers.get("content-type")?.includes("application/json")) {
        const txt = await res.text();
        setError(`Bad response ${res.status}: ${txt}`);
        return
      }

      const data = await res.json();
      setTranslations({ [language]: data.translation });
      createDownloadLinks({ [language]: data.translation });
    } catch (e) {
       setError(e.message || "Something went wrong. Please try again.");
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="position-relative">
      
      {/* Full-screen loader */}
      {loading && (
        <div
          className="position-fixed top-0 start-0 w-100 h-100 d-flex justify-content-center align-items-center"
          style={{ backgroundColor: "rgba(0,0,0,0.5)", zIndex: 1050 }}
        >
          <div
            className="spinner-border text-primary"
            role="status"
            style={{ width: "4rem", height: "4rem" }}
          >
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      )}

      {/* Main content */}
      <div className="container my-5">
        <div className="card shadow">
          <div className="card-body">
            <h3 className="card-title mb-4">Upload SRT File to Translate</h3>

            <div className="mb-3">
              <input
                type="file"
                accept=".txt,.srt"
                onChange={handleFileUpload}
                className="form-control"
              />
            </div>

            {fileContent && (
              <>
                <div className="mb-3">
                  <label className="form-label">Select Language</label>
                  <Select
                    options={availableLanguages}
                    onChange={setSelectedLanguages}
                    placeholder="Choose language..."
                  />
                </div>

                <button
                  onClick={handleTranslate}
                  className="btn btn-primary"
                  disabled={loading || selectedLanguages.length === 0}
                >
                  {loading ? "Translating..." : "Translate Now"}
                </button>
              </>
            )}
          </div>
        </div>

        {/* Translations */}
        {Object.keys(translations).length > 0 && (
          <div className="mt-4">
            <h4>Translations</h4>
            {Object.entries(translations).map(([lang, text]) => (
              <div className="card mb-3" key={lang}>
                <div className="card-body d-flex justify-content-between align-items-center">
                  <span>
                    <strong className="text-capitalize">{lang}:</strong> Translation ready
                  </span>
                  <a
                    href={downloadLinks[lang]}
                    download={`translation_${lang}.srt`}
                    className="btn btn-success"
                  >
                    Download SRT
                  </a>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      {error && (
        <div className="error-modal">
          <div className="modal-content">
            <h3>Error</h3>
            <p>{error}</p>
            <button onClick={() => setError(null)}>Close</button>
          </div>
        </div>
      )}

    </div>
  );
}
  