import { NextResponse } from "next/server";
import validator from "validator"; // Importing validator for input validation
import { prisma } from "../../../../services/prisma"; // Adjust the import as needed

export const dynamic = "force-dynamic"; // to ensure the route always re-renders

export async function GET(request) {
  try {
    // Extract userId from the query parameters
    const url = new URL(request.url);
    const userId = url.searchParams.get("userId");

    // Validate userId: Ensure it is present and is a valid integer
    if (!userId || !validator.isInt(userId, { min: 1 })) {
      return NextResponse.json(
        { success: false, message: "Valid userId is required" },
        { status: 400 }
      );
    }

    const sanitizedUserId = parseInt(userId, 10); // Sanitize and convert to integer

    // Fetch user details
    const user = await prisma.user.findUnique({
      where: { id: sanitizedUserId },
      select: {
        id: true,
        name: true,
        email: true,
        createdAt: true,
        sessions: {
          orderBy: {
            createdAt: "desc",
          },
          take: 1,
          select: {
            createdAt: true,
          },
        },
      },
    });

    if (!user) {
      return NextResponse.json(
        { success: false, message: "User not found" },
        { status: 404 }
      );
    }

    const taskActivities = await prisma.taskActivity.findMany({
      where: { performedBy: user.id },
      select: {
        action: true,
        taskId: true,
        performedAt: true,
        task: {
          select: {
            title: true,
            status: true,
          },
        },
      },
    });

    // Count actions by type and gather task details for "status-changed" actions
    const activitySummary = taskActivities.reduce(
      (acc, activity) => {
        if (activity.action === "created") acc.created += 1;
        if (activity.action === "edited") acc.edited += 1;
        if (activity.action === "status-changed") {
          acc.statusChanged += 1;
          acc.statusChangedTasks.push({
            taskId: activity.taskId,
            taskTitle: activity.task.title,
            oldStatus: activity.task.status, // Previous status
            actionTime: activity.performedAt,
          });
        }
        if (activity.action === "deleted") acc.deleted += 1;
        return acc;
      },
      { created: 0, edited: 0, statusChanged: 0, deleted: 0, statusChangedTasks: [] }
    );

    // Last login time (from the latest session)
    const lastLogin = user.sessions.length > 0 ? user.sessions[0].createdAt : null;

    // Return the response with user details and activity summary
    return NextResponse.json(
      {
        success: true,
        userDetails: {
          id: user.id,
          name: user.name,
          email: validator.normalizeEmail(user.email),
          createdAt: user.createdAt,
          lastLogin: lastLogin,
        },
        taskActivitySummary: activitySummary,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error fetching user activity:", error);
    return NextResponse.json(
      { success: false, message: "Internal Server Error" },
      { status: 500 }
    );
  }
}