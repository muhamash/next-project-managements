import { parse } from 'json2csv';
import { NextResponse } from "next/server";
import { prisma } from '../../../../../services/prisma';

export async function GET(request) {
  try {
    const url = new URL(request.url);
    const userId = parseInt(url.searchParams.get("userId"), 10);

    if (isNaN(userId)) {
      return NextResponse.json(
        { success: false, message: "Invalid userId" },
        { status: 400 }
      );
    }

    const tasks = await prisma.task.findMany({
      where: { userId },
      select: {
        id: true,
        title: true,
        description: true,
        status: true,
      },
    });

    if (tasks.length === 0) {
      return NextResponse.json(
        { success: false, message: "No tasks found" },
        { status: 404 }
      );
    }

    // Convert to CSV
    const csv = parse(tasks);

    // Set CSV headers
    const headers = {
      "Content-Type": "text/csv",
      "Content-Disposition": `attachment; filename=tasks_user_${userId}.csv`,
    };

    return new NextResponse(csv, { status: 200, headers });
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json(
      { success: false, message: "Internal Server Error" },
      { status: 500 }
    );
  }
}