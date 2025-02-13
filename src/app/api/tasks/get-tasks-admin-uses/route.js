import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";
import validator from "validator";

const prisma = new PrismaClient();

export async function GET(request) {
  try {
    const url = new URL(request.url);

    // Extract query parameters
    const status = url.searchParams.get("status");
    const email = url.searchParams.get("email");

    // Validate inputs (if provided)
    if (status && !validator.isAlpha(status.replace(/_/g, ""))) {
      return NextResponse.json(
        { success: false, message: "Invalid status" },
        { status: 400 }
      );
    }

    if (email && !validator.isEmail(email)) {
      return NextResponse.json(
        { success: false, message: "Invalid email" },
        { status: 400 }
      );
    }

    // Fetch tasks based on filters
    const tasks = await prisma.task.findMany({
      where: {
        ...(status && { status }), // Filter by status if provided
        ...(email && {
          user: {
            email, // Filter by user email if provided
          },
        } ),
         deletedAt: null,
      },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
      },
    });

    return NextResponse.json({ success: true, tasks }, { status: 200 });
  } catch (error) {
    console.error("Error fetching tasks:", error);
    return NextResponse.json(
      { success: false, message: "Internal Server Error" },
      { status: 500 }
    );
  }
}