"use client";

import { useRouter } from "next/navigation";

export default function HeaderButton() {
    const router = useRouter();

    const handleButton = () => {
        console.log("Button clicked");
        router.push('/tasks/addTask'); 
    };

    return (
        <button
            className="flex items-center rounded-md bg-orange-500 px-4 py-2 text-white"
            onClick={handleButton}
        >
            <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="mr-2"
            >
                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                <path d="M12 3c7.2 0 9 1.8 9 9s-1.8 9 -9 9s-9 -1.8 -9 -9s1.8 -9 9 -9z" />
                <path d="M15 12h-6" />
                <path d="M12 9v6" />
            </svg>
            Add Tasks
        </button>
    );
}