import { auth } from "@/features/auth/auth";
import { NextRequest, NextResponse } from "next/server";

const protectedRoutes = ["/dashboard", "/profile", "/settings"];

const authRoutes = [
  "/sign-in",
  "/sign-up",
  "/forgot-password",
  "/reset-password",
];

const publicRoutes = ["/", "/about", "/pricing", "/contact"];

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const isProtectedRoute = protectedRoutes.some(
    (route) => pathname === route || pathname.startsWith(route + "/"),
  );

  const isAuthRoute = authRoutes.some(
    (route) => pathname === route || pathname.startsWith(route + "/"),
  );

  const isPublicRoute = publicRoutes.some(
    (route) => pathname === route || pathname.startsWith(route + "/"),
  );

  // Allow public routes
  if (isPublicRoute) {
    return NextResponse.next();
  }

  // Get session from better-auth
  const session = await auth.api.getSession({
    headers: request.headers,
  });

  // If authenticated
  if (session) {
    // Redirect authenticated users away from auth routes
    if (isAuthRoute) {
      return NextResponse.redirect(new URL("/dashboard", request.url));
    }
    return NextResponse.next();
  } else {
    // Redirect unauthenticated users to sign-in for protected routes
    if (isProtectedRoute) {
      const signInUrl = new URL("/sign-in", request.url);
      signInUrl.searchParams.set("callbackUrl", pathname);
      return NextResponse.redirect(signInUrl);
    }
    return NextResponse.next();
  }
}

// Configure which routes to run middleware on
export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder
     * - api routes (if you have any)
     */
    "/((?!_next/static|_next/image|favicon.ico|public/|api/).*)",
  ],
};
