import NextAuth from "next-auth";
import { authConfig } from "./auth.config";
import { DASHBOARD, LOGIN, PUBLIC_ROUTES } from "./utils/helper";

const { auth } = NextAuth( authConfig );

export default auth( ( req ) =>
{
  const { nextUrl } = req;
  const isAuthenticated = !!req.auth;
  const userRole = req.auth?.user?.user?.role;
  console.log( "Middleware running", req.auth?.user?.user?.role );

  const isPublicRoute = PUBLIC_ROUTES.includes( nextUrl.pathname );
  const isAdminRoute = nextUrl.pathname.startsWith( DASHBOARD );

  // Redirect unauthenticated users from protected routes
  if ( !isAuthenticated && !isPublicRoute )
  {
    return Response.redirect( new URL( LOGIN, nextUrl ) );
  }

  // Role-based routing
  if ( isAuthenticated )
  {
    // Admin can only access dashboard routes
    if ( userRole === "ADMIN" && !isAdminRoute )
    {
      return Response.redirect( new URL( DASHBOARD, nextUrl ) );
    }

    // User cannot access any dashboard routes
    if ( userRole === "USER" && isAdminRoute )
    {
      return Response.redirect( new URL( "/", nextUrl ) );
    }
  }
} );

export const config = {
  matcher: [ "/((?!api|_next|.*\\.[\\w]+$).*)", "/", "/trpc(.*)" ],
};