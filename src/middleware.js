import { getToken } from 'next-auth/jwt'
import { withAuth } from 'next-auth/middleware'
import { NextResponse } from 'next/server'

export default withAuth(
  async function middleware(req) {
    const session = await getToken({ req })

    const { user } = session

    if (user.foto === 0) {
      if (req.nextUrl.pathname !== '/take-selfie')
        return NextResponse.redirect(new URL('/take-selfie', req.url))
    }

    return NextResponse.next()
  },
  {
    pages: {
      signIn: '/',
    },
  }
)

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
}
