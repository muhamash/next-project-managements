"use client";

import Link from "next/link";
import React from "react";
import { useFormStatus } from "react-dom";
import { loginAction } from "../utils/actions/login";

export default function LoginForm() {
    const [state, formAction] = React.useActionState(loginAction, { error: null, success: false });
    const { pending } = useFormStatus();

    console.log( state );
    
    if ( state?.error )
    {
        alert( state.error );
    }

    return (
        <form action={formAction} className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
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

            <button 
                type="submit" 
                className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 disabled:opacity-50" 
                disabled={pending}
            >
                {pending ? "Logging in..." : "Login"}
            </button>

            <div className="text-center mt-4">
                <Link href="/registration" className="text-blue-500 hover:underline">Don't have an account? Register</Link>
            </div>
        </form>
    );
}