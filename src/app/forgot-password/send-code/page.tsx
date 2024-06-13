"use client";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { sendCodeSchema } from "@/schemas/sendResetCodeSchema";
import axios, { AxiosError } from "axios";
import { useState } from "react";
import { apiResponse } from "@/types/apiResponse";
import { useToast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";

export default function page() {
    const [submiting, setSubmiting] = useState(false);
  const { toast } = useToast()
  const router=useRouter()
  const form = useForm<z.infer<typeof sendCodeSchema>>({
    resolver: zodResolver(sendCodeSchema),
    defaultValues: {
      email: "",
    },
  });
  const onSubmit = async (values: z.infer<typeof sendCodeSchema>) => {
    setSubmiting(true);
    try {
      const response = await axios.post<apiResponse>(
        "/api/reset-code/send-code",
        { email: values.email }
      );
      toast({
        title: "Success",
        description: response.data.message,
      });
      router.push(`verify-code?email=${values.email}`)
    } catch (error) {
        const axiosError = error as AxiosError<apiResponse>;
        toast({
                title: "Code Send Failed",
                description: axiosError.response?.data.message || "There was a problem in sending code. Please try again." ,
                variant: "destructive",
              });
        
    } finally {
      setSubmiting(false);
    }
  };
  return (
    <div className="flex justify-center items-center h-screen px-4  ">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <Card className="shadow-lg">
            <CardHeader className="text-center">
              <CardTitle className="text-2xl">Reset your password</CardTitle>
              <CardDescription>
                Enter your email address to receive a password reset code.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email Address</FormLabel>
                      <FormControl>
                        <Input placeholder="m@example.com" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </CardContent>
            <CardFooter>
              <Button type="submit" className="w-full" disabled={submiting}>
                Send Reset Code
              </Button>
            </CardFooter>
          </Card>
        </form>
      </Form>
    </div>
  );
}
