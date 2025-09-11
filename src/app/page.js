import Link from "next/link";
import "../app/dashboard.css";

export default function page() {
  return (
    <div className="feature-hub">
      <div className="feature-hub-container">
        <h1 className="feature-hub-title">Feature Hub</h1>
        <div className="feature-hub-circles">
          <Link href="/translate-ai" className="feature-hub-circle feature-hub-translate">
            <div className="feature-hub-circle-content">
              <div className="feature-hub-icon">📄</div>
              <h3>Translate File</h3>
            </div>
          </Link>

          <Link href="/MenuAI" className="feature-hub-circle feature-hub-generate">
            <div className="feature-hub-circle-content">
              <div className="feature-hub-icon">🎨</div>
              <h3>Image Generate</h3>
            </div>
          </Link>

          <Link href="/pdfai" className="feature-hub-circle feature-hub-pdf">
            <div className="feature-hub-circle-content">
              <div className="feature-hub-icon">📊</div>
              <h3>Data from PDF</h3>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}
