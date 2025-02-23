import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  function middleware(req) {
    return NextResponse.next();
  },
  {
    callbacks: {
      authorized: ({ token, req }) => {
        const { pathname } = req.nextUrl;
        const publicPaths = ["/login", "/register"];
        
        if (publicPaths.includes(pathname) || pathname.startsWith("/api/auth")) {
          return true;
        }
        
        return !!token;
      }
    },
    pages: {
      signIn: "/login"  // This replaces the deprecated signInUrl
    }
  }
);

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico).*)",
  ],
};