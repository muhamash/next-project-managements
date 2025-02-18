"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import { registerUser } from "../utils/actions/registration";
import SubmitButton from "./SubmitButton";

export default function RegisterForm() {
    const [state, formAction] = React.useActionState(registerUser, { error: null, success: false });

    const router = useRouter();

    // if ( state?.error )
    // {
    //     console.log( state.error );
    // }

    useEffect( () =>
    {
        if ( state?.success )
        {
            router.push( '/login' );
        }
    }, [ router, state?.success ] );

    return (
        <form action={formAction} className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md text-rose-600">
            <div className="mb-4">
                <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
                <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    className="w-full px-3 py-2 border rounded-lg focus:ring focus:ring-blue-300"
                    placeholder="Name"
                />
            </div>

            <div className="mb-4">
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    className="w-full px-3 py-2 border rounded-lg focus:ring focus:ring-blue-300"
                    placeholder="Email"
                />
            </div>

            <div className="mb-4">
                <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
                <input
                    type="password"
                    id="password"
                    name="password"
                    required
                    className="w-full px-3 py-2 border rounded-lg focus:ring focus:ring-blue-300"
                    placeholder="Password"
                />
            </div>

            <div className="mb-4">
                <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">Confirm Password</label>
                <input
                    type="password"
                    id="confirmPassword"
                    name="confirmPassword"
                    required
                    className="w-full px-3 py-2 border rounded-lg focus:ring focus:ring-blue-300"
                    placeholder="Confirm Password"
                />
            </div>

            <SubmitButton/>

            <div className="text-center mt-4">
                <Link href="/login" className="text-blue-500 hover:underline">Already have an account? Login</Link>
            </div>
            {
                state?.error && (
                    <p className="py-3 my-3 rounded-md shadow-md shadow-black font-mono text-slate-100 text-sm text-center bg-rose-500">{  state?.error }</p>
                )
            }
        </form>
    );
}