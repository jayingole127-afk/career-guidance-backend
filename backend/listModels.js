import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from "dotenv";
dotenv.config();

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY);

async function listModels() {
  try {
    // const result = await genAI.listModels();
    const { GoogleGenerativeAI } = require("@google/generative-ai");
require("dotenv").config();

    console.log("✅ Available Models:");
    result.models.forEach((m) => console.log(m.name));
  } catch (err) {
    console.error("❌ Error listing models:", err.message || err);
  }
}

listModels();