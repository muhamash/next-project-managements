import TaskCard from "../../../../components/TaskCard";
import { fetchTasks } from "../../../../utils/actions/tasks";

export default async function PendingPage ({searchParams})
{
  const getSearchParams = await searchParams;
  // console.log( getSearchParams.userId );
  const response = await fetchTasks( getSearchParams.userId, "pending" );
  // console.log( response );

  return (
    <div className="p-3 bg-rose-600 rounded-md shadow-sm shadow-red-200 mb-4 w-full px-2 sm:w-1/2 md:w-1/4 h-fit">
      <div>
        <h3 className="text-lg font-bold">You have pending tasks:  { response?.tasks?.length }</h3>
      </div>
      {
        response?.tasks?.length > 0 && response?.tasks?.map( task => (
          <TaskCard key={task?.id} task={task}/>
        ))
      }

      {
        response?.tasks?.length === 0 && (
          <p className="bg-black p-2 rounded-md text-center mt-5">No more tasks!!</p>
        )
      }
    </div>
  )
}
