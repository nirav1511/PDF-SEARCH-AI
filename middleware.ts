// src/middleware.ts
import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server'
import { NextResponse } from 'next/server'

// Public routes (no login required)
const isPublicRoute = createRouteMatcher([
  '/login(.*)',
  '/signup(.*)',
])

const isProtectedRoute = createRouteMatcher([
  '/',
  '/pdfai',
  '/MenuAI',
  '/translate-ai',
  '/sign-up(.*)',
])

export default clerkMiddleware(async (auth, req) => {
  const { userId } = await auth()
  const url = new URL(req.url)

  

  // If logged in and trying to access a public route → redirect to "/"
  if (userId && isPublicRoute(req)) {
    return NextResponse.redirect(new URL('/', req.url))
  }

  // If NOT logged in and tries to access "/" or "/pdfai" → redirect to /sign-in
  if (!userId && isProtectedRoute(req)) {
    return NextResponse.redirect(new URL('/login', req.url))
  }

  return NextResponse.next()
})

export const config = {
  matcher: [
       '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for API routes
    '/(api|trpc)(.*)',
    '/',              // protect homepage
    '/pdfai',  // protect /pdfai and all subroutes
    '/MenuAI',
    '/translate-ai',
    '/login',
    '/signup',
  ],
}