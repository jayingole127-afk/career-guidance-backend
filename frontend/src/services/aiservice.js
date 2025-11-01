// src/services/aiservice.js

const API_URL = process.env.REACT_APP_API_URL;

export const getAIRecommendations = async (message) => {
  try {
    const response = await fetch(`${API_URL}/api/ai/recommendations`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ message }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("AI Service Error:", error);
    throw error;
  }
};