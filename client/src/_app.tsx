// src/_app.tsx
"use client"
import type { AppProps } from 'next/app'
import { Provider } from 'jotai'

 
export default function App({ Component, pageProps }: AppProps) {
  return (
    <Provider>
      <Component {...pageProps} />
    </Provider>
  )
}
