import NextAuth from "next-auth";
import { authConfig } from "./auth.config";
import { DASHBOARD, LOGIN, PUBLIC_ROUTES } from "./utils/helper";

const { auth } = NextAuth(authConfig);

export default auth((req) => {
  const { nextUrl } = req;
  const isAuthenticated = !!req.auth;
  const userRole = req.auth?.user?.role;

  console.log(req.auth);

  const isPublicRoute = PUBLIC_ROUTES.includes(nextUrl.pathname);
  const isAdminRoute = nextUrl.pathname.startsWith(DASHBOARD);
  const isUserRoute = nextUrl.pathname.startsWith("/tasks");

  if (!isAuthenticated && !isPublicRoute) {
    return Response.redirect(new URL(LOGIN, nextUrl));
  }

  // Redirect users based on role
  if (isAuthenticated) {
    if (userRole === "ADMIN" && isUserRoute) {
      return Response.redirect(new URL(DASHBOARD, nextUrl));
    }
    if (userRole === "USER" && isAdminRoute) {
      return Response.redirect(new URL("/tasks/addTask", nextUrl));
    }
  }
});

export const config = {
  matcher: [ "/((?!api|_next|.*\\.[\\w]+$).*)", "/", "/trpc(.*)" ],
};