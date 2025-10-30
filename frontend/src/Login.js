import React, { useState } from 'react';
import API from './api';
import './Login.css';

function Login({ onLogin }) {
  const [isRegister, setIsRegister] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    age: '',
    education: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const endpoint = isRegister ? '/auth/register' : '/auth/login';
      const data = isRegister ? formData : { email: formData.email, password: formData.password };
      
      const response = await API.post(endpoint, data);
      
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('user', JSON.stringify(response.data.user));
      
      onLogin(response.data.user);
    } catch (err) {
      setError(err.response?.data?.message || 'Connection error. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <div className="login-left">
        <div className="login-content">
          <h1>🎯 Career Guidance AI</h1>
          <p className="tagline">Discover your perfect career path with AI-powered recommendations</p>
          <ul className="features-list">
            <li>✨ Personalized Career Recommendations</li>
            <li>🧠 AI-Powered Psychometric Assessment</li>
            <li>📈 Career Growth Insights</li>
            <li>🎓 Learning Path Generation</li>
          </ul>
        </div>
      </div>
      
      <div className="login-right">
        <div className="login-card">
          <h2>{isRegister ? 'Create Your Account' : 'Welcome Back!'}</h2>
          <p className="subtitle">
            {isRegister ? 'Start your career journey today' : 'Login to continue your journey'}
          </p>
          
          {error && <div className="error-message">⚠️ {error}</div>}
          
          <form onSubmit={handleSubmit}>
            {isRegister && (
              <>
                <div className="form-group">
                  <label>Full Name</label>
                  <input
                    type="text"
                    name="name"
                    placeholder="Enter your full name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                </div>
                
                <div className="form-row">
                  <div className="form-group">
                    <label>Age</label>
                    <input
                      type="number"
                      name="age"
                      placeholder="Age"
                      value={formData.age}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  
                  <div className="form-group">
                    <label>Education</label>
                    <input
                      type="text"
                      name="education"
                      placeholder="B.Tech, Class 12"
                      value={formData.education}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>
              </>
            )}
            
            <div className="form-group">
              <label>Email Address</label>
              <input
                type="email"
                name="email"
                placeholder="Enter your email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
            
            <div className="form-group">
              <label>Password</label>
              <input
                type="password"
                name="password"
                placeholder="Enter your password"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </div>
            
            <button type="submit" className="submit-btn" disabled={loading}>
              {loading ? '🔄 Processing...' : (isRegister ? '🚀 Create Account' : '🔓 Login')}
            </button>
          </form>
          
          <div className="toggle-section">
            <p>
              {isRegister ? 'Already have an account?' : "Don't have an account?"}
              <button 
                type="button" 
                className="toggle-link" 
                onClick={() => setIsRegister(!isRegister)}
              >
                {isRegister ? 'Login here' : 'Sign up here'}
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;