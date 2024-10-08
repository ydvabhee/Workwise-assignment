/* eslint-disable @typescript-eslint/no-unused-vars */
'use client'

import { authAtom } from "@/stores/auth-store"
import { defaultUser, userAtom } from "@/stores/user.store"
import { useAtom } from "jotai"
import { useRouter } from "next/navigation"
import { toast } from "react-toastify"


export const useLogout = () => {

  const [_, setToken] = useAtom(authAtom) 
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [user, setUser] = useAtom(userAtom) // @typescript-eslint/no-unused-vars
  const router = useRouter()

  const logout = () => {
    router.push('/auth/signin')
    toast.success('Logged out successfully')
    setToken({token: ''})
    localStorage.removeItem('token')
    setUser(defaultUser)
    
  }
  return logout
}