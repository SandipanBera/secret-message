"use client"

import { Button } from "@/components/ui/button"
import { signIn } from "next-auth/react"

function page() {

    
    
  return (
    <div>demo page
      <Button onClick={()=>signIn()}>sign in</Button>
    </div>
  )
}

export default page