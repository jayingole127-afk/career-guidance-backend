import React, { useState } from 'react';
import API from './api';
import './Assessment.css';

function Assessment({ onComplete }) {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    // Personal Info
    name: '',
    age: '',
    education: '',
    currentRole: '',
    
    // Skills (1-10 rating)
    technicalSkills: 5,
    communicationSkills: 5,
    leadershipSkills: 5,
    analyticalSkills: 5,
    creativitySkills: 5,
    
    // Interests (checkboxes)
    interests: [],
    
    // Work Preferences
    workEnvironment: '',
    teamSize: '',
    workSchedule: '',
    travelPreference: '',
    salaryExpectation: '',
    
    // Career Goals
    careerGoals: '',
    timeframe: '',
    willingToLearn: []
  });

  const totalSteps = 5;

  const interestOptions = [
    'Technology & Software',
    'Business & Finance',
    'Healthcare & Medicine',
    'Creative Arts & Design',
    'Education & Training',
    'Engineering',
    'Marketing & Sales',
    'Data & Analytics',
    'Research & Science',
    'Social Services'
  ];

  const learningOptions = [
    'Programming Languages',
    'Data Analysis',
    'Project Management',
    'Design Tools',
    'Public Speaking',
    'Foreign Languages',
    'Technical Writing',
    'Digital Marketing'
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleCheckboxChange = (field, value) => {
    const currentValues = formData[field];
    if (currentValues.includes(value)) {
      setFormData({
        ...formData,
        [field]: currentValues.filter(item => item !== value)
      });
    } else {
      setFormData({
        ...formData,
        [field]: [...currentValues, value]
      });
    }
  };

  const handleSliderChange = (name, value) => {
    setFormData({ ...formData, [name]: parseInt(value) });
  };

  const nextStep = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = async () => {
    try {
      const response = await API.post('/assessment', formData);
      alert('Assessment completed successfully! ✅');
      if (onComplete) {
        onComplete(response.data);
      }
    } catch (error) {
      console.error('Assessment submission error:', error);
      alert('Error submitting assessment. Please try again.');
    }
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="step-content">
            <h2>📋 Personal Information</h2>
            <p className="step-description">Tell us about yourself</p>
            
            <div className="form-group">
              <label>Full Name *</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                placeholder="Enter your full name"
                required
              />
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>Age *</label>
                <input
                  type="number"
                  name="age"
                  value={formData.age}
                  onChange={handleInputChange}
                  placeholder="25"
                  min="16"
                  max="100"
                />
              </div>

              <div className="form-group">
                <label>Highest Education *</label>
                <select name="education" value={formData.education} onChange={handleInputChange}>
                  <option value="">Select education level</option>
                  <option value="high_school">High School</option>
                  <option value="bachelors">Bachelor's Degree</option>
                  <option value="masters">Master's Degree</option>
                  <option value="phd">PhD</option>
                  <option value="other">Other</option>
                </select>
              </div>
            </div>

            <div className="form-group">
              <label>Current Role (if any)</label>
              <input
                type="text"
                name="currentRole"
                value={formData.currentRole}
                onChange={handleInputChange}
                placeholder="e.g., Student, Software Developer, Unemployed"
              />
            </div>
          </div>
        );

      case 2:
        return (
          <div className="step-content">
            <h2>💪 Skills Assessment</h2>
            <p className="step-description">Rate your skills from 1 (beginner) to 10 (expert)</p>
            
            <div className="skill-slider">
              <label>Technical Skills: {formData.technicalSkills}/10</label>
              <input
                type="range"
                min="1"
                max="10"
                value={formData.technicalSkills}
                onChange={(e) => handleSliderChange('technicalSkills', e.target.value)}
              />
              <div className="slider-labels">
                <span>Beginner</span>
                <span>Expert</span>
              </div>
            </div>

            <div className="skill-slider">
              <label>Communication Skills: {formData.communicationSkills}/10</label>
              <input
                type="range"
                min="1"
                max="10"
                value={formData.communicationSkills}
                onChange={(e) => handleSliderChange('communicationSkills', e.target.value)}
              />
              <div className="slider-labels">
                <span>Beginner</span>
                <span>Expert</span>
              </div>
            </div>

            <div className="skill-slider">
              <label>Leadership Skills: {formData.leadershipSkills}/10</label>
              <input
                type="range"
                min="1"
                max="10"
                value={formData.leadershipSkills}
                onChange={(e) => handleSliderChange('leadershipSkills', e.target.value)}
              />
              <div className="slider-labels">
                <span>Beginner</span>
                <span>Expert</span>
              </div>
            </div>

            <div className="skill-slider">
              <label>Analytical Skills: {formData.analyticalSkills}/10</label>
              <input
                type="range"
                min="1"
                max="10"
                value={formData.analyticalSkills}
                onChange={(e) => handleSliderChange('analyticalSkills', e.target.value)}
              />
              <div className="slider-labels">
                <span>Beginner</span>
                <span>Expert</span>
              </div>
            </div>

            <div className="skill-slider">
              <label>Creativity Skills: {formData.creativitySkills}/10</label>
              <input
                type="range"
                min="1"
                max="10"
                value={formData.creativitySkills}
                onChange={(e) => handleSliderChange('creativitySkills', e.target.value)}
              />
              <div className="slider-labels">
                <span>Beginner</span>
                <span>Expert</span>
              </div>
            </div>
          </div>
        );

      case 3:
        return (
          <div className="step-content">
            <h2>❤️ Interests & Passions</h2>
            <p className="step-description">Select all areas that interest you</p>
            
            <div className="checkbox-grid">
              {interestOptions.map((interest) => (
                <label key={interest} className="checkbox-card">
                  <input
                    type="checkbox"
                    checked={formData.interests.includes(interest)}
                    onChange={() => handleCheckboxChange('interests', interest)}
                  />
                  <span>{interest}</span>
                </label>
              ))}
            </div>
          </div>
        );

      case 4:
        return (
          <div className="step-content">
            <h2>⚙️ Work Preferences</h2>
            <p className="step-description">Tell us about your ideal work environment</p>
            
            <div className="form-group">
              <label>Preferred Work Environment *</label>
              <select name="workEnvironment" value={formData.workEnvironment} onChange={handleInputChange}>
                <option value="">Select preference</option>
                <option value="remote">Fully Remote</option>
                <option value="hybrid">Hybrid (Mix of remote and office)</option>
                <option value="office">Office-based</option>
                <option value="flexible">Flexible</option>
              </select>
            </div>

            <div className="form-group">
              <label>Team Size Preference *</label>
              <select name="teamSize" value={formData.teamSize} onChange={handleInputChange}>
                <option value="">Select preference</option>
                <option value="solo">Work independently</option>
                <option value="small">Small team (2-10 people)</option>
                <option value="medium">Medium team (11-50 people)</option>
                <option value="large">Large organization (50+ people)</option>
              </select>
            </div>

            <div className="form-group">
              <label>Work Schedule *</label>
              <select name="workSchedule" value={formData.workSchedule} onChange={handleInputChange}>
                <option value="">Select preference</option>
                <option value="9to5">Traditional 9-5</option>
                <option value="flexible">Flexible hours</option>
                <option value="night">Night shifts acceptable</option>
                <option value="freelance">Freelance/Project-based</option>
              </select>
            </div>

            <div className="form-group">
              <label>Travel Preference *</label>
              <select name="travelPreference" value={formData.travelPreference} onChange={handleInputChange}>
                <option value="">Select preference</option>
                <option value="none">No travel</option>
                <option value="occasional">Occasional (1-2 times/year)</option>
                <option value="moderate">Moderate (Monthly)</option>
                <option value="frequent">Frequent travel (25%+)</option>
              </select>
            </div>

            <div className="form-group">
              <label>Salary Expectation (Annual) *</label>
              <select name="salaryExpectation" value={formData.salaryExpectation} onChange={handleInputChange}>
                <option value="">Select range</option>
                <option value="0-30k">$0 - $30,000</option>
                <option value="30-50k">$30,000 - $50,000</option>
                <option value="50-75k">$50,000 - $75,000</option>
                <option value="75-100k">$75,000 - $100,000</option>
                <option value="100k+">$100,000+</option>
              </select>
            </div>
          </div>
        );

      case 5:
        return (
          <div className="step-content">
            <h2>🎯 Career Goals</h2>
            <p className="step-description">Share your aspirations and learning preferences</p>
            
            <div className="form-group">
              <label>What are your career goals? *</label>
              <textarea
                name="careerGoals"
                value={formData.careerGoals}
                onChange={handleInputChange}
                placeholder="Describe what you want to achieve in your career..."
                rows="4"
              />
            </div>

            <div className="form-group">
              <label>Time Frame *</label>
              <select name="timeframe" value={formData.timeframe} onChange={handleInputChange}>
                <option value="">Select timeframe</option>
                <option value="immediate">Ready to start now</option>
                <option value="3months">Within 3 months</option>
                <option value="6months">Within 6 months</option>
                <option value="1year">Within 1 year</option>
                <option value="flexible">Flexible timeline</option>
              </select>
            </div>

            <div className="form-group">
              <label>Willing to Learn (Select all that apply)</label>
              <div className="checkbox-grid">
                {learningOptions.map((skill) => (
                  <label key={skill} className="checkbox-card">
                    <input
                      type="checkbox"
                      checked={formData.willingToLearn.includes(skill)}
                      onChange={() => handleCheckboxChange('willingToLearn', skill)}
                    />
                    <span>{skill}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="assessment-container">
      <div className="assessment-card">
        <div className="assessment-header">
          <h1>Career Assessment</h1>
          <p>Discover your perfect career path</p>
        </div>

        {/* Progress Bar */}
        <div className="progress-section">
          <div className="progress-bar-container">
            <div 
              className="progress-bar-fill" 
              style={{ width: `${(currentStep / totalSteps) * 100}%` }}
            ></div>
          </div>
          <div className="progress-text">
            Step {currentStep} of {totalSteps} ({Math.round((currentStep / totalSteps) * 100)}%)
          </div>
        </div>

        {/* Step Content */}
        {renderStep()}

        {/* Navigation Buttons */}
        <div className="button-group">
          {currentStep > 1 && (
            <button className="btn-secondary" onClick={prevStep}>
              ← Previous
            </button>
          )}
          
          {currentStep < totalSteps ? (
            <button className="btn-primary" onClick={nextStep}>
              Next →
            </button>
          ) : (
            <button className="btn-success" onClick={handleSubmit}>
              🎯 Complete Assessment
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default Assessment;