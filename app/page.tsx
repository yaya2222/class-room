"use client"
import { signIn } from "next-auth/react"
import { redirect } from "next/navigation"

export default function Home() {
return redirect("/auth/login")
}
