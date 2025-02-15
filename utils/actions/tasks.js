"use server"
import { revalidatePath } from 'next/cache';
import { auth } from '../../auth';

export async function createTask(prevState, formData) {
    const title = formData.get("title");
    const description = formData.get("description");
    const date = formData.get("date");
    const status = formData.get("category");
    const userId = formData.get("userId");

    if (!title || !description || !date || !status || !userId) {
        return { success: false, message: "All fields are required." };
    }
    console.log(title, userId, description, status, date);

    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/tasks`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ title, description, status, userId, date }),
        });

        const data = await response.json();
        console.log(data);

        revalidatePath( `/tasks?userId=${userId}` );
        // const freshTasks = await fetchTasks( userId, status );
        
        return { success: true, task: data?.task };
    } catch (error) {
        console.error("Error creating task:", error);
        return { success: false, message: "Error creating task" };
    }
}

export async function fetchTasks ( userId, status )
{
    // console.log( userId );
    try {
        const response = await fetch( `${process.env.NEXT_PUBLIC_BASE_URL}/api/tasks?userId=${userId}&status=${status}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
            cache: "no-store",
        } );

        const data = await response.json();
        // if (!response.ok) {
        //     throw new Error(data.message || "Failed to fetch tasks");
        // }

        return data;
    } catch (error) {
        console.error("Error fetching tasks:", error);
        return [];
    }
}

export async function deleteTask ( prevState, formData )
{
    const taskId = formData.get( "taskId" );
    // const userId = formData.get( "userId" );
    const session = await auth();

    console.log( session );
    try {
        const response = await fetch( `${process.env.NEXT_PUBLIC_BASE_URL}/api/tasks?taskId=${taskId}&userId=${session?.user?.id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
            },
            cache: "no-store",
        } );

        const data = await response.json();
        revalidatePath( `/tasks?userId=${session?.user?.id}` );
        // if (!response.ok) {
        //     throw new Error(data.message || "Failed to fetch tasks");
        // }

        console.log( data );
        if ( response?.ok )
        {
            return { success: true };
        }
    } catch (error) {
        console.error("Error DELETING task:", error);
        return [];
    }
}