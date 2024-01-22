"use client"

import { signIn } from "next-auth/react"

export default function Home() {

  const onClick = (provider: "google" | "github") => {
    signIn(provider)
  }
  return (
    <>
  <div>Home page</div>
  <button onClick={() => onClick("google")}>Google</button>
  <button onClick={() => onClick("github")}>Githab</button>
    </>
  );
}
