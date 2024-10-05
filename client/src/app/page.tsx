"use client"
import Image from "next/image";
import Link from 'next/link'

import {authAtom} from '@/stores/auth-store'
import { useAtom } from 'jotai'
import { useEffect } from "react";

export default function Home() {

  const [{token}, setToken] = useAtom(authAtom)

  useEffect(() => {
    setToken({ token: '1234567890' })
  }, [])

  return (
  <div className="bg-gray-100 font-sans leading-normal tracking-normal h-screen flex flex-col justify-center items-center mx-auto">
  <div className="bg-white shadow-lg rounded-lg p-8 max-w-lg w-full">
    <h1 className="text-3xl font-bold mb-6 text-center text-slate-800">Welcome to Our Marketplace</h1>
    <p className="text-gray-700 mb-6 text-center">Join us as a Seller or Buyer! Our platform allows sellers to easily manage their products and buyers to find great deals.</p>
    
    <div className="flex justify-center space-x-4 mb-6">
      <Link href="/auth/signin" className="bg-blue-500 text-white px-4 py-2 rounded-lg shadow-lg hover:bg-blue-400 transition-all duration-300 ease-in-out">Sign In</Link>
      <Link href="/auth/signup" className="bg-green-500 text-white px-4 py-2 rounded-lg shadow-lg hover:bg-green-400 transition-all duration-300 ease-in-out">Sign Up</Link>
    </div>

    <h2 className="text-xl font-semibold mb-4 text-slate-600">Features:</h2>
    <ul className="list-disc list-inside text-gray-700 mb-6">
      <li>Sign up as a Seller or Buyer</li>
      <li>Sellers can add products with details:</li>
      <ul className="list-disc list-inside ml-4">
        <li>{token}</li>
        <li>Name</li>
        <li>Category (e.g., clothes, shoes)</li>
        <li>Description</li>
        <li>Price</li>
        <li>Discount</li>
      </ul>
      <li>Sellers can edit or delete their products</li>
      <li>Buyers can log in and search for products by name or category</li>
      <li>Buyers can add products to their cart with "Add to Cart" functionality</li>
      <li>Buyers can remove products from their cart list</li>
    </ul>

    <p className="text-gray-600 text-center">Get started today and explore the endless possibilities!</p>
  </div>
</div>
  );
}
