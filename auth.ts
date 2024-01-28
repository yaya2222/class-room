import NextAuth from "next-auth";

import authConfig from "@/auth.config";
import MongoClient from "@/lib/mogodb";
import { MongoDBAdapter } from "@auth/mongodb-adapter";
import { getUserById } from "./services/user";
import { IUserModel } from "./types/User";



export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth({
  adapter: MongoDBAdapter(MongoClient),
  secret: process.env.AUTH_SECRET,
  session: { strategy: "jwt" },
  callbacks: {
    async signIn({ user, account }) {
      if (account?.provider !== "credentials") return true;

      const existingUser: IUserModel = await getUserById(user.id as string);
      if (!existingUser.emailVerified) return false;
      return true;
    },

    async jwt({ token }) {
      if(!token.sub) return token

      const existingUser: IUserModel = await getUserById(token.sub);
      token.role=existingUser.role
      token.name=existingUser.name
      token.email=existingUser.email
      token.image=existingUser.image
      return token;
    },

    async session({ token, session }) {
      if(!session.user) return session
      if(token.sub){
        session.user.id=token.sub
      }
      
      if(token.role){
        session.user.role=token.role
      }
      
      return session
    }

  },
  ...authConfig,
});
