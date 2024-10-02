import axios from 'axios';
import dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();

const GEMINI_API_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent';
const API_KEY = process.env.API_KEY; // Use the API key from environment variables

// Function to get responses from the Gemini API
export const getGeminiResponse = async (userInput) => {
  try {
    const response = await axios.post(GEMINI_API_URL, {
      contents: [
        {
          parts: [
            {
              text: userInput,
            },
          ],
        },
      ],
    }, {
      headers: {
        'Content-Type': 'application/json',
      },
      params: {
        key: API_KEY, // Use the API key as a query parameter
      },
    });

    return response.data; // Adjust based on the response structure
  } catch (error) {
    console.error('Error fetching response from Gemini API:', error);
    return {
      error: error.response ? error.response.data : 'Error processing request',
    };
  }
};

// Function for sentiment analysis (replace this with actual API call if needed)
export const getSentiment = async (text) => {
  try {
    const sentiment = text.includes('happy') ? 'positive' : 'negative'; // Example sentiment logic
    return sentiment;
  } catch (error) {
    console.error('Error fetching sentiment:', error);
    return { error: 'Error processing sentiment analysis' };
  }
};

// Function to save journal entries
export const saveJournal = async (journalData) => {
  try {
    const response = await axios.post('https://your-backend-url.com/saveJournal', journalData);
    return response.data;
  } catch (error) {
    console.error('Error saving journal entry:', error);
    return { error: 'Error saving journal' };
  }
};

// Function to save mood data
export const saveMood = async (moodData) => {
  try {
    const response = await axios.post('https://your-backend-url.com/saveMood', moodData);
    return response.data;
  } catch (error) {
    console.error('Error saving mood:', error);
    return { error: 'Error saving mood data' };
  }
};
