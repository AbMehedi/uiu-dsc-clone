import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function middleware(request: NextRequest) {
  const token = request.cookies.get('token')?.value;
  const { pathname } = request.nextUrl;

  // Only apply middleware to admin routes
  if (!pathname.startsWith('/admin')) {
    return NextResponse.next();
  }

  // Define public admin paths that don't require authentication
  const publicPaths = ['/admin/login'];
  const isPublicPath = publicPaths.some(path => 
    pathname === path || pathname.startsWith(`${path}/`)
  );

  // If it's a public path, allow access
  if (isPublicPath) {
    // If user is already logged in, redirect to admin dashboard
    if (token && pathname === '/admin/login') {
      return NextResponse.redirect(new URL('/admin', request.url));
    }
    return NextResponse.next();
  }

  // For protected admin routes, check for token
  if (!token) {
    // Redirect to login if no token is found
    const loginUrl = new URL('/admin/login', request.url);
    // Add the current path to redirect back after login
    loginUrl.searchParams.set('from', pathname);
    return NextResponse.redirect(loginUrl);
  }

  // If token exists, verify it with the backend
  try {
    const response = await fetch(new URL('/api/auth/me', request.url).toString(), {
      headers: {
        'Cookie': `token=${token}`,
      },
      credentials: 'include',
    });

    if (!response.ok) {
      throw new Error('Invalid token');
    }

    // Token is valid, continue to the requested page
    return NextResponse.next();
  } catch (error) {
    // If token verification fails, redirect to login
    const loginUrl = new URL('/admin/login', request.url);
    loginUrl.searchParams.set('from', pathname);
    
    // Clear the invalid token
    const response = NextResponse.redirect(loginUrl);
    response.cookies.delete('token');
    
    return response;
  }
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder (public files)
     */
    '/((?!_next/static|_next/image|favicon.ico|.*\.(?:svg|png|jpg|jpeg|gif|webp|ico)$).*)',
  ],
};
