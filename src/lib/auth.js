import { loginService } from '@/services/auth.service'
import CredentialsProvider from 'next-auth/providers/credentials'

export const authOptions = {
  providers: [
    CredentialsProvider({
      async authorize(credentials) {
        const { email, password } = credentials
        const res = await loginService(email, password)

        const payload = {
          user: res.data,
          accessToken: res.token,
        }

        return payload
      },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: 'jwt',
    maxAge: 60 * 60 * 15,
  },
  pages: {
    signIn: '/',
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        const payload = {
          sub: user.user.id,
          name: user.user.nama,
          nim: user.user.nim,
          fakultas: user.user.fakultas,
          fakultas_id: user.user.code,
          program_studi: user.user.program_studi,
        }

        token.user = payload
        token.accessToken = user.accessToken
      }

      return token
    },
    async session({ session, token }) {
      if (token) {
        token.user.foto = 0
      }

      session.user = token.user
      session.accessToken = token.accessToken
      session.error = token.error || null

      return session
    },
  },
}
