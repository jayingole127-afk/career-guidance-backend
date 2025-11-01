import React, { useState } from 'react';
import API from './api';
import AIAssistant from './AIAssistant';
import './Dashboard.css';

function Dashboard({ user, onLogout }) {
  const [currentView, setCurrentView] = useState('dashboard');
  const [currentTab, setCurrentTab] = useState('overview');
  const [showNotifications, setShowNotifications] = useState(false);
  const [showAIAssistant, setShowAIAssistant] = useState(false);
  const [notifications] = useState([
    { id: 1, text: 'New job match: Software Engineer at Google', time: '2 hours ago', unread: true },
    { id: 2, text: 'Complete your career assessment to get recommendations', time: '1 day ago', unread: true },
    { id: 3, text: 'Your learning progress: 46% in Design', time: '2 days ago', unread: false }
  ]);

  const handleAIAssistant = () => {
    setShowAIAssistant(true);
  };

  const handleNotificationClick = () => {
    setShowNotifications(!showNotifications);
  };

  return (
    <div className="dashboard-layout">
      {/* Sidebar */}
      <aside className="sidebar">
        <div className="sidebar-header">
          <div className="logo">
            <span className="logo-icon">🎯</span>
            <span className="logo-text">CareerAI</span>
          </div>
        </div>

        <nav className="sidebar-nav">
          <button 
            className={currentView === 'dashboard' ? 'nav-item active' : 'nav-item'}
            onClick={() => setCurrentView('dashboard')}
          >
            <span className="nav-icon">📊</span>
            <span>Dashboard</span>
          </button>

          <button 
            className={currentView === 'careers' ? 'nav-item active' : 'nav-item'}
            onClick={() => setCurrentView('careers')}
          >
            <span className="nav-icon">🔍</span>
            <span>Explore Careers</span>
          </button>

          <button 
            className={currentView === 'skills' ? 'nav-item active' : 'nav-item'}
            onClick={() => setCurrentView('skills')}
          >
            <span className="nav-icon">💡</span>
            <span>My Skills</span>
          </button>

          <button 
            className={currentView === 'jobs' ? 'nav-item active' : 'nav-item'}
            onClick={() => setCurrentView('jobs')}
          >
            <span className="nav-icon">💼</span>
            <span>Job Board</span>
          </button>

          <button 
            className={currentView === 'learning' ? 'nav-item active' : 'nav-item'}
            onClick={() => setCurrentView('learning')}
          >
            <span className="nav-icon">📚</span>
            <span>Learning</span>
          </button>

          <button 
            className={currentView === 'chat' ? 'nav-item active' : 'nav-item'}
            onClick={() => setCurrentView('chat')}
          >
            <span className="nav-icon">💬</span>
            <span>Chat</span>
          </button>
        </nav>

        <div className="sidebar-footer">
          <button className="logout-sidebar-btn" onClick={onLogout}>
            🚪 Logout
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="main-content">
        {/* Top Bar */}
        <header className="top-bar">
          <div className="search-bar">
            <span className="search-icon">🔍</span>
            <input type="text" placeholder="Search for careers, skills, courses..." />
          </div>
          <div className="top-actions">
            <button className="action-btn" onClick={handleAIAssistant}>
              🤖 AI Assistant
            </button>
            <button className="icon-btn" title="Toggle theme">
              ☀️
            </button>
            <div className="notification-wrapper">
              <button 
                className="icon-btn notification-btn" 
                onClick={handleNotificationClick}
                title="Notifications"
              >
                🔔
                <span className="badge">{notifications.filter(n => n.unread).length}</span>
              </button>
              
              {showNotifications && (
                <div className="notifications-dropdown">
                  <div className="notifications-header">
                    <h4>Notifications</h4>
                    <button className="mark-read-btn">Mark all as read</button>
                  </div>
                  <div className="notifications-list">
                    {notifications.map(notif => (
                      <div 
                        key={notif.id} 
                        className={notif.unread ? 'notification-item unread' : 'notification-item'}
                      >
                        <div className="notification-text">{notif.text}</div>
                        <div className="notification-time">{notif.time}</div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
            <div className="user-avatar" title={user.name}>
              {user.name.charAt(0).toUpperCase()}
            </div>
          </div>
        </header>

        {/* Content Area */}
        <div className="content-area">
          {currentView === 'dashboard' && (
            <DashboardHome 
              user={user} 
              currentTab={currentTab}
              setCurrentTab={setCurrentTab}
              handleAIAssistant={handleAIAssistant}
            />
          )}
          {currentView === 'careers' && <CareersView />}
          {currentView === 'skills' && <SkillsView />}
          {currentView === 'jobs' && <JobsView />}
          {currentView === 'learning' && <LearningView />}
          {currentView === 'chat' && <ChatView />}
        </div>
      </main>

      {/* AI Assistant Modal */}
      {showAIAssistant && (
        <AIAssistant 
          user={user} 
          onClose={() => setShowAIAssistant(false)} 
        />
      )}
    </div>
  );
}

// Dashboard Home Component
function DashboardHome({ user, currentTab, setCurrentTab, handleAIAssistant }) {
  const [expandedSkills, setExpandedSkills] = useState(false);

  const additionalSkills = [
    { name: 'Python', percent: 34 },
    { name: 'JavaScript', percent: 28 },
    { name: 'Communication', percent: 41 },
    { name: 'Problem Solving', percent: 52 },
    { name: 'Leadership', percent: 19 }
  ];

  return (
    <div className="dashboard-home">
      <div className="content-tabs">
        <button 
          className={currentTab === 'overview' ? 'tab active' : 'tab'}
          onClick={() => setCurrentTab('overview')}
        >
          Overview
        </button>
        <button 
          className={currentTab === 'details' ? 'tab active' : 'tab'}
          onClick={() => setCurrentTab('details')}
        >
          Details
        </button>
        <button 
          className={currentTab === 'tracker' ? 'tab active' : 'tab'}
          onClick={() => setCurrentTab('tracker')}
        >
          Skill tracker
        </button>
      </div>

      {currentTab === 'overview' && <OverviewTab user={user} expandedSkills={expandedSkills} setExpandedSkills={setExpandedSkills} additionalSkills={additionalSkills} handleAIAssistant={handleAIAssistant} />}
      {currentTab === 'details' && <DetailsTab user={user} />}
      {currentTab === 'tracker' && <SkillTrackerTab expandedSkills={expandedSkills} setExpandedSkills={setExpandedSkills} additionalSkills={additionalSkills} />}
    </div>
  );
}

// Overview Tab
function OverviewTab({ user, expandedSkills, setExpandedSkills, additionalSkills, handleAIAssistant }) {
  return (
    <>
      <div className="stats-row">
        <div className="stat-card-large">
          <div className="stat-label">
            <span>Assessment Progress</span>
            <span className="stat-trend">↑ 7%</span>
          </div>
          <div className="stat-number">0</div>
          <p className="stat-desc">Start your career assessment</p>
        </div>

        <div className="stat-card-large">
          <div className="stat-label">
            <span>Learning Hours</span>
            <span className="stat-trend positive">↑ 12%</span>
          </div>
          <div className="stat-number">0h</div>
          <p className="stat-desc">Time invested in courses</p>
        </div>

        <div className="skills-tracker-card">
          <div className="skills-header">
            <h4>Skill Progress</h4>
          </div>
          
          <div className="skill-item">
            <div className="skill-info">
              <span>Design</span>
              <span className="skill-percent">46%</span>
            </div>
            <div className="progress-bar">
              <div className="progress-fill green" style={{width: '46%'}}></div>
            </div>
          </div>

          <div className="skill-item">
            <div className="skill-info">
              <span>Management</span>
              <span className="skill-percent">12%</span>
            </div>
            <div className="progress-bar">
              <div className="progress-fill purple" style={{width: '12%'}}></div>
            </div>
          </div>

          <div className="skill-item">
            <div className="skill-info">
              <span>Software</span>
              <span className="skill-percent">27%</span>
            </div>
            <div className="progress-bar">
              <div className="progress-fill red" style={{width: '27%'}}></div>
            </div>
          </div>

          {expandedSkills && additionalSkills.map((skill, idx) => (
            <div className="skill-item" key={idx}>
              <div className="skill-info">
                <span>{skill.name}</span>
                <span className="skill-percent">{skill.percent}%</span>
              </div>
              <div className="progress-bar">
                <div className="progress-fill green" style={{width: `${skill.percent}%`}}></div>
              </div>
            </div>
          ))}

          <button 
            className="view-more-skills"
            onClick={() => setExpandedSkills(!expandedSkills)}
          >
            {expandedSkills ? '- show less skills' : '+ view 5 more skills'}
          </button>
        </div>
      </div>

      <div className="main-grid">
        <div className="career-feed-section">
          <div className="section-header">
            <h3>Career Opportunities</h3>
          </div>
          
          <div className="career-card">
            <div className="company-logo google">G</div>
            <div className="career-info">
              <h4>Software Engineer</h4>
              <p className="salary">$72-80/hr</p>
              <p className="location">Remote • Full-time</p>
            </div>
            <button className="apply-btn" onClick={() => alert('Application feature coming soon!')}>
              Apply →
            </button>
          </div>

          <div className="career-card">
            <div className="company-logo amazon">A</div>
            <div className="career-info">
              <h4>Data Analyst</h4>
              <p className="salary">$65-75/hr</p>
              <p className="location">Hybrid • Contract</p>
            </div>
            <button className="apply-btn" onClick={() => alert('Application feature coming soon!')}>
              Apply →
            </button>
          </div>
        </div>

        <div className="ai-assistant-card">
          <div className="ai-icon">🤖</div>
          <span className="offer-badge">OFFER</span>
          <h4>Try AI Career Coach</h4>
          <p>Get personalized career guidance and mock interviews</p>
          <button className="schedule-btn" onClick={handleAIAssistant}>
            Schedule →
          </button>
        </div>

        <div className="upload-card">
          <h4>Upload your CV</h4>
          <p>We will review it and provide recommendations</p>
          <div className="upload-area" onClick={() => document.getElementById('file-upload').click()}>
            <input 
              type="file" 
              id="file-upload" 
              style={{display: 'none'}} 
              accept=".pdf,.doc,.docx"
              onChange={(e) => {
                if (e.target.files[0]) {
                  alert(`File uploaded: ${e.target.files[0].name}\n\nResume analysis feature coming soon!`);
                }
              }}
            />
            <div className="upload-icon">📄</div>
            <p>Drag & Drop file here or click to browse</p>
          </div>
        </div>
      </div>

      <div className="section-header">
        <h3>Career Pathways</h3>
        <button className="view-all-btn" onClick={() => alert('View all pathways coming soon!')}>
          View all
        </button>
      </div>

      <div className="course-grid">
        <div className="course-card figma">
          <div className="course-icon">🎨</div>
          <h4>Creative Design</h4>
          <p>Advanced prototyping techniques</p>
          <div className="course-tags">
            <span className="tag">#design</span>
            <span className="tag">#creative</span>
          </div>
        </div>

        <div className="course-card ui">
          <div className="course-icon">📱</div>
          <h4>UI/UX Design</h4>
          <p>Design interfaces that captivate</p>
          <div className="course-tags">
            <span className="tag">#design</span>
            <span className="tag">#beginner</span>
          </div>
        </div>

        <div className="course-card sketch">
          <div className="course-icon">💼</div>
          <h4>Business Skills</h4>
          <p>Unleash management power</p>
          <div className="course-tags">
            <span className="tag">#business</span>
            <span className="tag">#advanced</span>
          </div>
        </div>
      </div>
    </>
  );
}

function DetailsTab({ user }) {
  return (
    <div className="details-tab">
      <div className="details-card">
        <h3>📋 Your Profile Details</h3>
        <div className="detail-row">
          <span className="detail-label">Name:</span>
          <span className="detail-value">{user.name}</span>
        </div>
        <div className="detail-row">
          <span className="detail-label">Email:</span>
          <span className="detail-value">{user.email}</span>
        </div>
        <div className="detail-row">
          <span className="detail-label">Assessment Status:</span>
          <span className="detail-value">{user.assessmentCompleted ? '✅ Completed' : '⏳ Pending'}</span>
        </div>
        <div className="detail-row">
          <span className="detail-label">Account Created:</span>
          <span className="detail-value">Recently</span>
        </div>
        <button className="edit-profile-btn">Edit Profile</button>
      </div>

      <div className="details-card">
        <h3>🎯 Career Preferences</h3>
        <p>Complete your assessment to set career preferences</p>
        <button className="cta-btn">Start Assessment</button>
      </div>
    </div>
  );
}

function SkillTrackerTab({ expandedSkills, setExpandedSkills, additionalSkills }) {
  const allSkills = [
    { name: 'Design', percent: 46 },
    { name: 'Management', percent: 12 },
    { name: 'Software', percent: 27 },
    ...additionalSkills
  ];

  return (
    <div className="skill-tracker-tab">
      <h3>📊 Detailed Skill Analysis</h3>
      <div className="skills-grid">
        {allSkills.map((skill, idx) => (
          <div className="skill-card" key={idx}>
            <h4>{skill.name}</h4>
            <div className="circular-progress">
              <span className="progress-value">{skill.percent}%</span>
            </div>
            <p>Track your progress and improve</p>
          </div>
        ))}
      </div>
    </div>
  );
}

function CareersView() {
  return (
    <div className="view-container">
      <h2>🔍 Explore Careers</h2>
      <p>Discover career paths that match your skills and interests</p>
      <div className="coming-soon-card">
        <h3>Career Assessment Coming Soon</h3>
        <p>Take our AI-powered assessment to find your perfect career</p>
        <button className="cta-btn">Get Notified</button>
      </div>
    </div>
  );
}

function SkillsView() {
  return (
    <div className="view-container">
      <h2>💡 My Skills</h2>
      <p>Track and improve your professional skills</p>
      <div className="coming-soon-card">
        <h3>Skills Dashboard</h3>
        <p>Advanced skills tracking and recommendations</p>
      </div>
    </div>
  );
}

function JobsView() {
  return (
    <div className="view-container">
      <h2>💼 Job Board</h2>
      <p>Browse career opportunities tailored for you</p>
      <div className="coming-soon-card">
        <h3>Personalized Job Matches</h3>
        <p>AI-powered job recommendations based on your profile</p>
      </div>
    </div>
  );
}

function LearningView() {
  return (
    <div className="view-container">
      <h2>📚 Learning Paths</h2>
      <p>Courses and certifications to advance your career</p>
      <div className="coming-soon-card">
        <h3>Learning Resources</h3>
        <p>Curated courses, tutorials, and certifications</p>
      </div>
    </div>
  );
}

function ChatView() {
  return (
    <div className="view-container">
      <h2>💬 Chat</h2>
      <p>Connect with mentors and peers</p>
      <div className="coming-soon-card">
        <h3>Community Chat</h3>
        <p>Network with professionals in your field</p>
      </div>
    </div>
  );
}

export default Dashboard;