import axios from 'axios';

// Base configuration for Axios
const apiClient = axios.create({
  baseURL: 'https://api.windshieldhub.com/api', // Replace with your API URL
  headers: {
    'Content-Type': 'application/json',
  },
});
const bToken = localStorage.getItem('authToken');
const apiClientAuth = axios.create({
  baseURL: 'https://api.windshieldhub.com/api', // Replace with your API URL
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${bToken}`
  },
});

export const getAuthData = async (endpoint) => {
  try {
    const response = await apiClientAuth.get(endpoint);
    return response.data;
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
};
// Example of GET request
export const getData = async (endpoint) => {
  try {
    const response = await apiClient.get(endpoint);
    return response.data;
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
};

// Example of POST request
export const postData = async (endpoint, data) => {
  try {
    const response = await apiClient.post(endpoint, data);
    return response.data;
  } catch (error) {
    console.error('Error posting data:', error);
    throw error;
  }
};

// Example for handling more requests (PUT, DELETE)
export const putData = async (endpoint, data) => {
  try {
    const response = await apiClient.put(endpoint, data);
    return response.data;
  } catch (error) {
    console.error('Error updating data:', error);
    throw error;
  }
};

export const deleteData = async (endpoint) => {
  try {
    const response = await apiClient.delete(endpoint);
    return response.data;
  } catch (error) {
    console.error('Error deleting data:', error);
    throw error;
  }
};
