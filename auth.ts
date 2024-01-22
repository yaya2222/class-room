import NextAuth from "next-auth";

import authConfig from "@/auth.config";
import MongoClient from "@/lib/mogodb"
import { MongoDBAdapter } from "@auth/mongodb-adapter";


export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth({
    adapter:MongoDBAdapter(MongoClient),
    session:{ strategy:"jwt"},
  ...authConfig,
});
