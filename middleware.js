import { getToken } from 'next-auth/jwt';
import { NextResponse } from 'next/server';

export async function middleware(req) {
  const token = await getToken({ req });
  const { pathname } = req.nextUrl;

  // Public paths that don't require authentication
  const publicPaths = ['/login', '/register', '/menu', '/about', '/contact', '/', '/api/auth'];
  
  // Check if the current path is public
  const isPublicPath = publicPaths.some(path => pathname.startsWith(path));

  // Protected routes that require authentication
  const protectedPaths = ['/cart', '/profile', '/orders'];
  const isProtectedPath = protectedPaths.some(path => pathname.startsWith(path));

  // If trying to access protected route without auth, redirect to login
  if (isProtectedPath && !token) {
    return NextResponse.redirect(new URL('/login', req.url));
  }

  // If trying to access auth pages while logged in, redirect to home
  if ((pathname === '/login' || pathname === '/register') && token) {
    return NextResponse.redirect(new URL('/', req.url));
  }

  // Allow access to public paths
  if (isPublicPath) {
    return NextResponse.next();
  }

  // Protect API routes except auth routes
  if (pathname.startsWith('/api') && !pathname.startsWith('/api/auth')) {
    if (!token) {
      return NextResponse.json(
        { error: 'Authentication required' },
        { status: 401 }
      );
    }
  }

  return NextResponse.next();
}

// Update the matcher configuration
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder
     */
    '/((?!_next/static|_next/image|favicon.ico|public/|assets/).*)',
  ],
};