
import { auth } from '../../auth';
import LandingPage from '../../components/LandingPage';

export default async function HomePage() {
  const session = await auth();
  const user = session?.user;

  // console.log( user );
  return <LandingPage user={user} />
}