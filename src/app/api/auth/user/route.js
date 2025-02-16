import { NextResponse } from "next/server";
import validator from "validator";
import { prisma } from "../../../../../services/prisma";


// POST Route to create a user
export async function POST(request) {
  try {
    const url = new URL(request.url);

    // Extract query parameters
    const name = url.searchParams.get("name");
    const email = url.searchParams.get("email");
    const password = url.searchParams.get("password");

    // Validate and sanitize inputs
    if (!name || !validator.isLength(name, { min: 1, max: 100 })) {
      return NextResponse.json(
        { success: false, message: "Name must be between 1 and 100 characters" },
        { status: 400 }
      );
    }

    if (!email || !validator.isEmail(email)) {
      return NextResponse.json(
        { success: false, message: "Invalid email" },
        { status: 400 }
      );
    }

    if (!password || !validator.isLength(password, { min: 6 })) {
      return NextResponse.json(
        { success: false, message: "Password must be at least 6 characters" },
        { status: 400 }
      );
    }

    // Sanitize inputs
    const sanitizedName = validator.escape(name);
    const sanitizedEmail = validator.normalizeEmail(email);
    const sanitizedPassword = validator.trim(password);

    // Create a new user
    const newUser = await prisma.user.create({
      data: {
        name: sanitizedName,
        email: sanitizedEmail,
        password: sanitizedPassword, // Hash the password before saving in production
      },
    });

    return NextResponse.json({ success: true, user: newUser }, { status: 201 });
  } catch (error) {
    console.error("Error creating user:", error);
    return NextResponse.json(
      { success: false, message: "Internal Server Error" },
      { status: 500 }
    );
  }
}

// GET Route to fetch users
export async function GET(request) {
  try {
    const url = new URL(request.url);

    // Extract query parameters
    const id = url.searchParams.get("id");
    const email = url.searchParams.get("email");

    // Validate and sanitize inputs (if provided)
    if (id && !validator.isNumeric(id)) {
      return NextResponse.json(
        { success: false, message: "Invalid id" },
        { status: 400 }
      );
    }

    if (email && !validator.isEmail(email)) {
      return NextResponse.json(
        { success: false, message: "Invalid email" },
        { status: 400 }
      );
    }

    // Sanitize inputs
    const sanitizedId = id ? parseInt(validator.escape(id)) : undefined;
    const sanitizedEmail = email ? validator.normalizeEmail(email) : undefined;

    // Fetch users based on query parameters
    const users = await prisma.user.findMany({
      where: {
        ...(sanitizedId && { id: sanitizedId }),
        ...(sanitizedEmail && { email: sanitizedEmail }),
      },
      select: {
        id: true,
        name: true,
        email: true,
      },
    });

    return NextResponse.json({ success: true, users }, { status: 200 });
  } catch (error) {
    console.error("Error fetching users:", error);
    return NextResponse.json(
      { success: false, message: "Internal Server Error" },
      { status: 500 }
    );
  }
}