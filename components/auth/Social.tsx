"use client"

import { signIn } from "next-auth/react";
import { FcGoogle } from "react-icons/fc";
import { IoLogoGithub } from "react-icons/io";


export default function Social() {


const onClick=(provider: "google" | "github")=>{
signIn(provider)
}

  return (
    <div className="space-y-2">
      <button onClick={()=>onClick("google")} className="inline-flex items-center justify-center gap-2 border shadow-md w-full py-2 hover:bg-gray-100 ">
        <FcGoogle className="w-8 h-8"/>
        <span className="font-semibold">Google</span>
      </button>
      <button onClick={()=>onClick("github")} className="inline-flex items-center justify-center gap-2 border shadow-md w-full py-2 hover:bg-gray-100 ">
        <IoLogoGithub className="w-8 h-8"/>
        <span className="font-semibold">GitHab</span>
      </button>
    </div>
  )
}
