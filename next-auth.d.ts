import NextAuth, { DefaultSession } from "next-auth"

export type SessionUser=DefaultSession["user"]&{
    role:boolean
    id:string
}

declare module "next-auth" {
    interface Session {
      user: SessionUser;
    }
  }
  