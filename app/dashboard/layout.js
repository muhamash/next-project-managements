import ClientLayout from "../../components/admin/ClientLayout";

export default async function DashboardLayout ( { states, tasks, users, settings } )
{
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-700 via-indigo-900 to-cyan-900 pt-[120px] px-3">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <ClientLayout
          states={states}
          tasks={tasks}
          users={users}
          settings={settings}
        />
      </div>
    </div>
  )
}
