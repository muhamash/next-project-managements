import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import validator from "validator";

const prisma = new PrismaClient();
const SECRET_KEY = process.env.SECRET_KEY; 

export async function POST(request) {
  try {
    const { userId } = await request.json();

    // Validate input
    if (!userId || !validator.isNumeric(userId.toString())) {
      return NextResponse.json(
        { success: false, message: "Valid userId is required" },
        { status: 400 }
      );
    }

    // Generate a token
    const token = jwt.sign({ userId }, SECRET_KEY, { expiresIn: "7d" });

    // Store the token in the database
    const newToken = await prisma.token.create({
      data: {
        token,
        userId: parseInt(userId),
        expiresAt: new Date(Date.now() * 1000),
      },
    });

    return NextResponse.json({ success: true, token: newToken }, { status: 201 });
  } catch (error) {
    console.error("Error creating token:", error);
    return NextResponse.json(
      { success: false, message: "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function GET(request) {
  try {
    const url = new URL(request.url);
    const userId = url.searchParams.get("userId");

    // Validate input (if userId is provided)
    if (userId && !validator.isNumeric(userId)) {
      return NextResponse.json(
        { success: false, message: "Invalid userId" },
        { status: 400 }
      );
    }

    // Fetch tokens
    const tokens = await prisma.token.findMany({
      where: {
        ...(userId && { userId: parseInt(userId) }),
      },
      select: {
        id: true,
        token: true,
        userId: true,
        createdAt: true,
        expiresAt: true,
      },
    });

    return NextResponse.json({ success: true, tokens }, { status: 200 });
  } catch (error) {
    console.error("Error fetching tokens:", error);
    return NextResponse.json(
      { success: false, message: "Internal Server Error" },
      { status: 500 }
    );
  }
}