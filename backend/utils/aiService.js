const { GoogleGenerativeAI } = require('@google/generative-ai');

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// Generate career recommendations using AI
async function generateCareerRecommendations(assessmentData) {
  try {
    const model = genAI.getGenerativeModel({ model: 'gemini-pro' });
    
    const prompt = `
You are an expert career counselor. Based on the following assessment data, provide 5 personalized career recommendations in JSON format.

User Profile:
- Skills: ${assessmentData.currentSkills.join(', ')}
- Interests: Technology(${assessmentData.interests.technology}), Business(${assessmentData.interests.business}), Healthcare(${assessmentData.interests.healthcare})
- Personality: Creative(${assessmentData.personalityScores.creative}), Analytical(${assessmentData.personalityScores.analytical}), Leadership(${assessmentData.personalityScores.leadership})
- Goals: ${assessmentData.goals}
- Experience: ${assessmentData.experience}
- Work Preference: ${assessmentData.workPreferences.workStyle}

Provide response in this EXACT JSON format:
{
  "careers": [
    {
      "title": "Career Title",
      "matchScore": 85,
      "description": "Brief description",
      "requiredSkills": ["skill1", "skill2"],
      "skillGap": ["skill to learn"],
      "salaryRange": {"min": 500000, "max": 1200000},
      "demandLevel": "high",
      "growthPotential": "excellent",
      "educationRequired": ["Bachelor's in CS"],
      "certifications": ["AWS Certified"],
      "timeline": "6-12 months",
      "pros": ["pro1", "pro2"],
      "cons": ["con1"]
    }
  ],
  "learningPath": {
    "shortTerm": ["Learn Python", "Build portfolio"],
    "mediumTerm": ["Get certified", "Gain experience"],
    "longTerm": ["Master advanced skills", "Lead projects"]
  }
}
`;
    
    const result = await model.generateContent(prompt);
    const response = result.response.text();
    
    // Extract JSON from response
    const jsonMatch = response.match(/\{[\s\S]*\}/);
    if (jsonMatch) {
      return JSON.parse(jsonMatch[0]);
    }
    
    throw new Error('Failed to parse AI response');
    
  } catch (error) {
    console.error('AI Service Error:', error);
    throw error;
  }
}

module.exports = { generateCareerRecommendations };
