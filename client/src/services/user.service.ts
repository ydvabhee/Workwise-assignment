"use client"

import { api } from "."

export const getUser = () => {
  return api.get('/user/')
}