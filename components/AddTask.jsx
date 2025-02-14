/* eslint-disable react/prop-types */
'use client'

import { useState } from 'react';
import { Bounce, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

export default function AddTask({ onClose, task, categoryKey }) {
    const [ formData, setFormData ] = useState( task ? {
        title: task.title,
        description: task.description,
        date: task.date,
        category: categoryKey,
    } : {
        title: '',
        description: '',
        date: '',
        category: '',
    } );
    
    // console.log( "categoryKey in TaskCard:", categoryKey );
    
    const handleChange = ( e ) =>
    {
        const { name, value } = e.target;
        setFormData( ( prevData ) => ( {
            ...prevData,
            [ name ]: value,
        } ) );
    };

    const handleSubmit = ( e ) =>
    {
        e.preventDefault();
        const newTask = { ...formData };

        if ( task )
        {
            editTask(categoryKey || task.category, task.id, newTask);
        } else
        {
            addTask( formData.category || categoryKey, newTask );
        }

        toast( `${task ? `Task updated!!` : `New task added!!`}`, {
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

        onClose();
    };

    return (
        <div className="w-[500px] min-w-[310px] rounded-lg bg-gray-800 shadow-xl backdrop-blur-md">
            <div className="p-6">
                <h2 className="mb-6 text-2xl font-bold text-green-400">Create Task</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label
                            htmlFor="title"
                            className="mb-1 block text-sm font-medium text-gray-300"
                        >
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
                        <label
                            htmlFor="description"
                            className="mb-1 block text-sm font-medium text-gray-300"
                        >
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
                        <label
                            htmlFor="date"
                            className="mb-1 block text-sm font-medium text-gray-300"
                        >
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
                        <label
                            htmlFor="category"
                            className="mb-1 block text-sm font-medium text-gray-300"
                        >
                            Category
                        </label>
                        <select
                            required
                            id="category"
                            name="category"
                            value={ formData.category }
                            onChange={ handleChange }
                            className="w-full rounded-md border border-gray-600 bg-gray-700 px-3 py-2 text-white shadow-sm focus:border-green-500 focus:outline-none focus:ring-2 focus:ring-green-500"
                        >
                            <option value="">Select a category</option>
                            <option value="toDo">To-Do</option>
                            <option value="onProgress">On Progress</option>
                            <option value="done">Done</option>
                            <option value="revise">Revise</option>
                        </select>
                    </div>

                    <div className="flex justify-end space-x-3">
                        <button
                            onClick={onClose}
                            type="button"
                            className="rounded-md border border-gray-600 px-4 py-2 text-sm font-medium text-gray-300 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 focus:ring-offset-gray-800"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="rounded-md border border-transparent bg-green-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 focus:ring-offset-gray-800"
                        >
                            {task ? "Update" : "Create Task"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}