'use client'

import { authAtom } from "@/stores/auth-store"
import { defaultUser, userAtom } from "@/stores/user.store"
import { useAtom } from "jotai"
import { redirect } from "next/navigation"
import { useRouter } from "next/navigation"
import { useEffect } from "react"
import { toast } from "react-toastify"


export const useLogout = () => {

  const [_, setToken] = useAtom(authAtom)
  const [user, setUser] = useAtom(userAtom)
  const router = useRouter()

  const logout = () => {
    toast.success('Logged out successfully')
    setToken({token: ''})
    localStorage.removeItem('token')
    setUser(defaultUser)
    router.push('/auth/signin')
  }
  return logout
}