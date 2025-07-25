import axios from 'axios';

const API = process.env.REACT_APP_API_URL || 'https://jsonplaceholder.typicode.com';

export const getPosts = async () => {
  const res = await axios.get(`${API}/posts`);
  return res.data;
};

export const getPost = async (id) => {
  const res = await axios.get(`${API}/posts/${id}`);
  return res.data;
};

export const getUsers = async () => {
  const res = await axios.get(`${API}/users`);
  return res.data;
};

export const getUser = async (id) => {
  const res = await axios.get(`${API}/users/${id}`);
  return res.data;
};

export const getComments = async (postId) => {
  const res = await axios.get(`${API}/comments?postId=${postId}`);
  return res.data;
};
