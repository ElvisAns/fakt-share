import { GoogleGenAI } from "@google/genai";

const MODEL_NAME = "gemini-2.5-flash-lite";
const API_KEY = process.env.GOOGLE_GEMINI_API_KEY;

async function execute(content) {
    const ai = new GoogleGenAI({ apiKey: API_KEY });

    const result = await ai.models.generateContent({
        model: MODEL_NAME,
        contents: content,
        config: {
            temperature: 0.9,
            topK: 80,
            topP: 1,
            maxOutputTokens: 2048,
        }
    });

    const response = result.text;

    const index1 = response.indexOf("```json");
    if(index1 !== 0 ){
        return response;
    }
    const index2 = response.lastIndexOf("```");
    const json = response.slice(index1 + 7, index2)
    return json;
}

export default execute;