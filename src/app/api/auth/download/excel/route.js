import ExcelJS from 'exceljs';
import { NextResponse } from "next/server";
import { prisma } from '../../../../../../services/prisma';

// GET Route to fetch tasks based on userId and generate an Excel report
export async function GET(request) {
  try {
    // Get userId from the query parameters
    const url = new URL(request.url);
    const userId = parseInt(url.searchParams.get("userId"), 10);

    if (isNaN(userId)) {
      return NextResponse.json(
        { success: false, message: "Invalid userId" },
        { status: 400 }
      );
    }

    // Fetch tasks for the specified userId
    const tasks = await prisma.task.findMany({
      where: { userId },
      select: {
        id: true,
        title: true,
        description: true, 
        status: true,
      },
    } );
      
      console.log( tasks );

    if (tasks.length === 0) {
      return NextResponse.json(
        { success: false, message: "No tasks found for this user" },
        { status: 404 }
      );
    }

    // Create a new Excel workbook
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet('Tasks');

    // Define columns for the Excel sheet
    worksheet.columns = [
      { header: 'ID', key: 'id' },
      { header: 'Title', key: 'title' },
      { header: 'Description', key: 'description' },
      { header: 'Status', key: 'status' },
    ];

    // Add tasks data to the Excel sheet
    worksheet.addRows(tasks.map(task => ({
      id: task.id,
      title: task.title,
      description: task.description,
      status: task.status,
    })));

    // Generate Excel file buffer
    const buffer = await workbook.xlsx.writeBuffer();

    // Set headers for the Excel file download
    const headers = {
      "Content-Type": "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      "Content-Disposition": `attachment; filename=tasks_user_${userId}.xlsx`,
    };

    // Return the Excel file as the response
    return new NextResponse(buffer, { status: 200, headers });
  } catch (error) {
    console.error("Error fetching tasks:", error);
    return NextResponse.json(
      { success: false, message: "Internal Server Error" },
      { status: 500 }
    );
  }
}