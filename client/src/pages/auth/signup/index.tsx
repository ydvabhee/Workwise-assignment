"use client"

import Link from "next/link";
import "@/app/globals.css";

import {authAtom} from '@/stores/auth-store'
import { useAtom } from 'jotai'
import { useEffect } from "react";  

export default function Signup() {

    const [{token}, setToken] = useAtom(authAtom)

    useEffect(() => {
        setToken({ token: 'test123   ' })
    }, [])
    return <div><div className="bg-gray-100 font-sans leading-normal tracking-normal h-screen flex items-center justify-center">
    <div className="bg-white shadow-lg rounded-lg p-8 max-w-md w-full">
      <h1 className="text-2xl font-bold mb-6 text-center text-slate-800">Sign Up</h1>
      {token}
      <form>
          <div className="mb-4">
              <label htmlFor="email" className="block text-gray-700 mb-2">Email</label>
              <input type="email" id="email" className="w-full p-2 border rounded" placeholder="Enter your email"/>
          </div>
          <div className="mb-4">
              <label htmlFor="password" className="block text-gray-700 mb-2">Password</label>
              <input type="password" id="password" className="w-full p-2 border rounded" placeholder="Enter your password"/>
          </div>
          <div className="mb-4">
              <label htmlFor="password" className="block text-gray-700 mb-2"> Confirm Password</label>
              <input type="password" id="password" className="w-full p-2 border rounded" placeholder="Enter your password"/>
          </div>
          <div className="mb-6">
              <label className="block text-gray-700 mb-2">I am a:</label>
              <div className="flex items-center mb-4">
                  <input type="radio" id="buyer" name="user-type" value="buyer" className="mr-2" />
                  <label htmlFor="buyer" className="text-gray-700">Buyer</label>
              </div>
              <div className="flex items-center">
                  <input type="radio" id="seller" name="user-type" value="seller" className="mr-2" />
                  <label htmlFor="seller" className="text-gray-700">Seller</label>
              </div>
          </div>
          <button type="submit" className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white p-2 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 ease-in-out">Sign Up</button>
      </form>
      <p className="mt-6 text-center text-gray-700">Already have an account? <Link href="/auth/signin" className="text-blue-500 hover:underline">Sign In</Link></p>
      
    </div>
  </div></div>;
  }