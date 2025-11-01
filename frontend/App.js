import React, { useState, useEffect } from 'react';
import Login from './Login';
import './App.css';

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  const handleLogin = (userData) => {
    setUser(userData);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
  };

  if (!user) {
    return <Login onLogin={handleLogin} />;
  }

  return (
    <div className="App">
      <header className="app-header">
        <h1>🎯 Career Guidance AI System</h1>
        <div className="user-info">
          <span>Welcome, {user.name}!</span>
          <button onClick={handleLogout} className="logout-btn">Logout</button>
        </div>
      </header>
      
      <div className="dashboard">
        <div className="welcome-card">
          <h2>Welcome to Your Career Dashboard!</h2>
          <p>Get AI-powered personalized career recommendations based on your skills and interests.</p>
          
          <div className="quick-stats">
            <div className="stat-card">
              <h3>📝 Assessment</h3>
              <p>Take our comprehensive assessment to discover your perfect career path</p>
              <button className="primary-btn">Start Assessment</button>
            </div>
            
            <div className="stat-card">
              <h3>🎯 Recommendations</h3>
              <p>View AI-generated career recommendations tailored just for you</p>
              <button className="primary-btn">View Recommendations</button>
            </div>
            
            <div className="stat-card">
              <h3>📚 Learning Path</h3>
              <p>Explore courses and certifications to achieve your career goals</p>
              <button className="primary-btn">Explore Paths</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;