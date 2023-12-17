
import type { NextAuthOptions } from "next-auth";
import GitHubProvider from "next-auth/providers/github";
import CredentialsProvider from "next-auth/providers/credentials";
import { prisma } from '@/lib/prisma';
import { PrismaAdapter } from "@auth/prisma-adapter";

export const options: NextAuthOptions = {
  providers: [
    GitHubProvider({
      clientId: process.env.GITHUB_ID as string,
      clientSecret: process.env.GOTHUB_SECRET as string,
    }),
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        username: { label: "Email", type: "email", placeholder: "example@email.com" },
        password: {  label: "Password", type: "password" }
      },
      async authorize(credentials) {
        const { username, password } = credentials as { username: string, password: string }
        
        if (!username || !password) {
          return null
        }
        const user = await prisma.user.findUnique({ where: { email:username, password } })
        
        if (user) {
          return { id: user.id.toString(), email: user.email }
        }
        return null        
      }
    })
  ],
}    