"use server";

export async function getUserInfo (userId)
{
    try {
        const response = await fetch( `${process.env.NEXT_PUBLIC_BASE_URL}/api/auth/user-details?userId=${userId}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
            cache: "no-store",
        } );

        // console.log( response );
        const data = await response.json();
        // if (!response.ok) {
        //     throw new Error(data.message || "Failed to fetch tasks");
        // }

        return data;
    } catch (error) {
        console.error("Error fetching user info:", error);
        return [];
    }
}