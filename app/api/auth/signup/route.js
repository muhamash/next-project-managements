import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";
import validator from "validator";
import { prisma } from "../../../../services/prisma";

export async function POST(req) {
    try {
        const { name, email, password } = await req.json();

        // Validate and sanitize input
        if (!name || !email || !password) {
            return NextResponse.json({ error: "All fields are required" }, { status: 400 });
        }

        const sanitizedEmail = validator.normalizeEmail(email);
        const sanitizedName = validator.escape(name);

        if (!validator.isEmail(sanitizedEmail)) {
            return NextResponse.json({ error: "Invalid email format" }, { status: 400 });
        }

        // Check if user already exists
        const existingUser = await prisma.user.findUnique({ where: { email: sanitizedEmail } });
        if (existingUser) {
            return NextResponse.json({ error: "User already exists" }, { status: 400 });
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create user in database
        const user = await prisma.user.create({
            data: { name: sanitizedName, email: sanitizedEmail, password: hashedPassword },
        });

        return NextResponse.json({ success: true, message: "User registered successfully", userId: user.id }, { status: 201 });
    } catch (error) {
        console.error("Signup Error:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}