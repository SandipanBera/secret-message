"use client";

import { apiResponse } from "@/types/apiResponse";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDebounceCallback } from "usehooks-ts";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import axios, { AxiosError } from "axios";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { signUpSchema } from "@/schemas/signUpSchema";
import { signIn } from "next-auth/react";
import { FcGoogle } from "react-icons/fc";
import { Checkbox } from "@/components/ui/checkbox";

export default function SignUpForm() {
  const [username, setUsername] = useState("");
  const [usernameMessage, setUsernameMessage] = useState("");
  const [isCheckingUsername, setIsCheckingUsername] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const debouncedUsername = useDebounceCallback(setUsername, 300);

  const router = useRouter();
  const { toast } = useToast();

  const form = useForm<z.infer<typeof signUpSchema>>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
    },
  });

  useEffect(() => {
    const checkUsernameUnique = async () => {
      if (username) {
        setIsCheckingUsername(true);

        try {
          setUsernameMessage(""); // Reset message
          const response = await axios.get<apiResponse>(
            `/api/check-username-unique?username=${username}`
          );
          setUsernameMessage(response.data.message);
        } catch (error) {
          const axiosError = error as AxiosError<apiResponse>;
          setUsernameMessage(
            axiosError.response?.data.message ?? "Error checking username"
          );
        } finally {
          setIsCheckingUsername(false);
        }
      }
    };
    checkUsernameUnique();
  }, [username]);

  const onSubmit = async (data: z.infer<typeof signUpSchema>) => {
    console.log(data)
    // setIsSubmitting(true);
    // try {
    //   const response = await axios.post<apiResponse>("/api/sign-up", data);

    //   toast({
    //     title: "Success",
    //     description: response.data.message,
    //   });

    //   router.replace(`/verify/${username}`);

    //   setIsSubmitting(false);
    // } catch (error) {
    //   console.error("Error during sign-up:", error);

    //   const axiosError = error as AxiosError<apiResponse>;

    //   // Default error message
    //   let errorMessage = axiosError.response?.data.message;
    //   ("There was a problem with your sign-up. Please try again.");

    //   toast({
    //     title: "Sign Up Failed",
    //     description: errorMessage,
    //     variant: "destructive",
    //   });

    //   setIsSubmitting(false);
    // }
  };

  return (
    <div className="flex justify-center items-center min-h-screen ">
      <div className="w-full max-w-md gradient-bg-violet p-6 space-y-6 mx-4 md:mx-auto rounded-lg shadow-md">
        <div className="text-center">
          <h1 className="text-4xl font-extrabold text-electric-violet-950 tracking-tight lg:text-5xl mb-6">
            Join Secret Message
          </h1>
          <p className="mb-2 text-electric-violet-600">
            Sign up to start your anonymous adventure
          </p>
        </div>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              name="username"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Username</FormLabel>
                  <Input
                    {...field}
                    onChange={(e) => {
                      field.onChange(e);
                      debouncedUsername(e.target.value);
                    }}
                  />
                  {isCheckingUsername && <Loader2 className="animate-spin" />}
                  {!isCheckingUsername && usernameMessage && (
                    <p
                      className={`text-sm ${
                        usernameMessage === "username is unique"
                          ? "text-green-500"
                          : "text-red-500"
                      }`}
                    >
                      {usernameMessage}
                    </p>
                  )}
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="email"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <Input {...field} name="email" />
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              name="password"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <Input type="password" {...field} name="password" />
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="w-full" disabled={isSubmitting}>
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Please wait
                </>
              ) : (
                "Sign Up"
              )}
            </Button>
          </form>
        </Form>
        <div className="flex items-center space-x-2">
          <hr className="flex-grow border-zinc-200 dark:border-zinc-700" />
          <span className="text-white dark:text-zinc-300 text-sm">OR</span>
          <hr className="flex-grow border-zinc-200 dark:border-zinc-700" />
        </div>
        <Button
          className="w-full bg-[#4285F4] text-white py-5"
          variant="primary"
          onClick={() => {
            signIn("google");
          }}
        >
          <div className="flex items-center justify-center gap-5 ">
          <FcGoogle size={30} />
            Login with Google
          </div>
        </Button>
        <div className="text-center mt-4">
          <p>
            Already a member?{" "}
            <Link
              href="/sign-in"
              className="text-electric-violet-600 hover:text-electric-violet-800 underline"
            >
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
