"use client"

import { signOut } from "next-auth/react"

export default function LogoutButton() {
  
  const onClick = ()=>{
    signOut()
  }
  return (
    <div>
      <button onClick={onClick}>logout</button>
    </div>
  )
}
