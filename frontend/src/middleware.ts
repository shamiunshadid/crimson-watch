import { validateSession } from "@/features/auth/server/use-cases/sessions";
import { NextRequest, NextResponse } from "next/server";

const protectedRoutes = ["/dashboard", "/profile", "/settings"];

const authRoutes = [
  "/sign-in",
  "/sign-up",
  "/forgot-password",
  "/reset-password",
];

const publicRoutes = ["/", "/about", "/pricing", "/contact"];

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  console.log("Middleware running for:", pathname);

  const isProtectedRoutes = protectedRoutes.some(
    (route) => pathname === route || pathname.startsWith(route + "/"),
  );

  const isAuthRoutes = authRoutes.some(
    (route) => pathname === route || pathname.startsWith(route + "/"),
  );

  const isPublicRoute = publicRoutes.some(
    (route) => pathname === route || pathname.startsWith(route + "/"),
  );

  if (isPublicRoute) {
    return NextResponse.next();
  }

  const { isValid } = await validateSession();
  console.log("Session valid:", isValid); // Debug log

  if (isValid) {
    // if authenticated user tries to access auth routes, they'll be redirected
    console.log("Redirecting to sign-in"); // Debug log
    if (isAuthRoutes) {
      return NextResponse.redirect(new URL("/dashboard", request.url));
    }

    return NextResponse.next();
  } else {
    // if unAuthorized users tries to access protected routes redirect to auth routes
    if (isProtectedRoutes) {
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
