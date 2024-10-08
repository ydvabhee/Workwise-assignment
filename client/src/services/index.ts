'use client';
import axios from 'axios';

export const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_SERVER_URL,
})

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
})

api.interceptors.response.use((response) => {
  return response;
}, (error) => {
  return Promise.reject(error);
})