import React, { useState } from 'react';
import API from './api';
import './ResumeAnalysis.css';

function ResumeAnalysis() {
  const [file, setFile] = useState(null);
  const [analysis, setAnalysis] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      const validTypes = ['application/pdf', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
      if (validTypes.includes(selectedFile.type)) {
        setFile(selectedFile);
        setError('');
      } else {
        setError('Please upload a PDF or DOCX file');
        setFile(null);
      }
    }
  };

  const handleUpload = async () => {
    if (!file) {
      setError('Please select a file');
      return;
    }

    setLoading(true);
    const formData = new FormData();
    formData.append('resume', file);

    try {
      const response = await API.post('/career/analyze-resume', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      setAnalysis(response.data);
      setError('');
    } catch (err) {
      setError('Error analyzing resume. Please try again.');
      console.error('Upload error:', err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="resume-container">
        <div className="loading">
          <div className="spinner"></div>
          <p>Analyzing your resume with AI...</p>
        </div>
      </div>
    );
  }

  if (analysis) {
    return (
      <div className="resume-container">
        <div className="analysis-results">
          <div className="results-header">
            <h1>📊 Resume Analysis Report</h1>
          </div>

          <div className="ats-score">
            <h2>ATS Score</h2>
            <div className="score-circle">
              <span className="score-number">{analysis.atsScore}%</span>
              <span className="score-label">Match</span>
            </div>
            <p className="score-description">
              {analysis.atsScore >= 80 ? '✅ Excellent - Your resume is ATS optimized' : 
               analysis.atsScore >= 60 ? '⚠️ Good - Some optimization needed' : 
               '❌ Poor - Significant improvements needed'}
            </p>
          </div>

          <div className="analysis-cards">
            <div className="card strengths">
              <h3>💪 Strengths</h3>
              <ul>
                {analysis.strengths && analysis.strengths.map((strength, idx) => (
                  <li key={idx}>{strength}</li>
                ))}
              </ul>
            </div>

            <div className="card weaknesses">
              <h3>⚠️ Areas for Improvement</h3>
              <ul>
                {analysis.improvements && analysis.improvements.map((improvement, idx) => (
                  <li key={idx}>{improvement}</li>
                ))}
              </ul>
            </div>

            <div className="card keywords">
              <h3>🔑 Missing Keywords</h3>
              <div className="keyword-tags">
                {analysis.missingKeywords && analysis.missingKeywords.map((keyword, idx) => (
                  <span key={idx} className="keyword-tag">{keyword}</span>
                ))}
              </div>
            </div>
          </div>

          <div className="recommendations">
            <h3>📝 Recommendations</h3>
            <ol>
              {analysis.recommendations && analysis.recommendations.map((rec, idx) => (
                <li key={idx}>{rec}</li>
              ))}
            </ol>
          </div>

          <div className="action-buttons">
            <button className="btn-back" onClick={() => { setAnalysis(null); setFile(null); }}>
              ↩️ Upload Another
            </button>
            <button className="btn-download">
              📥 Download Report
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="resume-container">
      <div className="upload-section">
        <div className="upload-header">
          <h1>📄 Resume Analysis</h1>
          <p>Upload your resume for AI-powered feedback and optimization tips</p>
        </div>

        <div className="upload-area">
          <input
            type="file"
            id="resume-input"
            onChange={handleFileChange}
            accept=".pdf,.docx"
            style={{ display: 'none' }}
          />
          <div 
            className="upload-box"
            onClick={() => document.getElementById('resume-input').click()}
          >
            <div className="upload-icon">📄</div>
            <h3>Drag & drop your resume here</h3>
            <p>or click to browse</p>
            <p className="file-types">Accepted: PDF, DOCX</p>
          </div>

          {file && (
            <div className="file-info">
              <span>✅ {file.name}</span>
              <button 
                className="btn-remove"
                onClick={() => { setFile(null); setError(''); }}
              >
                Remove
              </button>
            </div>
          )}

          {error && <div className="error-message">{error}</div>}

          <button 
            className="btn-analyze"
            onClick={handleUpload}
            disabled={!file || loading}
          >
            🚀 Analyze Resume
          </button>
        </div>

        <div className="info-section">
          <h3>What you'll get:</h3>
          <ul>
            <li>✅ ATS (Applicant Tracking System) score</li>
            <li>✅ Strengths and weaknesses analysis</li>
            <li>✅ Missing keywords for your industry</li>
            <li>✅ Specific improvement recommendations</li>
            <li>✅ Format optimization suggestions</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default ResumeAnalysis;