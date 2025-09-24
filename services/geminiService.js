import fs from "fs";
import fetch from "node-fetch";
import path from "path"
import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);


// 🎙️ Transcribe audio
export const transcribeAudio = async (fileUrl) => {
  try {
    // fetch from Cloudinary
    const response = await fetch(fileUrl);
    const arrayBuffer = await response.arrayBuffer();
    const audioBytes = Buffer.from(arrayBuffer);

    // detect extension
    const ext = path.extname(fileUrl).slice(1) || "wav";

    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const result = await model.generateContent([
      {
        inlineData: {
          mimeType: `audio/${ext}`,
          data: audioBytes.toString("base64"),
        },
      },
      { text: "Please transcribe this audio into text." },
    ]);

    return result.response.text();
  } catch (error) {
    console.error("Gemini Transcription Error:", error);
    throw new Error("Failed to transcribe audio");
  }
};

// 📝 Summarize transcript
export const summarizeText = async (text) => {
  const prompt = `Summarize the following note in 2-3 sentences:\n\n${text}`

  try {
    // Try flash first
    let model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" })
    let result = await model.generateContent(prompt)
    return result.response.text()
  } catch (error) {
    console.warn("Flash model failed, retrying with pro:", error.message)

    try {
      // Fallback to pro
      let model = genAI.getGenerativeModel({ model: "gemini-1.5-pro" })
      let result = await model.generateContent(prompt)
      return result.response.text()
    } catch (err) {
      console.error("Gemini Summarization Error (both models failed):", err)
      throw new Error("Failed to summarize text, try again later.")
    }
  }
}
