import { NextRequest, NextResponse } from "next/server";

//NextRequest gives access to the request object -- headers, cookies, path, etc.
//NextResponse lets you return a response like redirect or continue to the requested page.
export function middleware(request: NextRequest) {
  // it checks if a cookie named jwt exists
  //if it does, token will have that value (user logged in)
  //if it doesn't , token will be undefined
  const token = request.cookies.get("jwt")?.value;
  //this gives the current route path
  const { pathname } = request.nextUrl;

  //checks if we are on the protected routes
  const isProtectedRoute =
    pathname.startsWith("/dashboard") || pathname.startsWith("/expense");
  //checks if we are on login page
    const isAuthPage = pathname === "/";

  if (isProtectedRoute && !token) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  if (isAuthPage && token) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  //if none of the conditions match
  return NextResponse.next();
}

//this tells Next.js to apply middleware to the specified routes
export const config = {
  matcher: ["/dashboard/:path*", "/expense/:path*", "/"],
};
