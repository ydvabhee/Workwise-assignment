'use client';

import { api } from ".";

export const signinService = async (email: string, password: string) => {
  const response = await api.post('/auth/signin', {
    email,
    password
  });
  return response;
};  


type SignupPayload = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
  type: string;
};


export const signupService = async (payload: SignupPayload) => {
  const response = await api.post('/auth/signup', payload);
  return response;
};
