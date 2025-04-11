import axios from 'axios';

const API_BASE_URL = '/manansala/personalities'; // Use proxy in Vite to route requests

// Fetch all personalities (GET)
export const getPersonalities = async () => {
  try {
    const response = await axios.get(API_BASE_URL); // Proxy will route this to `http://localhost:8080`
    return response.data;
  } catch (error) {
    console.error('Error fetching personalities:', error);
    throw error;
  }
};

// Add a new personality (POST)
export const addPersonality = async (personality) => {
  try {
    const response = await axios.post(API_BASE_URL, personality);
    return response.data;
  } catch (error) {
    console.error('Error adding personality:', error);
    throw error;
  }
};

// Add multiple personalities in bulk (POST BULK)
export const addPersonalitiesBulk = async (personalities) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/bulk`, personalities);
    return response.data;
  } catch (error) {
    console.error('Error adding personalities in bulk:', error);
    throw error;
  }
};
