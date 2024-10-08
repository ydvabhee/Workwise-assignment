"use client"
import { atom } from 'jotai';


export type User = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  type: string;
}
export const defaultUser: User = {
  id: '',
  firstName: '',
  lastName: '',
  email: '',
  type: '',
}


export const userAtom = atom(defaultUser);


