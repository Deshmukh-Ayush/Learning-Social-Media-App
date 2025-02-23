import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function Home() {
  return (
    <div>
      <h1>Simple Social Media Application</h1>
      <Button>
        <Link href="/register">Register</Link>
      </Button>
    </div>
  )
}