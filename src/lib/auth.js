import { loginService } from '@/services/auth.service'
import { checkFotoService } from '@/services/voter.service'
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
    maxAge: 60 * 20,
  },
  pages: {
    signIn: '/',
  },
  callbacks: {
    async jwt({ token, user, session, trigger }) {
      if (user) {
        const payload = {
          sub: user.user.id,
          name: user.user.nama,
          nim: user.user.nim,
          fakultas: user.user.fakultas,
          fakultas_id: user.user.code,
          program_studi: user.user.program_studi,
          isSwafotoExist: user.user.isSwafotoExist,
        }

        token.user = payload
        token.accessToken = user.accessToken
      }

      if (trigger === 'update') {
        token.user.isSwafotoExist = session.isSwafotoExist
      }

      return token
    },
    async session({ session, token }) {
      session.user = token.user
      session.accessToken = token.accessToken
      session.error = token.error || null

      return session
    },
  },
  events: {
    session: async ({ session, token }) => {
      const checkFoto = await checkFotoService(session.accessToken)
      token.user.isSwafotoExist = checkFoto.isExist
    },
    updateUser: async ({ user, account, profile, isNewUser }) => {
      user.isSwafotoExist = profile.isSwafotoExist
    },
  },
}
