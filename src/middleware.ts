import { NextRequest, NextResponse } from 'next/server'
import { auth } from './auth'
import { RateLimiterMemory } from 'rate-limiter-flexible'

export async function middleware(req: NextRequest) {
  const session = await auth()
  const baseUrl = req.nextUrl.origin
  const rateLimiter = new RateLimiterMemory({
    points: 5,
    duration: 60,
  })

  const ip = req.ip || req.headers.get('x-forwarded-for') || '127.0.0.1'

  try {
    if (!session) {
      return NextResponse.redirect(`${baseUrl}/api/auth/signin`)
    }

    await rateLimiter.consume(ip)
    return NextResponse.next()
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (err) {
    return NextResponse.json({ error: 'Too many requests' }, { status: 429 })
  }
}

export const config = {
  matcher: ['/', '/airdrops/:path*'],
}
