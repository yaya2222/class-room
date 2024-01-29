import NextAuth from "next-auth"
import authConfig from "@/auth.config"
import { DEFAULT_LOGIN_REDIRECT, adminRoutes, apiAuthPrefix, authRoutes, publicRoutes } from "@/route"

const {auth}= NextAuth(authConfig)

export default auth(async (req) => {
const {nextUrl} = req
const {pathname} = nextUrl
const isLogin = !!req.auth
const isApiAuthRoutes = nextUrl.pathname.startsWith(apiAuthPrefix)
const isPublicRoutes = publicRoutes.includes(pathname)
const isAuthRoutes = authRoutes.includes(pathname)
if(isApiAuthRoutes) return null

if(isAuthRoutes){
    if(isLogin){
        return Response.redirect(new URL(DEFAULT_LOGIN_REDIRECT,nextUrl))
    }
    return null
}



if(!isLogin&&!isPublicRoutes){
    return Response.redirect(new URL("/auth/login",nextUrl))
}
return null
})





export const config = {
    matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
}