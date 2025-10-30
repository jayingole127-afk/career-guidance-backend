const mongoose = require('mongoose');

const careerRecommendationSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  
  careers: [{
    title: String,
    matchScore: Number,  // 0-100
    description: String,
    requiredSkills: [String],
    skillGap: [String],
    salaryRange: {
      min: Number,
      max: Number,
      currency: { type: String, default: 'INR' }
    },
    demandLevel: String,  // low, medium, high, critical
    growthPotential: String,
    educationRequired: [String],
    certifications: [String],
    timeline: String,
    pros: [String],
    cons: [String]
  }],
  
  learningPath: {
    shortTerm: [String],   // 0-6 months
    mediumTerm: [String],  // 6-12 months
    longTerm: [String]     // 12+ months
  },
  
  generatedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('CareerRecommendation', careerRecommendationSchema);
