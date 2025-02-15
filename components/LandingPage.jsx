'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { FaCalendarAlt, FaCheckCircle, FaTasks } from 'react-icons/fa'
import { SiProgress } from 'react-icons/si'

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.3
    }
  }
}

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { type: 'spring', stiffness: 100 }
  }
}

const statVariants = {
  hover: { scale: 1.05, y: -5 },
  tap: { scale: 0.95 }
}

export default function LandingPage({ user }) {
    const router = useRouter();
    const overallStats = [
        { icon: <FaTasks className="w-6 h-6" />, label: 'Total Tasks', value: '24' },
        { icon: <FaCheckCircle className="w-6 h-6" />, label: 'Completed', value: '15' },
        { icon: <SiProgress className="w-6 h-6" />, label: 'In Progress', value: '6' },
        { icon: <FaCalendarAlt className="w-6 h-6" />, label: 'Pending', value: '3' }
    ];

    const handleStart = () =>
    {
        router.push(`/tasks/addTask?userId=${user?.id}`); 
    };

    return (
        <motion.div
            initial="hidden"
            animate="visible"
            variants={ containerVariants }
            className="min-h-screen p-8 bg-gradient-to-br from-grey-500 to-blue-50"
        >
            {
                !user ? (
                    <motion.div
                        variants={ itemVariants }
                        className="text-center py-20"
                    >
                        <motion.h1
                            className="text-4xl font-bold text-slate-50 mb-4"
                            initial={ { opacity: 0, y: 20 } }
                            animate={ { opacity: 1, y: 0 } }
                            transition={ { delay: 0.2 } }
                        >
                            Welcome to Task Manager! 🎉
                        </motion.h1>
                        <motion.p
                            className="text-lg text-slate-600 mb-8"
                            initial={ { opacity: 0, y: 20 } }
                            animate={ { opacity: 1, y: 0 } }
                            transition={ { delay: 0.4 } }
                        >
                            Please login to access your tasks and productivity dashboard
                        </motion.p>
                        <motion.div
                            initial={ { opacity: 0, y: 20 } }
                            animate={ { opacity: 1, y: 0 } }
                            transition={ { delay: 0.6 } }
                        >
                            <Link
                                href="/login"
                                className="inline-block bg-rose-600 text-white px-8 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors"
                            >
                                Login Now
                            </Link>
                        </motion.div>
                    </motion.div>
                ) : (
                    <div className="max-w-6xl mx-auto">
                        {/* Header Section */ }
                        <motion.div variants={ itemVariants } className="mb-12 text-center">
                            <motion.h1
                                className="text-4xl font-bold text-slate-800 mb-4"
                                initial={ { opacity: 0, y: 20 } }
                                animate={ { opacity: 1, y: 0 } }
                                transition={ { delay: 0.2 } }
                            >
                                Welcome Back, { user?.name } 👋
                            </motion.h1>
                            <motion.p
                                className="text-lg text-slate-600"
                                initial={ { opacity: 0, y: 20 } }
                                animate={ { opacity: 1, y: 0 } }
                                transition={ { delay: 0.4 } }
                            >
                                Here's your productivity overview
                            </motion.p>
                        </motion.div>

                        {/* Stats Grid */ }
                        <motion.div
                            variants={ containerVariants }
                            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12"
                        >
                            { overallStats.map( ( stat, index ) => (
                                <motion.div
                                    key={ index }
                                    variants={ itemVariants }
                                    whileHover="hover"
                                    whileTap="tap"
                                    className="bg-cyan-800 p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow"
                                >
                                    <div className="flex items-center gap-4">
                                        <motion.div className="p-3 bg-blue-100 rounded-lg text-blue-600">
                                            { stat.icon }
                                        </motion.div>
                                        <div>
                                            <p className="text-2xl font-bold text-slate-300">{ stat?.value }</p>
                                            <p className="text-sm text-black font-bold">{ stat.label }</p>
                                        </div>
                                    </div>
                                </motion.div>
                            ) ) }
                        </motion.div>

                        {/* User Details & Progress */ }
                        <motion.div
                            variants={ itemVariants }
                            className="grid grid-cols-1 lg:grid-cols-2 gap-8"
                        >
                            {/* User Card */ }
                            <motion.div
                                className="bg-slate-700 p-6 rounded-xl shadow-sm"
                                whileHover={ { scale: 1.01 } }
                            >
                                <div className="flex items-center gap-4 mb-6">
                                    {/* <Avatar className="w-16 h-16">
                                <AvatarImage src={ user?.image } />
                                <AvatarFallback>{ user?.name?.[ 0 ] }</AvatarFallback>
                            </Avatar> */}
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

                            {/* Progress Visualization */ }
                            <motion.div
                                className="bg-slate-700 p-6 rounded-xl shadow-sm"
                                whileHover={ { scale: 1.01 } }
                            >
                                <h3 className="text-lg font-semibold text-white mb-4">
                                    Productivity Breakdown
                                </h3>
                                <div className="space-y-4">
                                    <div className="flex items-center justify-between">
                                        <span className="text-sm text-slate-200">Task Completion</span>
                                        <span className="text-sm font-medium text-sky-600">62%</span>
                                    </div>
                                    <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                                        <motion.div
                                            initial={ { width: 0 } }
                                            animate={ { width: '62%' } }
                                            transition={ { duration: 1 } }
                                            className="h-full bg-sky-600 rounded-full"
                                        />
                                    </div>
              
                                    <div className="flex items-center justify-between mt-4">
                                        <span className="text-sm text-slate-200">On-time Delivery</span>
                                        <span className="text-sm font-medium text-green-600">85%</span>
                                    </div>
                                    <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                                        <motion.div
                                            initial={ { width: 0 } }
                                            animate={ { width: '85%' } }
                                            transition={ { duration: 1 } }
                                            className="h-full bg-green-600 rounded-full"
                                        />
                                    </div>
                                </div>
                            </motion.div>
                        </motion.div>

                        {/* CTA Section */ }
                        <motion.div
                            variants={ itemVariants }
                            className="mt-12 text-center"
                        >
                            <motion.button
                                onClick={ handleStart }
                                whileHover={ { scale: 1.05 } }
                                whileTap={ { scale: 0.95 } }
                                className="bg-blue-600 text-white px-8 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors"
                            >
                                Start New Task
                            </motion.button>
                        </motion.div>
                    </div>
                )
            }
            
        </motion.div>
    );
}