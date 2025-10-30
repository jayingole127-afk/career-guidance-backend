import React, { useState, useRef, useEffect } from 'react';
import API from './api';
import './AIAssistant.css';

function AIAssistant({ user, onClose }) {
  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      content: `Hi ${user.name}! 👋 I'm your AI Career Coach powered by Google Gemini. I can help you with:\n\n• Career guidance and recommendations\n• Resume review and improvement tips\n• Interview preparation\n• Skill development advice\n• Career path exploration\n\nWhat would you like to discuss today?`
    }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage = input.trim();
    setInput('');
    
    // Add user message
    setMessages(prev => [...prev, { role: 'user', content: userMessage }]);
    setLoading(true);

    try {
      // Call backend AI endpoint
      const response = await API.post('/career/ai-chat', {
        message: userMessage,
        context: {
          userName: user.name,
          userEmail: user.email,
          assessmentCompleted: user.assessmentCompleted
        }
      });

      // Add AI response
      setMessages(prev => [...prev, {
        role: 'assistant',
        content: response.data.response
      }]);
    } catch (error) {
      console.error('AI Chat Error:', error);
      setMessages(prev => [...prev, {
        role: 'assistant',
        content: "I apologize, but I'm having trouble connecting right now. Please make sure your backend is running with the Gemini API configured."
      }]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const quickPrompts = [
    "Help me choose a career",
    "Review my skills",
    "Prepare for interview",
    "Career growth tips"
  ];

  return (
    <div className="ai-assistant-overlay">
      <div className="ai-assistant-modal">
        <div className="ai-header">
          <div className="ai-header-info">
            <div className="ai-avatar">🤖</div>
            <div>
              <h3>AI Career Coach</h3>
              <p className="ai-status">
                <span className="status-dot"></span> Online
              </p>
            </div>
          </div>
          <button className="close-btn" onClick={onClose}>✕</button>
        </div>

        <div className="ai-messages">
          {messages.map((msg, idx) => (
            <div 
              key={idx} 
              className={msg.role === 'user' ? 'message user-message' : 'message ai-message'}
            >
              {msg.role === 'assistant' && (
                <div className="message-avatar">🤖</div>
              )}
              <div className="message-content">
                <div className="message-text">{msg.content}</div>
                <div className="message-time">
                  {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </div>
              </div>
              {msg.role === 'user' && (
                <div className="message-avatar user-avatar">
                  {user.name.charAt(0).toUpperCase()}
                </div>
              )}
            </div>
          ))}
          
          {loading && (
            <div className="message ai-message">
              <div className="message-avatar">🤖</div>
              <div className="message-content">
                <div className="typing-indicator">
                  <span></span>
                  <span></span>
                  <span></span>
                </div>
              </div>
            </div>
          )}
          
          <div ref={messagesEndRef} />
        </div>

        {messages.length === 1 && (
          <div className="quick-prompts">
            <p className="quick-prompts-label">Quick suggestions:</p>
            <div className="quick-prompts-grid">
              {quickPrompts.map((prompt, idx) => (
                <button
                  key={idx}
                  className="quick-prompt-btn"
                  onClick={() => {
                    setInput(prompt);
                    setTimeout(() => handleSend(), 100);
                  }}
                >
                  {prompt}
                </button>
              ))}
            </div>
          </div>
        )}

        <div className="ai-input-area">
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Ask me anything about your career..."
            rows="2"
            disabled={loading}
          />
          <button 
            className="send-btn" 
            onClick={handleSend}
            disabled={loading || !input.trim()}
          >
            {loading ? '⏳' : '➤'}
          </button>
        </div>
      </div>
    </div>
  );
}

export default AIAssistant;