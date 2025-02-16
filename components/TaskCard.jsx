'use client';

 /* eslint-disable react/prop-types */
import DeleteIcon from './DeleteIcon';
import EditBitton from './EditBitton';

export default function TaskCard ( { task, status, userId } )
{

    // console.log(task);

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
                    { task?.title || "default title" }
                </h4>
                <div className="flex gap-2 items-center justify-center w-fit h-fit">
                    {/* delete */ }
                    <DeleteIcon id={ task?.id } status={ task?.status } />
                    {/* edit */ }
                    <EditBitton task={ task } />
                </div>
            </div>
            <p className="mb-2 text-sm text-zinc-200">
                { task?.description || "default text" }
            </p>

            <p className="mt-6 text-xs text-zinc-400">
                { new Date( task.updatedAt ).toLocaleDateString( 'en-GB', { day: 'numeric', month: 'short', year: 'numeric' } ) }
            </p>
        </div>
    );
}