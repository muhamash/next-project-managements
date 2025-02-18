"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import { loginAction } from "../utils/actions/login";
import SubmitButton from "./SubmitButton";

export default function LoginForm() {
    const [state, formAction] = React.useActionState(loginAction, { error: null, success: false });
    const router = useRouter();

    useEffect(() => {
        if (state?.success) {
            window.location.href = "/";
        }
    }, [state?.success]);

    return (
        <form action={formAction} className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md text-violet-600">
            <div className="mb-4">
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                <input type="email" id="email" name="email" required className="w-full px-3 py-2 border rounded-lg focus:ring focus:ring-blue-300" placeholder="Email" />
            </div>

            <div className="mb-4">
                <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
                <input type="password" id="password" name="password" required className="w-full px-3 py-2 border rounded-lg focus:ring focus:ring-blue-300" placeholder="Password" />
            </div>

            <SubmitButton/>

            <div className="text-center mt-4">
                <Link href="/registration" className="text-blue-500 hover:underline">Don't have an account? Register</Link>
            </div>

            {state?.error && (
                <p className="py-3 my-3 rounded-md shadow-md shadow-black font-mono text-slate-100 text-sm text-center bg-rose-500">
                    {state?.error}
                </p>
            )}
        </form>
    );
}