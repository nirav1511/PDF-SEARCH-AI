



// import { NextResponse } from "next/server";
// import OpenAI from "openai";
// import PDFParser from "pdf2json";

// const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

// export async function POST(req) {
//   try {
//     const formData = await req.formData();
//     const file = formData.get("file");
//     const prompt = formData.get("prompt");

//     if (!file) {
//       return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
//     }
//     if (!prompt) {
//       return NextResponse.json({ error: "No prompt provided" }, { status: 400 });
//     }

//     // Convert Blob → Buffer
//     const arrayBuffer = await file.arrayBuffer();
//     const buffer = Buffer.from(arrayBuffer);

//     // Parse PDF → plain text
//     const pdfText = await new Promise((resolve, reject) => {
//       const pdfParser = new PDFParser();
//       pdfParser.on("pdfParser_dataReady", (pdfData) => {
//         const text = pdfData.Pages.map((page) =>
//           page.Texts.map((t) => decodeURIComponent(t.R[0].T)).join(" ")
//         ).join("\n\n");
//         resolve(text);
//       });
//       pdfParser.on("pdfParser_dataError", (err) => reject(err.parserError));
//       pdfParser.parseBuffer(buffer);
//     });

//     // Build AI prompt
//     const fullPrompt = `Based on the following document text, answer this prompt: "${prompt}".\n\nDocument Text:\n${pdfText}`;

//     // 🔑 Use GPT-4o (fast & multimodal) or GPT-4o-mini for cheaper
//     const response = await openai.chat.completions.create({
//       model: "gpt-4o-mini", 
//       messages: [{ role: "user", content: fullPrompt }],
//       temperature: 0.2, // more deterministic
//     });
// Nirav
//     return NextResponse.json({ result: response.choices[0].message?.content });
//   } catch (err) {
//     console.error("API Error:", err);
//     return NextResponse.json(
//       { error: "Processing error", details: err.message },
//       { status: 500 }
//     );
//   }
// }

import { NextResponse } from "next/server";
import OpenAI from "openai";
import PDFParser from "pdf2json";

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

// Helper to parse PDF → plain text
async function parsePdf(file) {
  const arrayBuffer = await file.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);

  return new Promise((resolve, reject) => {
    const pdfParser = new PDFParser();
    pdfParser.on("pdfParser_dataReady", (pdfData) => {
      const text = pdfData.Pages.map((page) =>
        page.Texts.map((t) => decodeURIComponent(t.R[0].T)).join(" ")
      ).join("\n\n");
      resolve(text);
    });
    pdfParser.on("pdfParser_dataError", (err) => reject(err.parserError));
    pdfParser.parseBuffer(buffer);
  });
}

export async function POST(req) {
  try {
    const formData = await req.formData();

    // Collect all files (file1, file2, ...)
    const files = [];
    for (const [key, value] of formData.entries()) {
      if (key.startsWith("file")) {
        files.push(value);
      }
    }

    const prompt = formData.get("prompt");

    if (files.length === 0) {
      return NextResponse.json({ error: "No files uploaded" }, { status: 400 });
    }
    if (!prompt) {
      return NextResponse.json({ error: "No prompt provided" }, { status: 400 });
    }

    // Parse all PDFs
    const pdfTexts = await Promise.all(files.map((file) => parsePdf(file)));

    // Merge into one large document
    const combinedText = pdfTexts.join("\n\n--- End of Document ---\n\n");

    // Build AI prompt
    const fullPrompt = `You have the following combined documents. Answer the question based on them only.\n\nQuestion: "${prompt}"\n\nDocuments:\n${combinedText}`;

    // 🔑 Call OpenAI
    // const response = await openai.chat.completions.create({
    //   model: "gpt-4o-mini", // or gpt-4o for better quality
    //   messages: [{ role: "user", content: fullPrompt }],
    //   temperature: 0.2,
    // });


    
    const response = await openai.chat.completions.create({
      model: "gpt-5-nano", // ✅ use GPT-5 Nano instead of gpt-4o-mini
      messages: [
        { role: "user", content: fullPrompt }
      ],
      
    });

    return NextResponse.json({ result: response.choices[0].message?.content });
  } catch (err) {
    console.error("API Error:", err);
    return NextResponse.json(
      { error: "Processing error", details: err.message },
      { status: 500 }
    );
  }
}
