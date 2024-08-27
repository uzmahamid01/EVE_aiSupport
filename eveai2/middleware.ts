import { clerkMiddleware } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';

// Define public routes
const publicRoutes = [
  "/",
  "/landing",
  "/about",
  "/tech-used",
  "/sign-in(.*)",
  "/sign-up(.*)",
];

// Middleware function
export default clerkMiddleware((auth, request) => {
  const url = new URL(request.url);

  // Allow access to public routes
  if (publicRoutes.some(route => url.pathname.startsWith(route))) {
    return NextResponse.next();
  }

  // Redirect to sign-in if not authenticated
  if (!auth) { // Check if the method or property exists
    const signInUrl = new URL('/sign-in', request.url);
    signInUrl.searchParams.set('redirect_url', url.pathname);
    return NextResponse.redirect(signInUrl);
  }

  return NextResponse.next();
});

// Configuration for matcher
export const config = {
  matcher: ['/((?!.+\\.[\\w]+$|_next).*)', '/', '/(api|trpc)(.*)'],
};


// import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

// // Protect non-public routes
// export default clerkMiddleware((auth, request) => {
//   const url = request.url;
//   console.log("Request URL:", url); // Log the request URL

//   if (isPublicRoute(request)) {
//     console.log("Route is public");
//     auth().protect();
//   } else {
//     console.log("Route is protected");
//   }
// });

// // Define public routes
// const isPublicRoute = createRouteMatcher([
//   "/landing",
//   "/auth/sign-in",
//   // "/dashboard/(.*)",
//   // "/auth/(.*)"
// ]);



// // Configure middleware matcher
// export const config = {
//   matcher: [
//     // Skip Next.js internals and static files
//     '/((?!_next|static|favicon.ico).*)',
//     // Always run for API routes
//     '/(api|trpc)(.*)',
//   ],
// };
