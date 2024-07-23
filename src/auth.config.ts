import type { NextAuthConfig } from "next-auth";
import Google from "next-auth/providers/google";
import Credentials from "next-auth/providers/credentials";
import { getuserbyemaail, GOOGLE_SIGN_IN } from "./app/action/auth";

export default {
  // adapter: PrismaAdapter(prisma),

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
    Credentials({
      credentials: {
        email: {},
        password: {},
      },
      async authorize(credentials) {
        if (credentials === null) return null;

        try {
          // @ts-expect-error
          const user = await getuserbyemaail(credentials.email);

          if (user) {
            const isMatch = user.password === credentials.password;

            if (isMatch) {
              return user;
            } else {
              throw new Error("Email or Password is not correct");
            }
          } else {
            throw new Error("User not found");
          }
        } catch (error: unknown) {
          if (error instanceof Error) {
            throw new Error(error.message);
          } else {
            throw new Error("An unknown error occurred");
          }
        }
      },
    }),
  ],
  callbacks: {
    async signIn({ account, profile, user }: any) {
      if (account && account.provider === "google") {
        const res = await GOOGLE_SIGN_IN(profile);
        const use = res.user;

        return { user: { ...use } };
      }
      return { ...account, ...profile, ...user };
    },

    async jwt({ token, user, profile, account }) {
      if (account && account.provider !== "google") {
        return { ...token, ...user };
      }
      const res = await GOOGLE_SIGN_IN(profile);
      const use = res.user;
      // @ts-expect-error
      user = use;

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
