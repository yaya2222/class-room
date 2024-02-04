import NextAuth, { type Session } from "next-auth";
import authConfig from "@/auth.config";
import MongoClient from "@/lib/mogodb";
import { MongoDBAdapter } from "@auth/mongodb-adapter";
import { getUserById } from "./services/user";
import { IUserModel } from "./types/User";
import { type JWT } from "next-auth/jwt";
import dbConnect from "./lib/db";



export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth({
  adapter: MongoDBAdapter(MongoClient),
  secret: process.env.AUTH_SECRET,
  session: { strategy: "jwt" },
//   jwt:{
// maxAge:10
//   },
  pages: {
    signIn: "/auth/login",
    // error: "/auth/login",
  },
  callbacks: {
    async signIn({ user, account }) {
      if (account?.provider !== "credentials") return true;
      await dbConnect()

      const existingUser: IUserModel = await getUserById(user.id as string);
      if (!existingUser.emailVerified) return false;
      return true;
    },

    async jwt({ token }) {
     await dbConnect()
      if (!token.sub) return token
      const existingUser: IUserModel|null = await getUserById(token.sub);
      if(!existingUser) return token
      token.role = existingUser.role
      token.name = existingUser.name
      token.email = existingUser.email
      token.image = existingUser.image
      return token;
    },

    async session({ session, token }: { session: Session; token?: JWT },) {
      
      if (!token) return session
      if (!session.user) return session
      if (token.sub) {
        session.user.id = token.sub
      }

      if (token.role) {
        session.user.role = token.role as boolean
      }

      return session
    }

  },
  ...authConfig,
});
