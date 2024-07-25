import NextAuth, { type DefaultSession } from "next-auth";
import { User } from "@prisma/client";
import authConfig from "./auth.config";

export const {
  handlers: { GET, POST },
  auth,
  unstable_update,
} = NextAuth({
  ...authConfig,
  secret: process.env.AUTH_SECRET,
});

declare module "next-auth" {
  interface Session {
    user: {
      id: User["id"];
      name: User["name"];
      email: User["email"];
      image: User["image"];
      emailVerified: User["emailVerified"];
      createdAt: User["createdAt"];
      updatedAt: User["updatedAt"];
    } & DefaultSession["user"];
  }
}
