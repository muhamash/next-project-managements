"use server";

import validator from "validator";

export const registerUser = async ( prevState, formData ) =>
{
    const userData = {
        name: formData.get( "name" ),
        email: formData.get( "email" ),
        password: formData.get( "password" ),
        confirmPassword: formData.get( "confirmPassword" ),
    };

    // Sanitize input
    const sanitizedEmail = validator.normalizeEmail( userData.email );
    const sanitizedName = validator.escape( userData.name );

    // Client-side validation
    if ( !sanitizedName || !sanitizedEmail || !userData.password || !userData.confirmPassword )
    {
        return { error: "All fields are required" };
    }

    if ( !validator.isEmail( sanitizedEmail ) )
    {
        return { error: "Invalid email format" };
    }

    if ( userData.password.length < 6 )
    {
        return { error: "Password must be at least 6 characters long" };
    }

    if ( userData.password !== userData.confirmPassword )
    {
        return { error: "Passwords do not match" };
    }

    try
    {
        const res = await fetch( `${process.env.NEXT_PUBLIC_BASE_URL}/api/auth/signup`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify( {
                name: sanitizedName,
                email: sanitizedEmail,
                password: userData.password,
            } ),
        } );

        const data = await res.json();

        if ( !res.ok )
        {
            return { error: data.message || "Registration failed" };
        }

        return { success: true, message: data.message };
    }
    catch ( error )
    {
        return { error: "An unexpected error occurred" };
    }
};