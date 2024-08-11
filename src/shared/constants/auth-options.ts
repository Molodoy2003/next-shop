import { prisma } from '@/prisma/prisma-client'
import { UserRole } from '@prisma/client'
import { compare, hashSync } from 'bcrypt'
import { AuthOptions } from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import GitHubProvider from 'next-auth/providers/github'

/* 
  CredentialsProvider - провайдер для входа через логин и пароль
*/

export const authOptions: AuthOptions = {
  providers: [
    GitHubProvider({
      clientId: process.env.GITHUB_ID || '',
      clientSecret: process.env.GITHUB_SECRET || '',
      profile(profile) {
        return {
          id: profile.id,
          name: profile.name || profile.login,
          email: profile.email,
          image: profile.avatar_url,
          role: 'USER' as UserRole,
        }
      },
    }),
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'text' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        if (!credentials) {
          return null
        }

        const values = {
          email: credentials.email,
        }

        const findUser = await prisma.user.findFirst({
          where: values,
        })

        if (!findUser) {
          return null
        }

        const isPasswordValid = await compare(
          credentials.password,
          findUser.password
        )

        if (!isPasswordValid) {
          return null
        }

        if (!findUser.verified) {
          return null
        }

        return {
          id: findUser.id,
          email: findUser.email,
          name: findUser.fullName,
          role: findUser.role,
        }
      },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: 'jwt',
  },
  callbacks: {
    async signIn({ user, account }) {
      try {
        // провайдер, когда мы сами вводим email и password
        if (account?.provider === 'credentials') {
          return true
        }

        if (!user.email) {
          return false
        }

        // providerId - айди аккаунта с гитхаба
        const findUser = await prisma.user.findFirst({
          where: {
            OR: [
              {
                provider: account?.provider,
                providerId: account?.providerAccountId,
              },
              { email: user.email },
            ],
          },
        })

        // обновляем аккаунт в нашей бд
        if (findUser) {
          await prisma.user.update({
            where: {
              id: findUser.id,
            },
            data: {
              provider: account?.provider,
              providerId: account?.providerAccountId,
            },
          })

          return true
        }

        // если мы не нашли такого пользователя, то создаем нового
        await prisma.user.create({
          data: {
            email: user.email,
            fullName: user.name || 'User #' + user.id,
            password: hashSync(user.id.toString(), 10),
            verified: new Date(),
            provider: account?.provider,
            providerId: account?.providerAccountId,
          },
        })

        return true
      } catch (error) {
        console.error('Error [SIGNIN]', error)
        return false
      }
    },
    async jwt({ token }) {
      if (!token.email) {
        return token
      }

      const findUser = await prisma.user.findFirst({
        where: {
          email: token.email,
        },
      })

      if (findUser) {
        token.id = String(findUser.id)
        token.email = findUser.email
        token.fullName = findUser.fullName
        token.role = findUser.role
      }

      return token
    },
    session({ session, token }) {
      if (session?.user) {
        session.user.id = token.id
        session.user.role = token.role
      }

      return session
    },
  },
}
