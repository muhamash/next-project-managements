"use server"


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

        return { success: true, task: data.task };
    } catch (error) {
        console.error("Error creating task:", error);
        return { success: false, message: "Error creating task" };
    }
}