"use client";

/* eslint-disable react/prop-types */
// import React from 'react'
import { Bounce, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

export default function DeleteIcon ({id})
{
    // const { deleteTask } = useTask();
    return (
        <svg
            onClick={ () =>
            {
                // deleteTask( statusKey, id );
                toast( `Task deleted!!`, {
                    position: "top-right",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                    transition: Bounce,
                } );

            } }
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
    );
}