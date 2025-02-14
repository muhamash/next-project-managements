'use client'

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';

export default function TopBar() {
    const [ isMenuOpen, setIsMenuOpen ] = useState( false );
    const pathName = usePathname();
    // console.log( pathName );

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    return (
        <header className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between bg-gray-800 p-4 shadow-md">
            <button onClick={ toggleMenu } className="lg:hidden">
                <svg
                    className="h-6 w-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M4 6h16M4 12h16M4 18h16"
                    ></path>
                </svg>
            </button>
            <div
                className={ `absolute top-0 left-0 h-screen w-full bg-gray-800 transform ${isMenuOpen ? 'translate-x-0' : '-translate-x-full'
                    } transition-transform duration-300 ease-in-out lg:hidden` }
            >
                <button
                    onClick={ toggleMenu }
                    className="p-4 text-cyan-600"
                >
                    Close
                </button>
            </div>

            {/* Search Box */ }
            {/* <SearchBox /> */ }

            {/* Icons */ }
            {/* <div className="flex items-center">
                <button className="relative mr-4">
                    <svg
                        className="h-6 w-6"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                        ></path>
                    </svg>
                    <span className="absolute right-0 top-0 h-2 w-2 rounded-full bg-red-500"></span>
                </button>
                <button className="relative mr-4">
                    <svg
                        className="h-6 w-6"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                        ></path>
                    </svg>
                    <span className="absolute right-0 top-0 h-2 w-2 rounded-full bg-red-500"></span>
                </button>
                
            </div> */}
            {/* auth */ }
            <div className='flex gap-3'>
                {
                    pathName !== '/' && (
                        <Link href="/" className='px-4 py-2 bg-violet-500 text-white rounded-md shadow-sm shadow-slate-500 hover:shadow transition-all duration-200 font-mono'>
                            Home
                        </Link>
                    )
                }

                {
                    pathName !== '/login' && (
                        <Link href="/login" className='px-4 py-2 bg-rose-500 text-white rounded-md shadow-sm shadow-slate-500 hover:shadow transition-all duration-200 font-mono'>
                            Login
                        </Link>
                    )
                }

                {
                    pathName !== '/registration' && (
                        <Link href="/registration" className='px-4 py-2 bg-cyan-500 text-white rounded-md shadow-sm shadow-slate-500 hover:shadow transition-all duration-200 font-mono'>
                            Registration
                        </Link>
                    )
                }
            </div>
        </header>
    );
};