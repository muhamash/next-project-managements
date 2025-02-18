"use client";

export const Sidebar = ( { activePage, setActivePage } ) =>
{
    return (
        <div className="md:col-span-1 bg-white/10 backdrop-blur-lg rounded-3xl p-6 shadow-xl h-screen">
            <div className="flex flex-col items-center mb-8">
                <div className="w-20 h-20 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full mb-4" />
                <h2 className="text-white text-xl font-bold">Admin Dashboard</h2>
                <p className="text-white/70 text-sm">administrator@example.com</p>
            </div>

            <nav className="space-y-2">
                { [ "states", "tasks", "users", "settings" ].map( ( item ) => (
                    <button
                        key={ item }
                        onClick={ () => setActivePage( item ) }
                        className={ `flex items-center p-3 w-full text-left rounded-xl transition-all duration-300 ${activePage === item
                                ? "bg-green-600 text-white shadow-lg"
                                : "text-white/80 hover:bg-white/5"
                            }` }
                    >
                        <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={ 2 }
                                d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                            />
                        </svg>
                        { item.charAt( 0 ).toUpperCase() + item.slice( 1 ) }
                    </button>
                ) ) }
            </nav>
        </div>
    );
};