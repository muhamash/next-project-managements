"use client";

import { useRouter } from "next/navigation";

export default function EditButton({ task }) {
    const router = useRouter();

    const handleEditClick = () =>
    {
        // console.log( task );
        router.push(`${process.env.NEXT_PUBLIC_BASE_URL}/tasks/addTask?userId=${task?.userId}&&taskId=${task?.id}&title=${task?.title}&description=${task.description}&date=${task?.updatedAt}&status=${task?.status}&edit=true`);
    };

    return (
        <button onClick={handleEditClick} aria-label="Edit Task">
            <svg
                className="h-4 w-4 cursor-pointer text-zinc-300"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
            >
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                ></path>
            </svg>
        </button>
    );
}
