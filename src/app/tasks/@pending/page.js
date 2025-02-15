import { fetchTasks } from "../../../../utils/actions/tasks";

export default async function PendingPage ({searchParams})
{
  const getSearchParams = await searchParams;
  // console.log( getSearchParams.userId );
  const response = await fetchTasks( getSearchParams.userId, "pending" );
  console.log( response );

  return (
    <div className="p-3 bg-rose-600">
      PendingPage
    </div>
  )
}
