import {z} from 'zod';

export const signupSchema = z.object({
  fname: z
    .string().
    .min(2, {message: 'First name must be at least 2 characters'})
    .max(50, {message: 'First name must be less than 50 characters'}),
  lname: z
    .string()
    .min(2, {message: 'Last name must be at least 2 characters'})
    .max(50, {message: 'Last name must be less than 50 characters'}),
  email: z
    .string()
    .min(5, {message: 'Email must be at least 5 characters'})
    .max(50, {message: 'Email must be less than 50 characters'})
    .email({message: 'Email must be a valid email'}),
  password: z
    .string()
    .min(5, {message: 'Password must be at least 5 characters'})
    .max(50, {message: 'Password must be less than 50 characters'}),
  confirmPassword: z
    .string()
    .min(5, {message: 'Confirm password must be at least 5 characters'})
    .max(50, {message: 'Confirm password must be less than 50 characters'}),
  type: z
    .string()
    .min(1, {message: 'Type must be at least 1 character'})
    .max(10, {message: 'Type must be less than 10 characters'})
});