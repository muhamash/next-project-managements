import { Suspense } from 'react';
import { auth } from '../auth';
import LandingPage from '../components/LandingPage';
import { fetchTaskStatusPercentage } from '../utils/actions/tasks';
import { getUserInfo } from '../utils/actions/user';

export default async function HomePage() {
  const session = await auth();
  const user = session?.user;

  const userStatePromise = user?.id ? fetchTaskStatusPercentage( user.id ) : Promise.resolve( null );
  const getUser = user?.id ? getUserInfo( user.id ) : Promise.resolve( null );

  // console.log( user );
  // throw new Error( "hello error!!" );
  return <Suspense fallback={
    <p>suspense: loading</p>
  }>
    <LandingPage user={ user } getUser={ getUser } userStatePromise={ userStatePromise } />
  </Suspense>;
}