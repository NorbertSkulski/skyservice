import { prisma } from "@/db/prisma/prisma";
import { User } from "@/generated/prisma/client";
import bcrypt from "bcryptjs";
import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";


export type CredentialType = Partial<Record<"login" | "password", unknown>>;

export const { handlers, auth, signIn, signOut } = NextAuth({
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60,
    updateAge: 24 * 60 * 60,
  },
  secret: process.env.AUTH_SECRET,
  providers: [
    Credentials({
      name: "Credentials",
      credentials: {
        login: { label: "Login", type: "login" },
        password: { label: "Hasło", type: "password" }
      },
      async authorize(credentials?: CredentialType) {

        if (!credentials?.login || !credentials?.password) return null;

        const user: Partial<User> | null = await prisma.user.findUnique({
          where: { login: credentials.login as string }
        });

        if (!user || !user.password) return null;

        const isValid = await bcrypt.compare(
          credentials.password as string,
          user.password
        );

        if (!isValid) return null;

        delete user.password;

        return user;

      }
    })
  ],
  callbacks: {
    async session({ session, token }: { session: any, token: any }) {
      if (token && session.user) {
        session.user.id = token.sub as string;
        session.user.role = token.role as string;
      }
      return session;
    },
    async jwt({ token, user }: { token: any, user: any }) {
      if (user) {
        token.role = (user as any).role;
      }
      return token;
    }
  }
});