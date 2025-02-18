"use client"

import { motion } from 'framer-motion';
import { use } from 'react';
import LastActive from './LastLogin';

export default function UserCard ( { user, getUser } )
{
    // const [ info, setInfo ] = useState( "" );

    // useEffect( () =>
    // {
    //     const fetchData = async () =>
    //     {
    //         const data = await getUser;
    //         if ( data?.success )
    //         {
    //             setInfo( data );
    //         }
    //     };

    //     fetchData();
    // }, [ getUser ] );

    const info = use( getUser );
    
    console.log( info );

    return (
        <motion.div
            className="bg-slate-700 p-6 flex justify-between justify-center items-end flex-wrap rounded-xl shadow-sm"
            whileHover={ { scale: 1.01 } }
        >
            <div className='flex flex-col gap-3'>
                <div className="flex items-center gap-4 mb-6">
                    <div>
                        <h3 className="text-xl font-semibold text-green-500">{ user?.name }</h3>
                        <p className="text-white">{ user?.email }</p>
                        <p className="text-sm px-3 py-1 bg-blue-100 text-blue-600 rounded-full my-2 text-center">
                            { user?.role }
                        </p>
                    </div>
                </div>
                <div className="space-y-2">
                    <p className="text-sm text-slate-100">
                        <span className="font-medium">Member since: { new Date( info?.userDetails?.createdAt ).toLocaleDateString( 'en-GB', { day: 'numeric', month: 'short', year: 'numeric' } ) }</span>
                    </p>
                    <LastActive info={info}/>
                </div>
            </div>

            <motion.div
                className="bg-slate-600 p-6 rounded-xl shadow-md shadow-black/50"
                initial={ { opacity: 0 } }
                animate={ { opacity: 1 } }
                transition={ { duration: 1 } }
            >
                <h3 className="text-lg font-semibold text-white mb-4">Task Activity Summary</h3>
                <div className="space-y-4">
                    {/* Display created tasks count */ }
                    <motion.div
                        className="flex items-center justify-between"
                        whileHover={ { scale: 1.05 } }
                    >
                        <span className="text-sm text-slate-200">Created</span>
                        <span className="text-sm font-medium text-sky-600">{ info?.taskActivitySummary?.counts?.created }</span>
                    </motion.div>

                    {/* Display deleted tasks count */ }
                    <motion.div
                        className="flex items-center justify-between"
                        whileHover={ { scale: 1.05 } }
                    >
                        <span className="text-sm text-slate-200">Deleted</span>
                        <span className="text-sm font-medium text-red-600">{ info?.taskActivitySummary?.counts?.deleted }</span>
                    </motion.div>

                    {/* Display edited tasks count */ }
                    <motion.div
                        className="flex items-center justify-between"
                        whileHover={ { scale: 1.05 } }
                    >
                        <span className="text-sm text-slate-200">Edited</span>
                        <span className="text-sm font-medium text-yellow-600">{ info?.taskActivitySummary?.counts?.edited }</span>
                    </motion.div>

                    {/* Display status changed tasks */ }
                    {/* <motion.div
                        className="flex items-center justify-between"
                        whileHover={ { scale: 1.05 } }
                    >
                        <span className="text-sm text-slate-200">Status Changed</span>
                        <span className="text-sm font-medium text-orange-600">{ getUser?.statusChanged }</span>
                    </motion.div> */}

                    {/* Display the status changed tasks list */ }
                    <motion.div
                        className="flex items-center justify-between"
                        whileHover={ { scale: 1.05 } }
                    >
                        <span className="text-sm text-slate-200">Recent Activities</span>
                        <span className="text-sm font-medium text-green-600">
                            { info?.taskActivitySummary?.recentActivities?.length }
                        </span>
                    </motion.div>

                    <p className='text-[10px] font-mono text-orange-500'>Activity score</p>
                    <div className="h-2 bg-slate-100 rounded-full overflow-hidden mt-2">
                        <motion.div
                            initial={ { width: 0 } }
                            animate={ { width: `${( info?.taskActivitySummary?.counts?.created / ( info?.taskActivitySummary?.counts?.created + info?.taskActivitySummary?.counts?.deleted + info?.taskActivitySummary?.counts?.edited + info?.taskActivitySummary?.counts?.edited ) ) * 100}%` } }
                            transition={ { duration: 1 } }
                            className="h-full bg-sky-600 rounded-full"
                        />
                    </div>
                </div>
            </motion.div>
        </motion.div>
    );
}
