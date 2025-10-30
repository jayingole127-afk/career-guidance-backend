// const express = require('express');
// const router = express.Router();
// const auth = require('../middleware/auth');
// const Assessment = require('../models/Assessment');
// const CareerRecommendation = require('../models/CareerRecommendation');
// const { generateCareerRecommendations } = require('../utils/aiService');

// // Generate career recommendations
// router.post('/recommendations', auth, async (req, res) => {
//   try {
//     // Get user's latest assessment
//     const assessment = await Assessment.findOne({ user: req.user.id }).sort({ completedAt: -1 });
    
//     if (!assessment) {
//       return res.status(400).json({ message: 'Please complete assessment first' });
//     }
    
//     // Generate recommendations using AI
//     const aiRecommendations = await generateCareerRecommendations(assessment);
    
//     // Save recommendations
//     const careerRec = new CareerRecommendation({
//       user: req.user.id,
//       careers: aiRecommendations.careers,
//       learningPath: aiRecommendations.learningPath
//     });
    
//     await careerRec.save();
    
//     res.json(careerRec);
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: 'Error generating recommendations', error: error.message });
//   }
// });

// // Get user recommendations
// router.get('/recommendations', auth, async (req, res) => {
//   try {
//     const recommendations = await CareerRecommendation.findOne({ user: req.user.id }).sort({ generatedAt: -1 });
//     res.json(recommendations);
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: 'Server error' });
//   }
// });

// module.exports = router;

const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const Assessment = require('../models/Assessment');
const CareerRecommendation = require('../models/CareerRecommendation');
const { generateCareerRecommendations } = require('../utils/aiService');

// Generate career recommendations
router.post('/recommendations', auth, async (req, res) => {
  try {
    // Get user's latest assessment
    const assessment = await Assessment.findOne({ user: req.user.id }).sort({ completedAt: -1 });
    
    if (!assessment) {
      return res.status(400).json({ message: 'Please complete assessment first' });
    }

    // Generate recommendations using AI
    const aiRecommendations = await generateCareerRecommendations(assessment);
    
    // Save recommendations
    const careerRec = new CareerRecommendation({
      user: req.user.id,
      careers: aiRecommendations.careers,
      learningPath: aiRecommendations.learningPath
    });

    await careerRec.save();
    
    res.json(careerRec);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error generating recommendations', error: error.message });
  }
});

// Get user recommendations
router.get('/recommendations', auth, async (req, res) => {
  try {
    const recommendations = await CareerRecommendation.findOne({ user: req.user.id }).sort({ generatedAt: -1 });
    res.json(recommendations);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// AI Chat endpoint - NEW!
router.post('/ai-chat', auth, async (req, res) => {
  try {
    const { message, context } = req.body;
    
    // Import Google Generative AI
    const { GoogleGenerativeAI } = require('@google/generative-ai');
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    const model = genAI.getGenerativeModel({ model: 'gemini-pro' });

    // Create prompt with user context
    const prompt = `You are an expert AI Career Coach and counselor named "CareerAI Assistant". You provide personalized career guidance, resume advice, interview tips, and skill development recommendations.

User Context:
- Name: ${context.userName}
- Email: ${context.userEmail || 'Not provided'}
- Assessment Status: ${context.assessmentCompleted ? 'Completed' : 'Not completed yet'}

User Question: ${message}

Instructions:
- Provide helpful, friendly, and professional career advice
- Keep responses concise but informative (2-3 paragraphs)
- Use bullet points for lists
- Be encouraging and supportive
- Give actionable advice when possible
- If asked about specific careers, provide salary ranges, skills needed, and growth prospects

Respond as a caring career coach:`;

    const result = await model.generateContent(prompt);
    const response = result.response.text();
    
    res.json({ response });
  } catch (error) {
    console.error('AI Chat Error:', error);
    res.status(500).json({ 
      message: 'AI service error',
      response: "I apologize, but I'm having trouble connecting right now. Please make sure:\n\n1. Your Gemini API key is correctly set in backend/.env\n2. You have installed @google/generative-ai package\n3. Your internet connection is stable\n\nTry again in a moment!"
    });
  }
});

module.exports = router;