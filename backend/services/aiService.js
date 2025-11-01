// import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from "dotenv";
import { GoogleGenerativeAI } from "@google/generative-ai";
dotenv.config();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

export async function generateCareerRecommendations(assessmentData) {
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

    const prompt = `
      You are an AI career advisor. Based on this user's assessment data, 
      generate 3 personalized career recommendations with learning paths.

      Assessment Data:
      ${JSON.stringify(assessmentData, null, 2)}
    `;

    const result = await model.generateContent(prompt);
    const text = await result.response.text();

    return { recommendations: text };
  } catch (error) {
    console.error("AI Service Error:", error);
    throw new Error("Error generating career recommendations");
  }
}