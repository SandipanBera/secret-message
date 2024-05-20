"use client";
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useToast } from "@/components/ui/use-toast";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { signInSchema } from "@/schemas/signInSchema";
import { signIn } from "next-auth/react";
function page() {
  const [isSubmiting, setIsSubmiting] = useState(false);
  const router = useRouter();
  const { toast } = useToast();
  const form = useForm<z.infer<typeof signInSchema>>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  async function onSubmit(values: z.infer<typeof signInSchema>) {
    setIsSubmiting(true);
    const data = await signIn("credentials", {
      identifier: values.username,
      password: values.password,
      redirect: false,
    });
    if (data?.error) {
      toast({
        title: "Failed to Sign In.",
        description: "Please make sure all the field fill up properly",
        variant: "destructive",
      });
    }
    if (data?.url) {
      // Redirect user to dashboard after successfully sign in
      router.replace(`/dashboard`);
    }
    setIsSubmiting(false);
  }

  return (
    <div className="flex justify-center items-center min-h-screen ">
      <div className="w-full max-w-md  space-y-8 shadow-lg rounded-lg bg-gradient-to-br from-purple-200 to-violet-300  p-8">
        <div>
        <h1 className="text-center text-4xl text-electric-violet-950 font-extrabold tracking-tight lg:text-5xl mb-6">Sign In Secret message</h1>
          <h1 className="mb-4 text-center text-electric-violet-600">The gateway of your anonymous journey</h1>
        </div>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel >Username</FormLabel>
                  <FormControl>
                    <Input placeholder="username" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel >Password</FormLabel>
                  <FormControl>
                    <Input type="password" placeholder="password" {...field} />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" disabled={isSubmiting} className="w-full btn-default">
              {isSubmiting ? (
                <>
                  {" "}
                  <Loader2 size={15} className="animate-spin mr-2" />
                  Please Wait...
                </>
              ) : (
                "Sign In"
              )}
            </Button>
          </form>
          <p className="font-normal text-center ">
            Don&apos;t have an account?{" "}
            <Link
              href="/sign-up"
              className="text-electric-violet-600 hover:text-electric-violet-800 underline"
            >
              Sign up
            </Link>
          </p>
        </Form>
      </div>
    </div>
  );
}

export default page;
