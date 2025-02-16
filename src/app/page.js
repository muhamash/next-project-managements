import { auth } from '../../auth';
import LandingPage from '../../components/LandingPage';
import { fetchTaskStatusPercentage } from '../../utils/actions/tasks';
import { getUserInfo } from '../../utils/actions/user';

export default async function HomePage() {
  const session = await auth();
  const user = session?.user;
  
  let userState = null;
  let getUser = null;

  if (user?.id) {
    userState = await fetchTaskStatusPercentage(user.id);
    getUser = getUserInfo(user.id);
  }

  // throw new Error( "hello" );
  return <LandingPage user={user} getUser={getUser} userState={userState} />;
}