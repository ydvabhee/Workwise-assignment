'use client'

import { authAtom } from "@/stores/auth-store"
import { useAtom } from "jotai"
import { redirect } from "next/navigation"
import { useRouter } from "next/navigation"
import { useEffect } from "react"


export const useLogout = () => {

  const [{token}, setToken] = useAtom(authAtom)
  const router = useRouter()

  const logout = () => {
    setToken({token: ''})
    localStorage.removeItem('token')
    router.push('/auth/signin')
  }
  return logout
}