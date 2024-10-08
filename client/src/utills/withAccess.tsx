'use client'
import { useRouter } from "next/navigation";
import { Component, ComponentClass, FunctionComponent, PropsWithChildren, useEffect, useState } from "react";
import React from "react";
import { useAtom } from 'jotai'
import { authAtom } from '../stores/auth-store'
import { userAtom } from "../stores/user.store"
import { Spinner } from "./Spinner";

const withAccess = (Component: FunctionComponent, roles: string[]) => {


  const Access = (props: PropsWithChildren) => {


    const [isLoading, setIsLoading] = useState(true)
    const router = useRouter()

    const [user] = useAtom(userAtom)

    useEffect(() => {

      // check if user is logged in
      if (user.id) {
        if (roles.includes(user.type)) {
          setIsLoading(false)
        }
        else if (user.type === 'buyer') {
          router.replace('/store')
        }
        else if (user.type === 'seller') {
          router.replace('/dashboard')
        } else {
          router.replace('/')
        }
      } else {
        // redirect to signin page after 2 seconds if user is not logged in
        const redirect = setTimeout(() => {
          router.replace('/')

        }, 2000)
        return () => clearTimeout(redirect)
      }

    }, [user, props.children])

    if (isLoading) {
      return <Spinner isLoading={isLoading}> </Spinner>
    }

    return <Component {...props as any} />
  }

  return Access
}

export default withAccess