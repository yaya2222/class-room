import NextAuth, { DefaultSession } from "next-auth"
import { JWT } from "next-auth/jwt"
import type UserType from "./user"

export type SessionUser=DefaultSession["user"]&{
    role:boolean
    id:string
}

declare module "next-auth" {
    interface Session {
      user: SessionUser;
    }
  }
  