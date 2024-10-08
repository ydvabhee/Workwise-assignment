// src/_app.tsx
"use client"
import type { AppProps } from 'next/app'
import { Provider, useAtom } from 'jotai'
import {NextUIProvider} from "@nextui-org/react";
import "@/app/globals.css";
import { Spinner } from '@/utills/Spinner';


import "react-toastify/dist/ReactToastify.css";
import ToastProvider from '@/providers/ToastProvider';
import { Component, PropsWithChildren, useEffect, useState } from 'react';
import { User, userAtom } from '@/stores/user.store';
import { getUser } from '@/services/user.service';
import { AxiosError } from 'axios';
import { Auth, authAtom } from '@/stores/auth-store';

 
export default function App({ Component, pageProps }: AppProps) {

 
  return (
    <Provider>
      <NextUIProvider>
      <ToastProvider>
        <Gateway>
      <Component {...pageProps} /> </Gateway>
      </ToastProvider>
      </NextUIProvider>
    </Provider>
  )
}


/**
 * Gateway component. If the user is logged in, it fetches the user's data on mount
 * and stores it in the userAtom. It then renders the children inside a Spinner
 * component, which shows a loading animation if the user data is being fetched.
 *
 * @param {PropsWithChildren} props The props for the Gateway component.
 * @returns {JSX.Element} The rendered component.
 */
const Gateway = (props : PropsWithChildren) => {
  const [isLoading, setIsLoading] = useState(false)
  const [{token}, setToken] = useAtom<Auth>(authAtom)
  const [user, setUser] = useAtom<User>(userAtom)

  const fetchUser = async () => {
    try {
      
      const response = await getUser()
      if (response.status === 200) {
        setUser(response.data.user)
      }
       
    } catch (error: AxiosError | any) {
      
      if(error.response?.status === 401) {
        localStorage.removeItem('token')
        window.location.href = '/auth/signin'
      }
      console.log(" error ", error);

    }
  }
  useEffect(() => {
    const localToken = localStorage.getItem('token') || null
    if (localToken) {
      setToken({token: localToken})
     
    }
  }, [])

  useEffect(() => {
    if(token) {
      setIsLoading(true)
      fetchUser()
      setIsLoading(false)

    }
  }, [token])

  if(isLoading) {
    return null
  }

  return <Spinner isLoading={isLoading}>{props.children}</Spinner>
}