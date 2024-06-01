"use client";
import React from "react";
import { Button } from "./ui/button";
import { signOut, useSession } from "next-auth/react";

function Navbar() {
  const { status } = useSession();
  return (
    <div className="w-full  backdrop-filter  backdrop-blur-md bg-opacity-30  flex p-3 items-center justify-between  shadow-lg border-b border-gray-600">
      <div className="text tracking-tighter font font-semibold text-2xl text-electric-violet-50">
        Secret Message
      </div>

      <Button
        onClick={() =>
          signOut({ callbackUrl: "http://localhost:3000/sign-in" })
        }
      >
        {status === "authenticated" ? "Sign Out" : "Sign In"}
      </Button>
    </div>
  );
}

export default Navbar;
