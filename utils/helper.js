export const LOGIN = '/login';
export const DASHBOARD = '/dashboard';
export const ROOT = '/';

export const PUBLIC_ROUTES = [
  LOGIN,
  '/registration',
  ROOT 
];

export const calculatePercentage = ( part, total ) =>
{
  if ( total === 0 ) return { completed: 0, inProgress: 0, pending: 0 };
  return {
    completed: ( ( part.completed / total ) * 100 ).toFixed( 2 ),
    inProgress: ( ( part.inProgress / total ) * 100 ).toFixed( 2 ),
    pending: ( ( part.pending / total ) * 100 ).toFixed( 2 ),
  };
};