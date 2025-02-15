
import { auth } from '../../auth';
import LandingPage from '../../components/LandingPage';
import { fetchTaskStatusPercentage } from '../../utils/actions/tasks';

export default async function HomePage() {
  const session = await auth();
  const userState = await fetchTaskStatusPercentage( session?.user?.id );
  const user = session?.user;

  // console.log( userState );
  return <LandingPage user={ user } userState={ userState } />
}