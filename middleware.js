import NextAuth from "next-auth";
import { authConfig } from "./auth.config";
import { LOGIN, PUBLIC_ROUTES, ROOT } from "./utils/helper";

const { auth } = NextAuth(authConfig);

export default auth( ( req ) =>
{
  const { nextUrl } = req;
  const isAuthenticated = !!req.auth;
  
  const pathname = nextUrl.pathname;
  const isPublicRoute = PUBLIC_ROUTES.includes( pathname );

  // Redirect authenticated users from public routes to dashboard
  if ( isAuthenticated && isPublicRoute )
  {
    return Response.redirect( new URL( ROOT, nextUrl ) );
  }

  // Redirect unauthenticated users from private routes to login
  if ( !isAuthenticated && !isPublicRoute )
  {
    return Response.redirect( new URL( LOGIN, nextUrl ) );
  }
} );

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};