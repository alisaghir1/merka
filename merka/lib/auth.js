import { cookies } from 'next/headers'
import crypto from 'crypto'

// Secret key for signing tokens - should be set in environment variables
const SECRET_KEY = process.env.AUTH_SECRET_KEY || process.env.ADMIN_PASSWORD + '_secret_key_2024'

/**
 * Generate a secure session token with HMAC signature
 */
export function generateSessionToken(email) {
  const timestamp = Date.now()
  const expiresAt = timestamp + (7 * 24 * 60 * 60 * 1000) // 7 days
  const randomBytes = crypto.randomBytes(32).toString('hex')
  
  const payload = JSON.stringify({
    email,
    timestamp,
    expiresAt,
    nonce: randomBytes
  })
  
  const signature = crypto
    .createHmac('sha256', SECRET_KEY)
    .update(payload)
    .digest('hex')
  
  const token = Buffer.from(JSON.stringify({
    payload,
    signature
  })).toString('base64')
  
  return token
}

/**
 * Verify and decode a session token
 */
export function verifySessionToken(token) {
  try {
    if (!token) return null
    
    const decoded = JSON.parse(Buffer.from(token, 'base64').toString('utf-8'))
    const { payload, signature } = decoded
    
    // Verify signature
    const expectedSignature = crypto
      .createHmac('sha256', SECRET_KEY)
      .update(payload)
      .digest('hex')
    
    // Use timing-safe comparison to prevent timing attacks
    if (!crypto.timingSafeEqual(Buffer.from(signature), Buffer.from(expectedSignature))) {
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

/**
 * Set secure session cookie
 */
export async function setSessionCookie(token) {
  const cookieStore = await cookies()
  
  cookieStore.set('admin_session', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict', // Stricter than 'lax' for better CSRF protection
    maxAge: 60 * 60 * 24 * 7, // 7 days
    path: '/',
  })
}

/**
 * Clear session cookie
 */
export async function clearSessionCookie() {
  const cookieStore = await cookies()
  
  cookieStore.set('admin_session', '', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    maxAge: 0,
    path: '/',
  })
}

/**
 * Get current session from cookies
 */
export async function getSession() {
  const cookieStore = await cookies()
  const sessionCookie = cookieStore.get('admin_session')
  
  if (!sessionCookie?.value) {
    return null
  }
  
  return verifySessionToken(sessionCookie.value)
}

/**
 * Check if user is authenticated
 */
export async function isAuthenticated() {
  const session = await getSession()
  return session !== null
}

/**
 * Rate limiting store (in production, use Redis)
 */
const rateLimitStore = new Map()

/**
 * Rate limiter for login attempts
 */
export function checkRateLimit(identifier, maxAttempts = 5, windowMs = 15 * 60 * 1000) {
  const now = Date.now()
  const key = `login_${identifier}`
  
  // Clean old entries
  const entry = rateLimitStore.get(key)
  
  if (!entry || now - entry.firstAttempt > windowMs) {
    rateLimitStore.set(key, {
      attempts: 1,
      firstAttempt: now
    })
    return { allowed: true, remaining: maxAttempts - 1 }
  }
  
  if (entry.attempts >= maxAttempts) {
    const resetTime = entry.firstAttempt + windowMs
    return { 
      allowed: false, 
      remaining: 0,
      resetIn: Math.ceil((resetTime - now) / 1000)
    }
  }
  
  entry.attempts++
  return { allowed: true, remaining: maxAttempts - entry.attempts }
}

/**
 * Reset rate limit after successful login
 */
export function resetRateLimit(identifier) {
  const key = `login_${identifier}`
  rateLimitStore.delete(key)
}

/**
 * Sanitize input to prevent XSS
 */
export function sanitizeInput(input) {
  if (typeof input !== 'string') return input
  return input
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;')
}

/**
 * Validate email format
 */
export function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}
