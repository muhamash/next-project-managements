import TaskCard from "../../../components/TaskCard";
import { fetchTasks } from "../../../utils/actions/tasks";

export default async function InProgressPage ({searchParams})
{
  const getSearchParams = await searchParams;
  const response = await fetchTasks( getSearchParams.userId, "in-progress" );
  // console.log( response );
  return (
    <div className="p-3 bg-cyan-600 shadow-cyan-200 shadow-sm rounded-md mb-4 w-full px-2 sm:w-1/2 md:w-1/4 h-fit">
      <h3 className="text-lg font-bold">You have In-progress tasks:  { response?.tasks?.length }</h3>
      {
        response?.tasks?.length > 0 && response?.tasks?.map( task => (
          <TaskCard key={ task?.id } task={ task } />
        ) )
      }
      {
        response?.tasks?.length === 0 && (
          <p className="bg-black p-2 rounded-md text-center mt-5">No more tasks!!</p>
        )
      }
    </div>
  );
}
