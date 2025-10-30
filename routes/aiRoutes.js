// backend/routes/aiRoutes.js
const express = require("express");
const router = express.Router();
const { generateCareerRecommendations } = require('../services/aiService');

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

module.exports = router;