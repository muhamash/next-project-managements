import { auth } from "../../../auth";
import Header from "../../../components/Header";

export default async function ParentPage ()
{
  const session = await auth();
  // console.log( session );
  
  return (
    <div className="w-full">
      <Header session={ session } />
    </div>
  );
}
