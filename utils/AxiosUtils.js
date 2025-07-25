import axios from 'axios';
import { toast } from 'react-hot-toast';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'https://jsonplaceholder.typicode.com';

const api = axios.create({
  baseURL: API_URL,
  timeout: 10000,
});

const handleError = (error) => {
  let message = 'Something went wrong';

  if (error.response) {
    console.error('API Error:', error.response.status, error.response.data);
    message = error.response.data?.message || message;
  } else if (error.request) {
    console.error('Network Error:', error.request);
    message = 'No response from server';
  } else {
    console.error('Error:', error.message);
    message = error.message || message;
  }

  toast.error(message);
  throw new Error(message);
};

export const getData = async (endpoint) => {
  try {
    const res = await api.get(endpoint);
    return res.data;
  } catch (error) {
    handleError(error);
  }
};

export const postData = async (endpoint, data) => {
  try {
    const res = await api.post(endpoint, data);
    return res.data;
  } catch (error) {
    handleError(error);
  }
};

export const postFormData = async (endpoint, formData) => {
  try {
    const res = await api.post(endpoint, formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    return res.data;
  } catch (error) {
    handleError(error);
  }
};
