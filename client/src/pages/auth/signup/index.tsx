"use client"

import Link from "next/link";
import "@/app/globals.css";
import { RadioGroup, Radio, cn, Button, Input } from "@nextui-org/react";
import { authAtom } from '@/stores/auth-store'
import { useAtom } from 'jotai'
import React, { FormEvent } from "react";
import { toast } from "react-toastify";
import { signupService } from "@/services/auth.service";
import { useRouter } from "next/router";
import { validateEmail, validateName, validatePassword } from "@/validations/authValidation";

export default function Signup() {

    const router = useRouter()

    // local states
    const [firstName, setFirstName] = React.useState('')
    const [lastName, setLastName] = React.useState('')
    const [email, setEmail] = React.useState('')
    const [password, setPassword] = React.useState('')
    const [confirmPassword, setConfirmPassword] = React.useState('')
    const [type, setType] = React.useState('buyer')

    const [isButtonLoading, setIsButtonLoading] = React.useState(false)
    const [isInvalid, setIsInvalid] = React.useState({
        firstName: false,
        lastName: false,
        email: false,
        password: false,
        confirmPassword: false
    })



    const handleSubmit = async (e: FormEvent) => {
        try {
            e.preventDefault()
            const response = signupService({
                firstName,
                lastName,
                email,
                password,
                confirmPassword,
                type
            })

            await toast.promise(
                response,
                {
                    pending: 'Signing up...',
                    success: {
                        render({ data: resp }) {
                            return resp.data.message
                        },
                    },
                    error: {
                        render({ data: err }: any) {
                            return err.response.data.message || err?.response?.data?.error || 'Something went wrong'
                        },
                    },
                }
            )
            toast.success('Please login to continue')
            router.push('/auth/signin')
        }

        catch (error: any) {
            console.log(error)
        }
    }






    const handleFirstNameChange = (value: string) => {
        setFirstName(value)
        setIsInvalid({ ...isInvalid, firstName: validateName(value) })
    }

    const handleLastNameChange = (value: string) => {
        setLastName(value)
        setIsInvalid({ ...isInvalid, lastName: validateName(value) })
    }
    const handleEmailChange = (value: string) => {
        setEmail(value)
        setIsInvalid({ ...isInvalid, email: validateEmail(value) })
    }
    const handlePasswordChange = (value: string) => {
        setPassword(value)
        setIsInvalid({ ...isInvalid, password: validatePassword(value) })
    }
    const handleConfirmPasswordChange = (value: string) => {
        setConfirmPassword(value)
        setIsInvalid({ ...isInvalid, confirmPassword: value !== password })
    }

    const isSignupDisabled = () => {
        return isInvalid.firstName || isInvalid.lastName || isInvalid.email || isInvalid.password || isInvalid.confirmPassword
    }


    return <div><div className="bg-gray-100 font-sans leading-normal tracking-normal h-screen flex items-center justify-center">
        <div className="bg-white shadow-lg rounded-lg p-8 max-w-lg w-full">
            <h1 className="text-2xl font-bold mb-6 text-center text-slate-800">Sign Up</h1>

            <form onSubmit={handleSubmit}>
                <div className="flex flex-col lg:flex-row lg:gap-2 ">
                    <div className="mb-4 lg:my-4 w-full">
                        <Input
                            required={true}

                            value={firstName}
                            type="text"
                            label="First Name"
                            variant="bordered"
                            isInvalid={isInvalid.firstName}
                            className="text-slate-800"
                            errorMessage="Please enter a valid first name (letters only)"
                            onValueChange={handleFirstNameChange}

                        />
                    </div>
                    <div className="mb-4 lg:my-4  w-full">
                        <Input
                            required={true}

                            value={lastName}
                            type="text"
                            label="Last Name"
                            variant="bordered"
                            isInvalid={isInvalid.lastName}
                            onValueChange={handleLastNameChange}
                            errorMessage="Please enter a valid last name (letters only)"
                            className="text-slate-800"
                        /> </div> </div>

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
                        isInvalid={isInvalid.password}
                        errorMessage="Password must be at least 6 characters"
                        onValueChange={handlePasswordChange}
                    /> </div>
                <div className="mb-4">
                    <Input
                        required={true}
                        value={confirmPassword}
                        type="password"
                        label="Confirm Password"
                        variant="bordered"
                        isInvalid={isInvalid.confirmPassword}
                        errorMessage='Passwords do not match'
                        onValueChange={handleConfirmPasswordChange}
                        className="text-slate-800"
                    /> </div>

                <div className="mb-6">
                    <RadioGroup
                        classNames={{ label: cn('text-slate-800') }}
                        value={type}
                        onValueChange={setType}
                        color="primary"
                        label="I'm a"
                        orientation="horizontal"
                    >
                        <Radio classNames={{ label: cn('text-slate-800') }} value="buyer">Buyer</Radio>
                        <Radio classNames={{ label: cn('text-slate-800') }} value="seller">Seller</Radio>

                    </RadioGroup>
                </div>
                <Button isLoading={isButtonLoading} isDisabled={isSignupDisabled()} color="primary" className="cursor-pointer w-full p-2 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 ease-in-out" type="submit" >Sign Up</Button>
            </form>
            <p className="mt-6 text-center text-slate-800">Already have an account? <Link href="/auth/signin" className="text-blue-500 hover:underline">Sign In</Link></p>

        </div>
    </div></div>;
}