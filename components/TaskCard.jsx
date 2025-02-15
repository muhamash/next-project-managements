'use client';

 /* eslint-disable react/prop-types */
import DeleteIcon from './DeleteIcon';


export default function TaskCard ( { task, status } )
{

    // console.log("status in TaskCard:", status);

    const colorFunction = ( id ) =>
    {
        switch ( id )
        {
            case "pending": return "text-indigo-600";
            case "in-progress": return "text-yellow-600";
            case "complete": return "text-teal-600";
            default: return "text-white";
        }
    };

    return (
        
        <div className="mb-4 rounded-lg bg-gray-800 p-4 mt-3">
            <div className="flex justify-between">
                <h4 className={ `mb-2 font-semibold ${colorFunction( status )}` }>
                    { task.title || "default title" }
                </h4>
                <div className="flex gap-2">
                    {/* delete */ }
                    <DeleteIcon id={ task.id } />
                    {/* edit */ }
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
                </div>
            </div>
            <p className="mb-2 text-sm text-zinc-200">
                { task.description || "default textdfg" }
            </p>

            <p className="mt-6 text-xs text-zinc-400">
                { new Date( task.updatedAt ).toLocaleDateString( 'en-GB', { day: 'numeric', month: 'short', year: 'numeric' } ) }
            </p>
        </div>
    
    );
}