import { redirect } from "next/navigation";
import { auth } from "../../../../auth";
import AddTask from "../../../../components/AddTask";

export default async function AddTaskPage ({searchParams})
{
  const session = await auth();
  const gerSearchParams = await searchParams;

  if ( !session )
  {
    redirect( '/' );
  }

  console.log( gerSearchParams?.userId );
  return (
    <div className="flex items-center justify-center py-5 h-screen w-full">
      <AddTask/>
    </div>
  )
}