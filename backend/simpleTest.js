import "dotenv/config";
import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

const models = [
  "models/gemini-3.5-flash",
  "models/gemini-3.5-flash-lite",
  "models/gemini-3.6-flash",
];

for (const model of models) {
  try {
    console.log(`Testing ${model}...`);

    const response = await ai.models.generateContent({
      model,
      contents: "Say Hello",
    });

    console.log(`✅ SUCCESS: ${model}`);
    console.log(response.text);
    break;
  } catch (e) {
    console.log(`❌ FAILED: ${model}`);
    console.log(e.message);
  }
}