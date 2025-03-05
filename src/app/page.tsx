"use client"

import LogOutButton from "@/components/LogoutButton"



export default function Home() {
  return (
    <div>
    <div className="h-screen flex items-center justify-center flex-col">
      <h1>Simple Social Media Application</h1>
      <LogOutButton />
    </div></div>
  )
}