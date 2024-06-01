import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center flex-wrap px-8 md:px-4  bg-no-repeat bg-cover bg-center bg-blend-darken"  style={{ backgroundImage: "url('/bgImage.jpg')"}} >
      <div className="w-full h-full flex flex-col justify-center items-start md:items-center">
        <p className="bg-gradient-to-r from-pink-500 to-violet-600 bg-clip-text text-transparent md:text-3xl text-xl font-bold tracking-tight text-balance">
          Dive into the Mystery-Unveil Your Secret Message Now!
        </p>
        <p className="text-white text-base md:text-lg mt-4">
          Discover the Thrill of Encrypted, Personalized Messaging - Secure,
          Exciting, and Just for You!
        </p>
        <div className="w-full flex justify-start md:justify-center gap-8  mt-8 md:mt-6">
          
          <Button asChild
            className="btn-default w-20 text-lg transition-all ease-in-out duration-300 
            hover:btn-hover  hover:-translate-y-1 hover:scale-110"
          >
            <Link href="sign-in">Login</Link>
          </Button>
          <Button
            className="btn-default text-lg transition-all ease-in-out 
            hover:btn-hover duration-300  hover:-translate-y-1 hover:scale-110"
          >
            Know more
          </Button>
        </div>
      </div>
    </div>
  );
}
