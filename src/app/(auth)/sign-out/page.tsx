"use client"
import { Button } from "@/components/ui/button";
import { signOut } from "next-auth/react";
import React from "react";
function page() {
  return (
    <div className="h-screen w-full">
      <Button
        onClick={() =>
          signOut({ callbackUrl: "http://localhost:3000/sign-in" })
        }
      >
        Sign out
      </Button>
    </div>
  );
}

export default page;
