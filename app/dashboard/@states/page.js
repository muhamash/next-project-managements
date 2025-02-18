
export default function StatesPage() {
  return (
    <div className="md:col-span-3 space-y-6">
      {/* Header */ }
      <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-6 shadow-xl">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold text-white">Welcome Back, Admin</h1>
          <div className="flex items-center space-x-4">
            <div className="w-10 h-10 bg-gradient-to-r from-pink-500 to-purple-500 rounded-full" />
          </div>
        </div>
      </div>

      {/* Stats Cards */ }
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        { [
          { title: 'Total Users', value: '2.8k', color: 'from-blue-500 to-cyan-500' },
          { title: 'Revenue', value: '$24k', color: 'from-green-500 to-emerald-500' },
          { title: 'Active Sessions', value: '1.2k', color: 'from-purple-500 to-fuchsia-500' },
          { title: 'Pending Tasks', value: '15', color: 'from-orange-500 to-amber-500' },
        ].map( ( stat, index ) => (
          <div key={ index } className={ `bg-gradient-to-br ${stat.color} rounded-2xl p-6 backdrop-blur-sm` }>
            <div className="text-white">
              <p className="text-sm opacity-80">{ stat.title }</p>
              <p className="text-3xl font-bold mt-2">{ stat.value }</p>
              <div className="w-12 h-12 bg-white/20 rounded-lg mt-4 flex items-center justify-center">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={ 2 } d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                </svg>
              </div>
            </div>
          </div>
        ) ) }
      </div>

      {/* Recent Activity */ }
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 shadow-xl">
          <h3 className="text-white text-lg font-semibold mb-4">Recent Activity</h3>
          <div className="space-y-4">
            { [ 1, 2, 3 ].map( ( item ) => (
              <div key={ item } className="flex items-center p-3 bg-white/5 rounded-xl">
                <div className="w-8 h-8 bg-blue-500/20 rounded-full flex items-center justify-center mr-3">
                  <svg className="w-4 h-4 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={ 2 } d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div>
                  <p className="text-white/90 text-sm">New user registration</p>
                  <p className="text-white/50 text-xs">2 hours ago</p>
                </div>
              </div>
            ) ) }
          </div>
        </div>

        {/* Quick Stats */ }
        <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 shadow-xl">
          <h3 className="text-white text-lg font-semibold mb-4">System Health</h3>
          <div className="bg-white/5 rounded-xl p-4">
            <div className="h-48 flex items-center justify-center text-white/50">
              Chart/Graph Placeholder
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
