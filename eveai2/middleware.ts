import { clerkMiddleware } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

const publicRoutes = [
  "/",
  "/landing",
  "/about",
  "/tech-used",
  "/sign-in(.*)",
  "/sign-up(.*)",
];

export default clerkMiddleware((auth, request) => {
  const url = new URL(request.url);
  
  if (publicRoutes.some(route => url.pathname.startsWith(route))) {
    return NextResponse.next();
  }

  if (!auth.userId && !auth.isPublicRoute) {
    const signInUrl = new URL('/sign-in', request.url);
    signInUrl.searchParams.set('redirect_url', url.pathname);
    return NextResponse.redirect(signInUrl);
  }

  return NextResponse.next();
});

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
