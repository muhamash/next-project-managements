import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";
import validator from "validator";

const prisma = new PrismaClient();

// GET Route to fetch tasks per users
export async function GET(request) {
  try {
    // Get the id and status from query parameters
    const url = new URL(request.url);
    const id = url.searchParams.get("userId");
    const status = url.searchParams.get("status");

    // Validate and sanitize inputs
    if (!id || !validator.isInt(id, { min: 1 })) {
      return NextResponse.json(
        { success: false, message: "Valid user ID is required" },
        { status: 400 }
      );
    }

    if (!status || !["pending", "in_progress", "completed"].includes(status)) {
      return NextResponse.json(
        { success: false, message: "Valid status is required" },
        { status: 400 }
      );
    }
    const userId = parseInt( id, 10 );

    // Fetch tasks for the given user and status
    const tasks = await prisma.task.findMany({
      where: {
        userId,
        status,
        deletedAt: null,
      },
      include: {
        user: {
          select: {
            id: true,
            name: true,
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

// POST Route to create a task
export async function POST(request) {
  try {
    const { title, description, status, userId, date } = await request.json();

    // Validate and sanitize inputs
    if (!title || !validator.isLength(title, { min: 1, max: 100 })) {
      return NextResponse.json(
        { success: false, message: "Title must be between 1 and 100 characters" },
        { status: 400 }
      );
    }

    if (!description || !validator.isLength(description, { min: 1, max: 500 })) {
      return NextResponse.json(
        { success: false, message: "Description must be between 1 and 500 characters" },
        { status: 400 }
      );
    }

    if (!status || !/^[a-zA-Z\s-]+$/.test(status)) {
      return NextResponse.json(
        { success: false, message: "Valid status is required" },
        { status: 400 }
      );
    }

    if (!userId || !validator.isNumeric(userId.toString())) {
      return NextResponse.json(
        { success: false, message: "Valid userId is required" },
        { status: 400 }
      );
    }

    // Sanitize inputs
    const sanitizedTitle = validator.escape(title);
    const sanitizedDescription = validator.escape(description);
    const sanitizedStatus = validator.escape(status);
    const sanitizedUserId = parseInt( validator.escape( userId.toString() ) );
    const createdAt = new Date(date).toISOString();

    // Create a new task and connect it to an existing user
    const newTask = await prisma.task.create({
      data: {
        title: sanitizedTitle,
        description: sanitizedDescription,
        status: sanitizedStatus,
        createdAt: createdAt,
        user: {
          connect: { id: sanitizedUserId },
        },
      },
    } );
    
    await prisma.taskActivity.create( {
      data: {
        taskId: newTask.id,
        action: "created",
        performedBy: sanitizedUserId, 
        performedAt: createdAt,
      },
    } );

    return NextResponse.json({ success: true, task: newTask }, { status: 201 });
  } catch (error) {
    console.error("Error creating task:", error);
    return NextResponse.json(
      { success: false, message: "Internal Server Error" },
      { status: 500 }
    );
  }
}

// DELETE Route to delete a task
export async function DELETE(request) {
  try {
    const url = new URL(request.url);
    const taskId = url.searchParams.get("taskId");

    // Validate taskId
    if (!taskId || !validator.isNumeric(taskId)) {
      return NextResponse.json(
        { success: false, message: "Valid taskId is required" },
        { status: 400 }
      );
    }

    // Soft delete the task
    const deletedTask = await prisma.task.update({
      where: {
        id: parseInt(taskId),
      },
      data: {
        deletedAt: new Date(),
      },
    });

    // Log the deletion activity
    await prisma.taskActivity.create({
      data: {
        taskId: deletedTask.id,
        action: "deleted",
        // performedBy: 1, 
      },
    });

    return NextResponse.json(
      { success: true, message: "Task soft deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error soft deleting task:", error);
    return NextResponse.json(
      { success: false, message: "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function PATCH(request) {
  try {
    const url = new URL(request.url);
    const taskId = url.searchParams.get("taskId");

    // Validate taskId
    if (!taskId || !validator.isNumeric(taskId)) {
      return NextResponse.json(
        { success: false, message: "Valid taskId is required" },
        { status: 400 }
      );
    }

    // Parse the request body
    const { title, description, status } = await request.json();

    // Validate inputs (if provided)
    if (title && !validator.isLength(title, { min: 1, max: 100 })) {
      return NextResponse.json(
        { success: false, message: "Title must be between 1 and 100 characters" },
        { status: 400 }
      );
    }

    if (description && !validator.isLength(description, { min: 1, max: 500 })) {
      return NextResponse.json(
        { success: false, message: "Description must be between 1 and 500 characters" },
        { status: 400 }
      );
    }

    if (status && !validator.isAlpha(status.replace(/_/g, ""))) {
      return NextResponse.json(
        { success: false, message: "Invalid status" },
        { status: 400 }
      );
    }

    // Update the task
    const updatedTask = await prisma.task.update({
      where: {
        id: parseInt(taskId),
      },
      data: {
        ...(title && { title }), // Update title if provided
        ...(description && { description }), // Update description if provided
        ...(status && { status }), // Update status if provided
      },
    } );
    
    await prisma.taskActivity.create( {
      data: {
        taskId: updatedTask.id,
        action: "updated",
        details: JSON.stringify( updatedTask ), // Log the updated fields
        // performedBy: userId,
      },
    } );

    return NextResponse.json({ success: true, task: updatedTask }, { status: 200 });
  } catch (error) {
    console.error("Error updating task:", error);

    // Handle case where task is not found
    if (error.code === "P2025") {
      return NextResponse.json(
        { success: false, message: "Task not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { success: false, message: "Internal Server Error" },
      { status: 500 }
    );
  }
}