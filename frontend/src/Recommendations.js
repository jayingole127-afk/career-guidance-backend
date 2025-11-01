import React, { useState, useEffect } from 'react';
import API from './api';
import './Recommendations.css';

function Recommendations() {
  const [recommendations, setRecommendations] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchRecommendations();
  }, []);

  const fetchRecommendations = async () => {
    try {
      const response = await API.get('/career/recommendations');
      setRecommendations(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching recommendations:', error);
      setLoading(false);
    }
  };

  const generateRecommendations = async () => {
    setLoading(true);
    try {
      const response = await API.post('/career/recommendations');
      setRecommendations(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error generating recommendations:', error);
      alert('Error generating recommendations. Please complete assessment first.');
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="recommendations-container">
        <div className="loading-spinner">
          <div className="spinner"></div>
          <p>Generating your personalized career recommendations...</p>
        </div>
      </div>
    );
  }

  if (!recommendations) {
    return (
      <div className="recommendations-container">
        <div className="no-recommendations">
          <div className="icon">🎯</div>
          <h2>No Recommendations Yet</h2>
          <p>Complete your career assessment to get personalized recommendations</p>
          <button className="btn-primary" onClick={() => window.location.href = '/assessment'}>
            Start Assessment
          </button>
          <button className="btn-secondary" onClick={generateRecommendations}>
            Generate Recommendations
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="recommendations-container">
      <div className="recommendations-header">
        <h1>🎯 Your Career Recommendations</h1>
        <p>Based on your skills, interests, and preferences</p>
      </div>

      <div className="career-matches">
        {recommendations.careers && recommendations.careers.map((career, index) => (
          <div key={index} className="career-card">
            <div className="career-rank">#{index + 1}</div>
            <div className="career-content">
              <h3>{career.title}</h3>
              <div className="match-score">
                <div className="score-bar">
                  <div 
                    className="score-fill" 
                    style={{width: `${career.matchScore}%`}}
                  ></div>
                </div>
                <span className="score-text">{career.matchScore}% Match</span>
              </div>

              <p className="career-description">{career.description}</p>

              <div className="career-details">
                <div className="detail-item">
                  <span className="label">💰 Salary Range:</span>
                  <span className="value">{career.salaryRange}</span>
                </div>
                <div className="detail-item">
                  <span className="label">📈 Growth Potential:</span>
                  <span className="value">{career.growthPotential}</span>
                </div>
                <div className="detail-item">
                  <span className="label">🎓 Education Required:</span>
                  <span className="value">{career.educationRequired}</span>
                </div>
              </div>

              <div className="required-skills">
                <h4>Required Skills:</h4>
                <div className="skills-tags">
                  {career.requiredSkills && career.requiredSkills.map((skill, idx) => (
                    <span key={idx} className="skill-tag">{skill}</span>
                  ))}
                </div>
              </div>

              <div className="career-actions">
                <button className="btn-learn-more">Learn More</button>
                <button className="btn-save">Save</button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {recommendations.learningPath && (
        <div className="learning-path-section">
          <h2>📚 Your Personalized Learning Path</h2>
          <div className="learning-steps">
            {recommendations.learningPath.map((step, index) => (
              <div key={index} className="learning-step">
                <div className="step-number">{index + 1}</div>
                <div className="step-content">
                  <h4>{step.title}</h4>
                  <p>{step.description}</p>
                  <div className="step-duration">⏱️ {step.duration}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="actions-footer">
        <button className="btn-retake" onClick={() => window.location.href = '/assessment'}>
          🔄 Retake Assessment
        </button>
        <button className="btn-dashboard" onClick={() => window.location.href = '/'}>
          📊 Back to Dashboard
        </button>
      </div>
    </div>
  );
}

export default Recommendations;