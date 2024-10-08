/* eslint-disable @typescript-eslint/no-explicit-any */
import { useRouter } from "next/navigation";
import { FunctionComponent, PropsWithChildren, useEffect, useState } from "react";


const withAuth = (Component: FunctionComponent) => {

  const Auth = (props : PropsWithChildren) => {

    const [isLoading, setIsLoading] = useState(true)
    const router = useRouter()
    useEffect(() => {
      if (!localStorage.getItem('token')) {
        router.push('/auth/signin')
      } else {
        setIsLoading(false)
      }
      
      
    }, [router])

    if(isLoading) {
      return null
    }

    return <Component {...props as any} />
  }
  
  return Auth
}

export default withAuth