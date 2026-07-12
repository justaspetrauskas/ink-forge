import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";


export async function updateSession(request: NextRequest) {

  let response = NextResponse.next({
    request,
  });


  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },

        setAll(cookiesToSet) {

          cookiesToSet.forEach(({ 
            name, 
            value 
          }) => {
            request.cookies.set(
              name,
              value
            );
          });


          response = NextResponse.next({
            request,
          });


          cookiesToSet.forEach(({ 
            name, 
            value, 
            options 
          }) => {
            response.cookies.set(
              name,
              value,
              options
            );
          });

        },
      },
    }
  );


  const {data: {user}} = await supabase.auth.getUser();


const publicRoutes = [
  "/auth/login",
  "/auth/signup",
  "/auth/forgot-password",
  "/auth/callback",
  "/auth/reset-password",
];

const pathname = request.nextUrl.pathname;

const normalizedPathname =
  pathname.length > 1 && pathname.endsWith("/")
    ? pathname.slice(0, -1)
    : pathname;

const legacyAuthRedirects: Record<string, string> = {
  "/login": "/auth/login",
  "/signup": "/auth/signup",
  "/forgot-password": "/auth/forgot-password",
  "/reset-password": "/auth/reset-password",
};

const legacyRedirectPath = legacyAuthRedirects[normalizedPathname];

if (legacyRedirectPath) {
  return NextResponse.redirect(new URL(legacyRedirectPath, request.url));
}

const isPublicRoute = publicRoutes.some((route) =>
  pathname.startsWith(route)
);


if (!user && !isPublicRoute) {
  return NextResponse.redirect(
    new URL("/auth/login", request.url)
  );
}


  return response;
}