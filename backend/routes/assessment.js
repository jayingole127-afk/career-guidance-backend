import express from "express";
import auth from "../middleware/auth.js";
import Assessment from "../models/Assessment.js";
import User from "../models/User.js";

const router = express.Router();

// Submit assessment
router.post("/", auth, async (req, res) => {
  try {
    const { personalityScores, interests, workPreferences, currentSkills, goals, experience } = req.body;

    const assessment = new Assessment({
      user: req.user.id,
      personalityScores,
      interests,
      workPreferences,
      currentSkills,
      goals,
      experience
    });

    await assessment.save();
    await User.findByIdAndUpdate(req.user.id, { assessmentCompleted: true });

    res.json({ message: "Assessment submitted successfully", assessment });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

// Get user assessment
router.get("/", auth, async (req, res) => {
  try {
    const assessment = await Assessment.findOne({ user: req.user.id }).sort({ completedAt: -1 });
    res.json(assessment);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

export default router;