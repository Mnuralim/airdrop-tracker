import NextAuth from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'
import { register } from './actions'

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  callbacks: {
    async jwt({ token, user, account }) {
      if (account && account.provider === 'google') {
        const userData = await register(token.name as string, token.email as string)
        token.userId = userData.id
      }
      return { ...token, ...user }
    },
    async session({ session, token }) {
      session.user.id = token.userId as string
      return session
    },
  },

  secret: process.env.NEXT_AUTH_SECRET,
})
