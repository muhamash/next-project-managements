'use client'

import { useState } from "react";
import { handleDownloadTasksCsv, handleDownloadTasksExcel } from "../utils/helper"; // Make sure this function is implemented

export default function Download({ user }) {
    console.log(user);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    // Handle CSV download
    const handleCsv = async () => {
        if (user?.id) {
            await handleDownloadTasksCsv(user.id);
        }
    };

    const handleExcel = async () => {
        if (user?.id) {
            console.log("Excel download for user:", user.id);
            await handleDownloadTasksExcel( user.id );
        }
    };

    return (
        <div className="mt-6 relative">
            <button
                className="text-white text-sm bg-green-600 p-2 rounded-md"
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            >
                Download Report
            </button>
            {isDropdownOpen && (
                <div className="absolute right-0 mt-2 bg-white text-black shadow-lg rounded-md w-48">
                    <button
                        onClick={handleCsv}
                        className="block px-4 py-2 text-sm hover:bg-gray-200"
                    >
                        Download as CSV
                    </button>
                    <button
                        onClick={handleExcel}
                        className="block px-4 py-2 text-sm hover:bg-gray-200"
                    >
                        Download as Excel
                    </button>
                </div>
            )}
        </div>
    );
}