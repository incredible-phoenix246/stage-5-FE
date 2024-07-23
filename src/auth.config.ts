import prisma from "./utils/prisma";
import type { NextAuthConfig } from "next-auth";
import Google from "next-auth/providers/google";
import { PrismaAdapter } from "@auth/prisma-adapter";
import Credentials from "next-auth/providers/credentials";

export default {
  adapter: PrismaAdapter(prisma),
  session: {
    strategy: "jwt",
  },
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code",
        },
      },
    }),
    // Credentials({
    //   credentials: {
    //     email: {},
    //     password: {},
    //   },
    //   async authorize(credentials) {
    //     if (credentials === null) return null;

    //     try {
    //       const user = getUserByEmail(credentials?.email);
    //       console.log(user);
    //       if (user) {
    //         const isMatch = user?.password === credentials.password;

    //         if (isMatch) {
    //           return user;
    //         } else {
    //           throw new Error("Email or Password is not correct");
    //         }
    //       } else {
    //         throw new Error("User not found");
    //       }
    //     } catch (error) {
    //       throw new Error(error);
    //     }
    //   },
    // }),
  ],
  callbacks: {
    async signIn({ account, profile, user }: any) {
      return { ...account, ...profile, ...user };
    },

    async jwt({ token, user }) {
      if (user) {
        token = { accessToken: user };
      }
      return { ...token, ...user };
    },
    async session({ session, token }) {
      session.user = token as any;
      return session;
    },
  },
  pages: {
    signIn: "/auth/login",
  },
} satisfies NextAuthConfig;
