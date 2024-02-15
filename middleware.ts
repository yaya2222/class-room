import { getToken } from "next-auth/jwt";
import { NextRequest } from "next/server";
import { DEFAULT_LOGIN_REDIRECT, apiAuthPrefix, authRoutes, protectedRoutes } from "@/route";

export default async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  
  const secret = process.env.AUTH_SECRET ? process.env.AUTH_SECRET : "";
  // @ts-ignore
    const token = await getToken({ req: req, secret });
    const isLogin = !!token

const isApiAuthRoutes = pathname.startsWith(apiAuthPrefix)
const isProtectedRoutes = !!protectedRoutes.find(path=>pathname.startsWith(path))

const isAuthRoutes = authRoutes.includes(pathname)
if(isApiAuthRoutes) return null

if(isAuthRoutes){
  if(isLogin){
    return Response.redirect(new URL(DEFAULT_LOGIN_REDIRECT,req.nextUrl))
  }
  return null
}

if(isProtectedRoutes){
  if(!isLogin){
    return Response.redirect(new URL("/auth/login",req.nextUrl))
  }
  return null
} 

  return null;
}

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
