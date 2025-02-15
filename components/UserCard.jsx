"use client"
import { motion } from 'framer-motion';

export default function UserCard({user}) {
    return (
        <motion.div
            className="bg-slate-700 p-6 rounded-xl shadow-sm"
            whileHover={ { scale: 1.01 } }
        >
            <div className="flex items-center gap-4 mb-6">
                <div>
                    <h3 className="text-xl font-semibold text-slate-800">{ user?.name }</h3>
                    <p className="text-white">{ user?.email }</p>
                    <span className="text-sm px-3 py-1 bg-blue-100 text-blue-600 rounded-full">
                        { user?.role }
                    </span>
                </div>
            </div>
            {/* <div className="space-y-2">
                            <p className="text-sm text-slate-100">
                                <span className="font-medium">Member since:</span> Jan 2024
                            </p>
                            <p className="text-sm text-slate-100">
                                <span className="font-medium">Last active:</span> 2 hours ago
                            </p>
                        </div> */}
        </motion.div>
    );
}
