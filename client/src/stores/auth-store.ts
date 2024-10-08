"use client"
import { atom } from 'jotai';

export type Auth = {
  token: string | null
}

export const defaultAuth: Auth = {
  token: '',
}

export const authAtom = atom(defaultAuth);


