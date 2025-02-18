import { NextResponse } from "next/server";
import { prisma } from "../../../../services/prisma";

export async function PATCH(request) {
  try {
    const { taskIds, updates } = await request.json();

    // Validate inputs
    if (!taskIds || !Array.isArray(taskIds) || taskIds.length === 0) {
      return NextResponse.json(
        { success: false, message: "Valid taskIds array is required" },
        { status: 400 }
      );
    }

    if (!updates || typeof updates !== "object" || Object.keys(updates).length === 0) {
      return NextResponse.json(
        { success: false, message: "Valid updates object is required" },
        { status: 400 }
      );
    }

    // Update tasks in bulk
    const updatedTasks = await prisma.task.updateMany({
      where: {
        id: { in: taskIds },
      },
      data: updates,
    });

    return NextResponse.json(
      { success: true, message: "Tasks updated successfully", updatedTasks },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error updating tasks:", error);
    return NextResponse.json(
      { success: false, message: "Internal Server Error" },
      { status: 500 }
    );
  }
}