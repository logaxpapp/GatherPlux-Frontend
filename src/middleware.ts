import { NextResponse, NextRequest } from 'next/server';
import { getCookie } from './utils/cookie.utility';

export function middleware(req: NextRequest) {
  const token = getCookie('token');
  const url = req.nextUrl.clone();
  console.log(url.pathname);
  // Redirect if token exists and the user is trying to access restricted routes
  if (token && (url.pathname === '/auth/register' || url.pathname === '/auth/signin')) {
    url.pathname = '/profile'; // Redirect to the profile page
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}
