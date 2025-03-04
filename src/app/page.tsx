"use client"

import LogOutButton from "@/components/LogoutButton"
import { NavbarDemo } from "@/components/Navbar"


export default function Home() {
  return (
    <div>
    <div className="h-screen flex items-center justify-center flex-col">
      <NavbarDemo />
      <h1>Simple Social Media Application</h1>
      {/* <LogOutButton /> */}
    </div></div>
  )
}