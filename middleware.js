import NextAuth from "next-auth";
import { NextResponse } from "next/server";
import { authConfig } from "./auth.config";
import { DASHBOARD, LOGIN, PUBLIC_ROUTES } from "./utils/helper";

const { auth } = NextAuth(authConfig);

export default auth(async function middleware(req) {
  const { nextUrl } = req;
  console.log( req );
  
  const isAuthenticated = req.auth?.user !== undefined;
  
  // Normalize path handling
  const cleanPath = (path) => path.replace(/\/$/, "") || "/";
  const currentPath = cleanPath(nextUrl.pathname);
  
  const isPublicRoute = PUBLIC_ROUTES.some(route => 
    currentPath === cleanPath(route)
  );

  console.log(`Auth Check:`, {
    path: currentPath,
    isAuthenticated,
    isPublicRoute,
    session: req.auth
  });

  // Handle authenticated users
  if (isAuthenticated) {
    if (isPublicRoute && currentPath !== cleanPath(DASHBOARD)) {
      console.log(`Redirecting authenticated user from public route to dashboard`);
      return NextResponse.redirect(new URL(DASHBOARD, nextUrl));
    }
    return NextResponse.next();
  }

  // Handle unauthenticated users
  if (!isPublicRoute) {
    console.log(`Redirecting unauthenticated user to login`);
    const redirectUrl = new URL(LOGIN, nextUrl);
    redirectUrl.searchParams.set("from", currentPath);
    return NextResponse.redirect(redirectUrl);
  }

  return NextResponse.next();
});

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/api/(.*)"],
};