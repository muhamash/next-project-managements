"use server"
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { auth } from '../../auth';

export async function handleTask ( prevState, formData )
{
    const title = formData.get("title");
    const description = formData.get("description");
    const date = formData.get("date");
    const status = formData.get("category");
    const userId = formData.get("userId");
    const taskId = formData.get("taskId");
    const edit = formData.get("edit") === "true"; 

    if (!title || !description || !date || !status || !userId) {
        return { success: false, message: "All fields are required." };
    }

    try {
        const session = await auth();
        const isEditing = edit && taskId;
        const url = isEditing
            ? `${process.env.NEXT_PUBLIC_BASE_URL}/api/tasks?taskId=${taskId}&userId=${session?.user?.id}`
            : `${process.env.NEXT_PUBLIC_BASE_URL}/api/tasks`;

        const response = await fetch(url, {
            method: isEditing ? "PATCH" : "POST",
            headers: {
                "Content-Type": "application/json",
            },
            cache: "no-store",
            body: JSON.stringify({ title, description, status, userId, date }),
        });

        // if (!response.ok) {
        //     throw new Error(`Failed to ${isEditing ? "update" : "create"} task`);
        // }

        const data = await response.json();
        console.log( data );
        
        revalidatePath(`${process.env.NEXT_PUBLIC_BASE_URL}/tasks?userId=${session?.user?.id}`);

        return { success: true, task: data?.task };
    } catch (error) {
        console.error(`Error ${edit ? "updating" : "creating"} task:`, error);
        return { success: false, message: `Error ${edit ? "updating" : "creating"} task` };
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

        // console.log( data );
        if ( response?.ok )
        {
            return { success: true };
        }
    } catch (error) {
        console.error("Error DELETING task:", error);
        return [];
    }
}