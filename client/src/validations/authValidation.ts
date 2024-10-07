import {z} from 'zod';

export const validateName = (value:string) => z.string().regex(/^[a-zA-Z]+$/).safeParse(value).success === false; 
export const validateEmail = (value:string) => z.string().email().safeParse(value).success === false; 
export const validatePassword = (value:string) => z.string().min(6).safeParse(value).success === false;


