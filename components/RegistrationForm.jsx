"use client";

import Link from "next/link";
import React from "react";
import { useFormStatus } from "react-dom";
import { loginAction } from "../utils/actions/login";

export default function RegisterForm() {
    const [state, formAction] = React.useActionState(loginAction, { error: null, success: false });
    const { pending } = useFormStatus();

    if ( state?.error )
    {
        alert( state.error );
    }

    return (
        <form action={formAction} className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
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

            <button 
                type="submit" 
                className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 disabled:opacity-50" 
                disabled={pending}
            >
                {pending ? "Registering..." : "Register"}
            </button>

            <div className="text-center mt-4">
                <Link href="/login" className="text-blue-500 hover:underline">Already have an account? Login</Link>
            </div>
        </form>
    );
}