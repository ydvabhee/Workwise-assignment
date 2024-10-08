"use client"

import "@/app/globals.css";
import Link from 'next/link'
import { useAtom } from 'jotai'
import { useEffect, useState } from "react";
import { useLogout } from "@/hooks/useLogout";
import { User, userAtom } from "@/stores/user.store";
import { getUser } from "@/services/user.service";
import { Spinner } from "@/utills/Spinner";
import { useCallback } from "react";

export default function Home() {

  const [token, setToken] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [user, setUser] = useAtom<User>(userAtom)
  const logout = useLogout()

  const fetchUser = useCallback(async () => {
    try {
      setIsLoading(true)
      const response = await getUser()
      if (response.status === 200) {
        setUser(response.data.user)
      }
      setIsLoading(false)
    } catch (error) {
      setIsLoading(false)
      console.log(error);

    }
  }, [setUser])

  useEffect(() => {
    const localToken = localStorage.getItem('token')
    if (localToken) {
      setToken(localToken)
      fetchUser()
    }
  }, [fetchUser])





  return (
    <Spinner isLoading={isLoading}>
      <div className="bg-gray-100 font-sans leading-normal tracking-normal h-screen flex flex-col justify-center items-center mx-auto">
        <div className="bg-white shadow-lg rounded-lg p-8 max-w-lg w-full">
          <h1 className="text-3xl font-bold mb-6 text-center text-slate-800">Welcome to Our Marketplace</h1>
          <p className="text-gray-700 mb-6 text-center">Join us as a Seller or Buyer! Our platform allows sellers to easily manage their products and buyers to find great deals.</p>

          {(!token || !user.id ) && (<div className="flex justify-center space-x-4 mb-6">
            <Link href="/auth/signin" className="bg-blue-500 text-white px-4 py-2 rounded-lg shadow-lg hover:bg-blue-400 transition-all duration-300 ease-in-out">Sign In</Link>
            <Link href="/auth/signup" className="bg-green-500 text-white px-4 py-2 rounded-lg shadow-lg hover:bg-green-400 transition-all duration-300 ease-in-out">Sign Up</Link>
          </div>)} 
          
          {user.id && (
            <>
            <div className="flex justify-center space-x-4 mb-6">
              {/* show dashboard if user is a buyer  */}
              {user?.type === 'buyer' &&
              (<Link href="/store" className="bg-primary text-white px-4 py-2 rounded-lg shadow-lg hover:bg-slate-500 transition-all duration-300 ease-in-out">Store</Link>)}
              {/* show dashboard if user is a seller */}
              {user?.type === 'seller' && 
              (<Link href="/dashboard" className="bg-primary text-white px-4 py-2 rounded-lg shadow-lg hover:bg-slate-500 transition-all duration-300 ease-in-out">Dashboard</Link>
              )}
              <span onClick={() => logout()} className=" cursor-pointer text-slate-500 px-4 py-2 ">Logout</span>
            </div>
          </>)}

          <h2 className="text-xl font-semibold mb-4 text-slate-600">Features:</h2>
          <ul className="list-disc list-inside text-gray-700 mb-6">
            <li>Sign up as a Seller or Buyer</li>
            <li>Sellers can add products with details:</li>
            <ul className="list-disc list-inside ml-4">

              <li>Name</li>
              <li>Category (e.g., clothes, shoes)</li>
              <li>Description</li>
              <li>Price</li>
              <li>Discount</li>
            </ul>
            <li>Sellers can edit or delete their products</li>
            <li>Buyers can log in and search for products by name or category</li>
            <li>Buyers can add products to their cart with &quot;Add to Cart&quot; functionality</li>
            <li>Buyers can remove products from their cart list</li>
          </ul>

          <p className="text-gray-600 text-center">Get started today and explore the endless possibilities!</p>
        </div>
      </div> </Spinner>
  );
}
