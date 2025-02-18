/* eslint-disable react/prop-types */
'use client'

import { useRouter, useSearchParams } from "next/navigation";
import React, { useState } from "react";
import { Bounce, toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { handleTask } from "../utils/actions/tasks";

export default function AddTask() {
    const router = useRouter();
    const getSearchParams = useSearchParams();

    const userId = getSearchParams?.get( "userId" );
    const  title = getSearchParams?.get("title")
    const description = getSearchParams?.get("description")
    const date = getSearchParams?.get("date")
    const status = getSearchParams?.get("status")
    const edit = getSearchParams?.get( "edit" );
    const taskId = getSearchParams?.get( "taskId" );
            
    const formattedDate = date ? new Date(date).toISOString().split("T")[0] : "";
    const [formData, setFormData] = useState( edit  ? {
        title: title,
        description: description,
        date: formattedDate,
        category: status || '', 
    } : {
        title: '',
        description: '',
        date: '',
        category: '',
    } );
    
    const [ state, formAction ] = React.useActionState( handleTask , { error: null, success: false } );
    // console.log( task );
    

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = async ( e ) =>
    {
        const formDataToSubmit = new FormData();

        // console.log( userId );
        
        formDataToSubmit.append( "title", formData.title );
        formDataToSubmit.append( "description", formData.description );
        formDataToSubmit.append( "date", formData.date );
        formDataToSubmit.append( "category", formData.category );
        formDataToSubmit.append( "userId", userId );
        formDataToSubmit.append( "edit", edit );
        formDataToSubmit.append( "taskId",  taskId);

        try {
            await formAction( formDataToSubmit );
            // router.back();
        }
        catch ( error )
        {
        console.error(error?.message ?? error);
        }
        finally
        {
            setTimeout( () =>
            {
                // router.replace( `${process.env.NEXT_PUBLIC_BASE_URL}/tasks?userId=${userId}` );
                window.location.href = `${process.env.NEXT_PUBLIC_BASE_URL}/tasks?userId=${userId}`;
                
            }, 1000 );
            // router.refresh();
        }

        if ( !state.error )
        {
            toast( `${edit ? "Task updated!" : "New task added!"}`, {
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
        }
    };

    return (
        <div className="w-[500px] min-w-[310px] rounded-lg bg-gray-800 shadow-xl backdrop-blur-md">
            <div className="p-6">
                <h2 className="mb-6 text-2xl font-bold text-green-400">
                    {edit ? "Update Task" : "Create Task"}
                </h2>
                <form action={handleSubmit}>
                    {/* <input type="hidden" name="userId" value={ userId } /> */}
                    {/* <input type="edit" name="edit" value={ edit } /> */}
                    {/* <input type="hidden" name="taskId" value={taskId} /> */ }
                    <ToastContainer />
                    <div className="mb-4">
                        <label htmlFor="title" className="mb-1 block text-sm font-medium text-gray-300">
                            Task Name
                        </label>
                        <input
                            type="text"
                            id="title"
                            name="title"
                            required
                            value={formData.title}
                            onChange={handleChange}
                            className="w-full rounded-md border border-gray-600 bg-gray-700 px-3 py-2 text-white placeholder-gray-400 shadow-sm focus:border-green-500 focus:outline-none focus:ring-2 focus:ring-green-500"
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="description" className="mb-1 block text-sm font-medium text-gray-300">
                            Description
                        </label>
                        <textarea
                            required
                            id="description"
                            name="description"
                            rows="3"
                            value={formData.description}
                            onChange={handleChange}
                            className="w-full rounded-md border border-gray-600 bg-gray-700 px-3 py-2 text-white placeholder-gray-400 shadow-sm focus:border-green-500 focus:outline-none focus:ring-2 focus:ring-green-500"
                        ></textarea>
                    </div>
                    <div className="mb-4">
                        <label htmlFor="date" className="mb-1 block text-sm font-medium text-gray-300">
                            Date
                        </label>
                        <input
                            required
                            type="date"
                            id="date"
                            name="date"
                            value={formData.date}
                            onChange={handleChange}
                            className="w-full rounded-md border border-gray-600 bg-gray-700 px-3 py-2 text-white shadow-sm focus:border-green-500 focus:outline-none focus:ring-2 focus:ring-green-500"
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="category" className="mb-1 block text-sm font-medium text-gray-300">
                            Category
                        </label>
                        <select
                            required
                            id="category"
                            name="category"
                            value={formData.category}
                            onChange={handleChange}
                            className="w-full rounded-md border border-gray-600 bg-gray-700 px-3 py-2 text-white shadow-sm focus:border-green-500 focus:outline-none focus:ring-2 focus:ring-green-500"
                        >
                            <option value="">Select a category</option>
                            <option value="pending">Pending</option>
                            <option value="in-progress">In Progress</option>
                            <option value="completed">Complete</option>
                        </select>
                    </div>
                    <div className="flex justify-end space-x-3">
                        <button
                            type="button"
                            onClick={() => router.back()}
                            className="rounded-md border border-gray-600 px-4 py-2 text-sm font-medium text-gray-300 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 focus:ring-offset-gray-800"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="rounded-md border border-transparent bg-green-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 focus:ring-offset-gray-800"
                        >
                            {edit ? "Update" : "Create Task"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}