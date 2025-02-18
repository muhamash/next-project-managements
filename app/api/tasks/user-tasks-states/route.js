import { NextResponse } from "next/server";
import validator from "validator";
import { prisma } from "../../../../services/prisma";
import { calculatePercentage } from "../../../../utils/helper";

export const dynamic = 'force-dynamic';

// GET Route to fetch task percentage per user
export async function GET(request) {
    try {
        const url = new URL(request.url);
        const id = url.searchParams.get("userId");

        if (!id || !validator.isInt(id, { min: 1 })) {
            return NextResponse.json(
                { success: false, message: "Valid user ID is required" },
                { status: 400 }
            );
        }

        const userId = parseInt(id, 10);

        // Fetch all tasks for the user
        const tasks = await prisma.task.findMany({
            where: { userId: userId, deletedAt: null },
            select: { status: true },
        });

        // If no tasks exist
        if (tasks.length === 0) {
            return NextResponse.json({ message: "No tasks found for this user" }, { status: 404 });
        }

        // Count tasks by their status
        const statusCount = tasks.reduce(
            (acc, task) => {
                if (task.status === "completed") acc.completed += 1;
                if (task.status === "in-progress") acc.inProgress += 1;
                if (task.status === "pending") acc.pending += 1;
                return acc;
            },
            { completed: 0, inProgress: 0, pending: 0 }
        );

        // Calculate percentages
        const totalTasks = tasks.length;
        const percentages = calculatePercentage(statusCount, totalTasks);

        return NextResponse.json(
            {
                percentages,
                totalTasks,
                totalCompleted: statusCount.completed,
                totalPending: statusCount.pending,
                totalInProgress: statusCount.inProgress
            },
            { status: 200 }
        );
    } catch (error) {
        console.error("Error fetching task status:", error);
        return NextResponse.json({ success: false, message: "Internal Server Error" }, { status: 500 });
    }
}