import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function Home() {
  return (
    <div className="h-screen flex items-center justify-center flex-col">
      <h1>Simple Social Media Application</h1>
      <Button>
        <Link href="/register">Register</Link>
      </Button>
    </div>
  )
}