import { NextResponse } from 'next/server'

// Secret key for verifying tokens - must match the one in lib/auth.js
const SECRET_KEY = process.env.AUTH_SECRET_KEY || (process.env.ADMIN_PASSWORD || '') + '_secret_key_2024'

/**
 * Convert string to ArrayBuffer for Web Crypto API
 */
function stringToArrayBuffer(str) {
  const encoder = new TextEncoder()
  return encoder.encode(str)
}

/**
 * Convert ArrayBuffer to hex string
 */
function arrayBufferToHex(buffer) {
  return Array.from(new Uint8Array(buffer))
    .map(b => b.toString(16).padStart(2, '0'))
    .join('')
}

/**
 * Create HMAC-SHA256 signature using Web Crypto API (Edge Runtime compatible)
 */
async function createHmacSignature(data, secret) {
  const key = await crypto.subtle.importKey(
    'raw',
    stringToArrayBuffer(secret),
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign']
  )
  const signature = await crypto.subtle.sign('HMAC', key, stringToArrayBuffer(data))
  return arrayBufferToHex(signature)
}

/**
 * Verify session token in middleware
 */
async function verifySessionToken(token) {
  try {
    if (!token) return null
    
    const decoded = JSON.parse(atob(token))
    const { payload, signature } = decoded
    
    // Verify signature using Web Crypto API
    const expectedSignature = await createHmacSignature(payload, SECRET_KEY)
    
    if (signature !== expectedSignature) {
      return null
    }
    
    const parsedPayload = JSON.parse(payload)
    
    // Check if token has expired
    if (Date.now() > parsedPayload.expiresAt) {
      return null
    }
    
    return parsedPayload
  } catch (error) {
    return null
  }
}

export async function middleware(request) {
  const { pathname } = request.nextUrl
  
  // Create response with pathname header for layout detection
  const response = NextResponse.next()
  response.headers.set('x-pathname', pathname)
  
  // Add security headers
  response.headers.set('X-Content-Type-Options', 'nosniff')
  response.headers.set('X-Frame-Options', 'DENY')
  response.headers.set('X-XSS-Protection', '1; mode=block')
  response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin')
  
  // Check if it's an admin route (except login)
  if (pathname.startsWith('/admin') && pathname !== '/admin/login') {
    const sessionCookie = request.cookies.get('admin_session')
    
    // Verify the session token is valid and not expired
    const session = sessionCookie ? await verifySessionToken(sessionCookie.value) : null
    
    if (!session) {
      // Clear invalid session cookie and redirect to login
      const redirectResponse = NextResponse.redirect(new URL('/admin/login', request.url))
      redirectResponse.headers.set('x-pathname', pathname)
      redirectResponse.cookies.delete('admin_session')
      return redirectResponse
    }
  }
  
  // If logged in and trying to access login page, redirect to admin
  if (pathname === '/admin/login') {
    const sessionCookie = request.cookies.get('admin_session')
    const session = sessionCookie ? await verifySessionToken(sessionCookie.value) : null
    
    if (session) {
      const redirectResponse = NextResponse.redirect(new URL('/admin', request.url))
      redirectResponse.headers.set('x-pathname', pathname)
      return redirectResponse
    }
  }
  
  // Protect API routes
  if (pathname.startsWith('/api/admin') && !pathname.includes('/login') && !pathname.includes('/logout')) {
    const sessionCookie = request.cookies.get('admin_session')
    const session = sessionCookie ? await verifySessionToken(sessionCookie.value) : null
    
    if (!session) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }
  }
  
  return response
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico|public).*)'],
}
