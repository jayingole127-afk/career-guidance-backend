// import mongoose = require('mongoose');

// const assessmentSchema = new mongoose.Schema({
//   user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  
//   // Personality scores
//   personalityScores: {
//     creative: Number,      // 0-10
//     analytical: Number,    // 0-10
//     leadership: Number,    // 0-10
//     technical: Number,     // 0-10
//     communication: Number  // 0-10
//   },
  
//   // Interest areas
//   interests: {
//     technology: Number,    // 0-10
//     business: Number,      // 0-10
//     healthcare: Number,    // 0-10
//     education: Number,     // 0-10
//     creative: Number       // 0-10
//   },
  
//   // Work preferences
//   workPreferences: {
//     workStyle: String,     // remote, hybrid, office
//     teamSize: String,      // small, medium, large
//     preferredIndustries: [String]
//   },
  
//   // User inputs
//   currentSkills: [String],
//   goals: String,
//   experience: String,
  
//   completedAt: { type: Date, default: Date.now }
// });

// // module.exports = mongoose.model('Assessment', assessmentSchema);
// const Assessment = mongoose.model("Assessment", AssessmentSchema);

// export default Assessment;

import mongoose from "mongoose";

const AssessmentSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  personalityScores: Object,
  interests: [String],
  workPreferences: [String],
  currentSkills: [String],
  goals: String,
  experience: String,
  createdAt: { type: Date, default: Date.now }
});

const Assessment = mongoose.model("Assessment", AssessmentSchema);

export default Assessment;