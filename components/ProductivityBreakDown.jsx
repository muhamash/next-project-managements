import { motion } from "framer-motion";
import Download from "./Download";

function ProductivityBreakdown({ taskCompletion, pendingTasks, inprogress, user }) {
    return (
        <motion.div
            className="bg-slate-700 p-6 rounded-xl shadow-sm"
            whileHover={ { scale: 1.01 } }
        >
            <div className="flex justify-between w-full items-center my-2">
                <h3 className="text-lg font-semibold text-white mb-4">
                    Productivity Breakdowns!!
                </h3>
                <Download user={ user } />
            </div>
            <div className="space-y-4">
                <div className="flex items-center justify-between">
                    <span className="text-sm text-slate-200">Task Completion</span>
                    <span className="text-sm font-medium text-sky-600">{ taskCompletion }%</span>
                </div>
                <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                    <motion.div
                        initial={ { width: 0 } }
                        animate={ { width: `${taskCompletion}%` } }
                        transition={ { duration: 1 } }
                        className="h-full bg-sky-600 rounded-full"
                    />
                </div>

                <div className="flex items-center justify-between mt-4">
                    <span className="text-sm text-slate-200">Pending Tasks!!</span>
                    <span className="text-sm font-medium text-green-600">{ pendingTasks }%</span>
                </div>
                <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                    <motion.div
                        initial={ { width: 0 } }
                        animate={ { width: `${pendingTasks}%` } }
                        transition={ { duration: 1 } }
                        className="h-full bg-green-600 rounded-full"
                    />
                </div>
                <div className="flex items-center justify-between mt-4">
                    <span className="text-sm text-slate-200">In Progression Tasks!!</span>
                    <span className="text-sm font-medium text-violet-500">{ inprogress }%</span>
                </div>
                <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                    <motion.div
                        initial={ { width: 0 } }
                        animate={ { width: `${inprogress}%` } }
                        transition={ { duration: 1 } }
                        className="h-full bg-violet-600 rounded-full"
                    />
                </div>
            </div>
        </motion.div>
    );
}

export default ProductivityBreakdown;