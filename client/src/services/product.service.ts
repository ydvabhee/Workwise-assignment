'use client';

import { api } from ".";



export type CreateProductPayload = {
  name: string;
  category: string;
  price: number;
  discount: number;
};

export const defautProductValue = {
  name: '',
  category: '',
  price: 0,
  discount: 0
}

export const createProduct = async (payload: CreateProductPayload) => {
  const response = await api.post('/product/', payload);
  return response;
}

export const getAllProducts = async () => {
  const response = await api.get('/product/');
  return response;
}

export const getSellerProducts = async () => {
  const response = await api.get('/product/seller_products');
  return response;
}

export const deleteProduct = async (id: string) => {
  const response = await api.delete(`/product/${id}`);
  return response;
}