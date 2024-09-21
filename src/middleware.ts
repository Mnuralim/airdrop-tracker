import { NextRequest, NextResponse } from 'next/server'
import { auth } from './auth'

export async function middleware(req: NextRequest) {
  const session = await auth()
  const baseUrl = req.nextUrl.origin

  if (!session) {
    return NextResponse.redirect(`${baseUrl}/api/auth/signin`)
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/', '/airdrops/:path*'],
}
