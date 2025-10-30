const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const Assessment = require('../models/Assessment');
const User = require('../models/User');

// Submit assessment
router.post('/', auth, async (req, res) => {
  try {
    const { personalityScores, interests, workPreferences, currentSkills, goals, experience } = req.body;
    
    // Create assessment
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
    
    // Update user
    await User.findByIdAndUpdate(req.user.id, { assessmentCompleted: true });
    
    res.json({ message: 'Assessment submitted successfully', assessment });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get user assessment
router.get('/', auth, async (req, res) => {
  try {
    const assessment = await Assessment.findOne({ user: req.user.id }).sort({ completedAt: -1 });
    res.json(assessment);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
