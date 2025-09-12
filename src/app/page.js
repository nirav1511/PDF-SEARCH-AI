import Link from "next/link";
import "../app/pdfai.css";

export default function page() {
  return (
  <div className="feature-hub">
  <div className="feature-hub-container">
    <h1 className="feature-hub-title">AI Document Tools</h1>
    <p className="feature-hub-sub">Elevate your workflow with intelligent, lightning-fast data extraction.</p>
    <div className="feature-hub-circles">
      
       <a href="/" className="try-now-btn">Try Now</a>
      <div className="down-arrow">&#8595;</div>
      <a href="/pdfai" className="feature-hub-circle feature-hub-pdf">
        <div className="circle-icon">🧠</div>
        <h3>PDF AI-Analyzer</h3>
        <p>Unlock key insights, extract tables, and summarize any PDF in seconds. Experience next-gen AI parsing!</p>
      </a>
    </div>
  </div>
</div>


  );
}
