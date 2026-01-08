
import { GoogleGenAI } from "@google/genai";

export const getPartInsight = async (partName: string, partNumber: string): Promise<string> => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });
  
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `Provide a professional, very brief 1-sentence industrial description for a part named "${partName}" (Part Number: ${partNumber}). Focus on its likely application or function in engineering.`,
      config: {
        temperature: 0.7,
        maxOutputTokens: 100,
      }
    });

    return response.text?.trim() || "No additional insights available.";
  } catch (error) {
    console.error("Gemini Insight Error:", error);
    return "Industrial spare part for various industrial applications.";
  }
};
