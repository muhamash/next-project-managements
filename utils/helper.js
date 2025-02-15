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

export const handleDownloadTasksCsv = async ( userId ) =>
{
  const res = await fetch( `/api/auth/download/csv?userId=${userId}` );
  const blob = await res.blob();
  const url = window.URL.createObjectURL( blob );
  const a = document.createElement( 'a' );
  a.style.display = 'none';
  a.href = url;
  a.download = `tasks_user_${userId}.csv`;
  document.body.appendChild( a );
  a.click();
  window.URL.revokeObjectURL( url );
};

export async function handleDownloadTasksExcel(userId) {
  try {
    const response = await fetch( `/api/auth/download/excel?userId=${userId}` );
    
    if (response.ok) {
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.style.display = 'none';
      a.href = url;
      a.download = `tasks_user_${userId}.xlsx`; 
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url); 
    } else {
      throw new Error('Failed to download the Excel file');
    }
  } catch (error) {
    console.error("Error downloading the Excel file:", error);
    
  }
}