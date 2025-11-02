import express from "express";
import { generateCareerRecommendations } from "../services/aiService.js";
console.log("✅ aiRoutes.js loaded");

const router = express.Router();

router.get("/test", (req, res) => {
  res.send("AI Route working ✅");
});

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