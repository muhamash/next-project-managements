"use client";

/* eslint-disable react/prop-types */
// import React from 'react'
import React from "react";
import { useFormStatus } from "react-dom";
import 'react-toastify/dist/ReactToastify.css';
import { deleteTask } from "../utils/actions/tasks";

export default function DeleteIcon ({id, status, userId})
{
    const [state, formAction] = React.useActionState(deleteTask, { error: null, success: false });
    const { pending } = useFormStatus();
    // console.log( state );

    return (
        <form action={ formAction }>
            <input type="hidden" name="taskId" value={ id } />
            {/* <input type="hidden" name="userId" value={ userId } /> */}
            <button type="submit">
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
                    className="h-4 w-4 cursor-pointer text-zinc-300"
                >
                    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                    <path d="M4 7l16 0" />
                    <path d="M10 11l0 6" />
                    <path d="M14 11l0 6" />
                    <path
                        d="M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2 -2l1 -12"
                    />
                    <path d="M9 7v-3a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v3" />
                </svg>
            </button>
        </form>
    );
}