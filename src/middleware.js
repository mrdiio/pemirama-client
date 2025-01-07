import { getToken } from 'next-auth/jwt'
import { withAuth } from 'next-auth/middleware'
import { NextResponse } from 'next/server'

export default withAuth(
  async function middleware(req) {
    const token = await getToken({ req })

    const foto = token.user.foto
    const path = req.nextUrl.pathname

    if (token && foto === 0) {
      if (path !== '/take-selfie')
        return NextResponse.redirect(new URL('/take-selfie', req.nextUrl))
    }

    // console.log('from middleware', token)

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
