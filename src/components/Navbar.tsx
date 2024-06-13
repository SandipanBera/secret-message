"use client";
import React, { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { signOut, useSession } from "next-auth/react";
function Navbar() {
  const { status } = useSession();
  const [resize, setResize] = useState(false);
  const controlNavbar = () => {
    if (window.scrollY > 50) {
      setResize(true);
    } else {
      setResize(false)
    }
  };
  useEffect(() => {
    window.addEventListener("scroll", controlNavbar);
  }, []);

  return (
    <div
      className={`w-full  backdrop-filter  backdrop-blur-md bg-opacity-30 flex ${
        resize ? " p-3" : "p-5"
      } items-center justify-between  shadow-lg border-b border-gray-600 sticky top-0 transition-all ease-in-out duration-200`}
    >
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
