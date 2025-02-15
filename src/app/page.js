
import { auth } from '../../auth';
import LandingPage from '../../components/LandingPage';
import { fetchTaskStatusPercentage } from '../../utils/actions/tasks';
import { getUserInfo } from '../../utils/actions/user';

export default async function HomePage() {
  const session = await auth();
  const userState = await fetchTaskStatusPercentage( session?.user?.id );
  const getUser = getUserInfo( session?.user?.id );
  const user = session?.user;

  // console.log( getUser );
  return <LandingPage user={ user } getUser={getUser} userState={ userState } />
}