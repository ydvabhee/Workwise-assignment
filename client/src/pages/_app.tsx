// src/_app.tsx
"use client"
import type { AppProps } from 'next/app'
import { Provider } from 'jotai'
import {NextUIProvider} from "@nextui-org/react";


import "react-toastify/dist/ReactToastify.css";
import ToastProvider from '@/providers/ToastProvider';

 
export default function App({ Component, pageProps }: AppProps) {
  return (
    <Provider>
      <NextUIProvider>
      <ToastProvider>
      <Component {...pageProps} />
      </ToastProvider>
      </NextUIProvider>
    </Provider>
  )
}
