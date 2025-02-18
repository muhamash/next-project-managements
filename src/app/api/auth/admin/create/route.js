import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";
import validator from "validator";
import { prisma } from "../../../../../../services/prisma";

export async function POST(request) {
    try {
        const body = await request.json();

        // Validate input
        if (!body.email || !validator.isEmail(body.email)) {
            return NextResponse.json({ message: "Invalid email format" }, { status: 400 });
        }

        if (!body.password || body.password.length < 6) {
            return NextResponse.json({ message: "Password must be at least 6 characters" }, { status: 400 });
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(body.password, 10);

        // Upsert Admin User (Create if not exists)
        const adminUser = await prisma.user.upsert({
            where: { email: body.email },
            update: {},
            create: {
                name: body.name || "Admin User",
                email: body.email,
                password: hashedPassword,
                role: "ADMIN",
            },
        });

        return NextResponse.json({ message: "Admin user created", adminUser }, { status: 201 });

    } catch (error) {
        console.error("Error inserting admin:", error);
        return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
    } finally {
        await prisma.$disconnect();
    }
}