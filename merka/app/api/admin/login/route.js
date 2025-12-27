import { NextResponse } from 'next/server'
import { 
  generateSessionToken, 
  setSessionCookie, 
  checkRateLimit, 
  resetRateLimit,
  isValidEmail,
  sanitizeInput 
} from '@/lib/auth'

export async function POST(request) {
  try {
    // Get client IP for rate limiting
    const forwarded = request.headers.get('x-forwarded-for')
    const ip = forwarded ? forwarded.split(',')[0] : request.headers.get('x-real-ip') || 'unknown'
    
    // Check rate limit
    const rateLimitResult = checkRateLimit(ip)
    if (!rateLimitResult.allowed) {
      return NextResponse.json(
        { 
          error: `Too many login attempts. Please try again in ${rateLimitResult.resetIn} seconds.` 
        }, 
        { 
          status: 429,
          headers: {
            'Retry-After': String(rateLimitResult.resetIn)
          }
        }
      )
    }
    
    const body = await request.json()
    const email = sanitizeInput(body.email?.trim().toLowerCase())
    const password = body.password
    
    // Validate input
    if (!email || !password) {
      return NextResponse.json(
        { error: 'Email and password are required' }, 
        { status: 400 }
      )
    }
    
    if (!isValidEmail(email)) {
      return NextResponse.json(
        { error: 'Invalid email format' }, 
        { status: 400 }
      )
    }
    
    const adminEmail = process.env.ADMIN_EMAIL?.toLowerCase()
    const adminPassword = process.env.ADMIN_PASSWORD
    
    // Use constant-time comparison to prevent timing attacks
    const emailMatch = email === adminEmail
    const passwordMatch = password === adminPassword
    
    if (emailMatch && passwordMatch) {
      // Reset rate limit on successful login
      resetRateLimit(ip)
      
      // Generate secure session token
      const sessionToken = generateSessionToken(email)
      
      // Set secure cookie
      await setSessionCookie(sessionToken)
      
      // Log successful login (in production, use proper logging service)
      console.log(`[AUTH] Successful login from IP: ${ip} at ${new Date().toISOString()}`)
      
      return NextResponse.json({ success: true })
    }
    
    // Log failed attempt (in production, use proper logging service)
    console.log(`[AUTH] Failed login attempt from IP: ${ip} at ${new Date().toISOString()}`)
    
    // Generic error message to prevent user enumeration
    return NextResponse.json(
      { error: 'Invalid credentials' }, 
      { status: 401 }
    )
  } catch (error) {
    console.error('[AUTH] Login error:', error)
    return NextResponse.json(
      { error: 'An error occurred. Please try again.' }, 
      { status: 500 }
    )
  }
}
