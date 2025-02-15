import { NextResponse } from "next/server";
import validator from "validator";
import { prisma } from "../../../../../services/prisma";

export const dynamic = "force-dynamic";

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

    const sanitizedUserId = parseInt(userId, 10);

    // Fetch user details
    const user = await prisma.user.findUnique( {
      where: { id: sanitizedUserId },
      select: {
        id: true,
        name: true,
        email: true,
        createdAt: true || false,
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
    } );

    if (!user) {
      return NextResponse.json(
        { success: false, message: "User not found" },
        { status: 404 }
      );
    }

    const taskActivities = await prisma.taskActivity.findMany( {
      where: { performedBy: user.id },
      select: {
        action: true,
        taskId: true,
        performedAt: true,
        details: true,
        performedBy: true,
        task: {
            select: {
              title: true,
              status: true
            }
          }
      },
    } );

    // Count actions by type and gather task details for "status-changed" actions
    const activitySummary = {
      counts: {
        created: 0,
        edited: 0,
        statusChanged: 0,
        deleted: 0
      },
      recentActivities: []
    };

    taskActivities.forEach( activity =>
    {
      if ( activity?.action in activitySummary?.counts )
      {
        activitySummary.counts[ activity?.action ]++;
      }
  
      activitySummary.recentActivities.push( {
        action: activity?.action,
        taskTitle: activity?.task?.title,
        timestamp: activity?.performedAt,
        details: activity?.details
      } );
    } );

    // Last login time (from the latest session)
    const lastLogin = user.sessions.length > 0 ? user.sessions[0].createdAt : null;

    // Return the response with user details and activity summary
    return NextResponse.json(
      {
        success: true,
        userDetails: {
          id: user.id,
          name: user.name,
          email: validator.normalizeEmail(user?.email),
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