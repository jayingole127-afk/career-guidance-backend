import express from "express";
import { generateCareerRecommendations } from "../services/aiService.js";

const router = express.Router();

// POST: /api/ai/recommendations
router.post("/recommendations", async (req, res) => {
  try {
    const assessmentData = req.body;
    const recommendations = await generateCareerRecommendations(assessmentData);
    res.json(recommendations);
  } catch (error) {
    console.error("AI Route Error:", error);
    res.status(500).json({ message: "Error generating career recommendations." });
  }
});

export default router;