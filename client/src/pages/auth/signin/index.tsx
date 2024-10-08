"use client"

import Link from "next/link";
import "@/app/globals.css";
import { Button, Input } from "@nextui-org/react";

import { authAtom } from '@/stores/auth-store'
import { useAtom } from 'jotai'
import React, { FormEvent, useState } from "react";
import { useRouter } from 'next/router'
import { signinService } from "@/services/auth.service";
import { toast } from "react-toastify";
import { validateEmail } from "@/validations/authValidation";
import { Spinner } from "@/utills/Spinner";
const Signin = () => {

    const router = useRouter()
    const [{ token }, setToken] = useAtom(authAtom)


    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [isButtonLoading, setIsButtonLoading] = useState(false)
    const [isInvalid, setIsInvalid] = React.useState({
        email: false,
    })

    const handleEmailChange = (value: string) => {
        setEmail(value)
        setIsInvalid({ ...isInvalid, email: validateEmail(value) })
    }

    const handleSubmit = async (e: FormEvent) => {
        try {
            e.preventDefault()
            setIsButtonLoading(true)
            const response = signinService(email, password)

            await toast.promise(
                response,
                {
                    pending: 'Signing in...',
                    success: {


                        render({ data: resp }) {
                            if (resp.status === 200) {

                                setToken({ token: resp.data.token })
                                localStorage.setItem('token', resp.data.token)

                            }
                            return 'User signed in successfully'
                        }
                    },
                    error: {
                        render({ data: err }: any) {

                            return err?.response?.data?.message || 'Something went wrong'
                        },
                    },
                }
            );
            router.push('/dashboard')
            setIsButtonLoading(false)
        } catch (error) {
            console.log(error);
            setIsButtonLoading(false)
            // toast.error('Something went wrong')
        }
    }


    return <Spinner isLoading={false}> <div className="bg-gray-100 font-sans leading-normal tracking-normal h-screen flex items-center justify-center">
        <div className="bg-white shadow-lg rounded-lg p-8 max-w-md w-full">
            <h1 className="text-2xl font-bold mb-6 text-center text-slate-800">Sign In</h1>
            <form onSubmit={handleSubmit}>

                <div className="mb-4">
                    <Input
                        required={true}

                        value={email}
                        type="email"
                        label="Email"
                        isInvalid={isInvalid.email}
                        variant="bordered"
                        className="text-slate-800"
                        errorMessage="Please enter a valid email address"
                        onValueChange={handleEmailChange}

                    /> </div>
                <div className="mb-4">
                    <Input
                        required={true}
                        value={password}
                        type="password"
                        label="Password"
                        variant="bordered"
                        className="text-slate-800"
                        errorMessage="Password must be at least 6 characters"
                        onValueChange={setPassword}


                    /> </div>
                <Button isLoading={isButtonLoading} color="primary" className="cursor-pointer w-full p-2 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 ease-in-out" type="submit" >Sign In</Button>
            </form>
            <p className="mt-6 text-center text-gray-700">Don't have an account? <Link href="/auth/signup" className="text-blue-500 hover:underline">Sign up</Link></p>

        </div>
    </div> </Spinner>;
}

export default Signin