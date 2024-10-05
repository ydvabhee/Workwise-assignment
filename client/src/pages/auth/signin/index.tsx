"use client"

import Link from "next/link";
import "@/app/globals.css";

import {authAtom} from '@/stores/auth-store'
import { useAtom } from 'jotai'
import { useEffect, FormEvent } from "react";
import { useRouter } from 'next/router'

export default function Signin() {

    const [{token}, setToken] = useAtom(authAtom)

    const router = useRouter()

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault()
       
        const formData = new FormData(e.target as HTMLFormElement)
        const email = formData.get('email')
        const password = formData.get('password')

        console.log(email, password)
    }

    useEffect(() => {
        setToken({ token: 'test' })
    }, [])

    return <div className="bg-gray-100 font-sans leading-normal tracking-normal h-screen flex items-center justify-center">
    <div className="bg-white shadow-lg rounded-lg p-8 max-w-md w-full">
      <h1 className="text-2xl font-bold mb-6 text-center text-slate-800">Sign In</h1>
      <form onSubmit={handleSubmit}>
          <div className="mb-4">
              <label htmlFor="email" className="block text-gray-700 mb-2 text-sm">Email</label>
              <input type="email" name="email" id="email" required className="w-full p-2 border rounded text-slate-800" placeholder="Enter your email" />
          </div>
          <div className="mb-6">
              <label htmlFor="password" className="block text-gray-700 mb-2 text-sm">Password</label>
              <input type="password" name="password" id="password" required className="w-full p-2 border rounded text-slate-800" placeholder="Enter your password" />
          </div>
          <div className="flex items-center justify-between mb-4">
              
              <a href="#" className="text-blue-500 hover:underline">Forgot password?</a>
          </div>
          <button type="submit" className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white p-2 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 ease-in-out">Login</button>
      </form>
      <p className="mt-6 text-center text-gray-700">Don't have an account? <Link href="/auth/signup" className="text-blue-500 hover:underline">Sign up</Link></p>
      
    </div>
  </div>;
}