"use client";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import axios, { AxiosError } from "axios";
import { useState } from "react";
import { apiResponse } from "@/types/apiResponse";
import { useToast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";
import { forgotPasswordSchema } from "@/schemas/forgotPasswordSchema";
import { useSearchParams } from "next/navigation";

export default function page() {
  const [submiting, setSubmiting] = useState(false);
  const { toast } = useToast();
  const router = useRouter();
  const searchParams = useSearchParams();
  const search = searchParams.get("email");
  const form = useForm<z.infer<typeof forgotPasswordSchema>>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: {
      newPassword: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof forgotPasswordSchema>) => {
    setSubmiting(true);
    try {
      const response = await axios.post<apiResponse>("/api/forgot-password", {
        email: search,
        newPassword: values.newPassword,
      });
      toast({
        title: "Success",
        description: response.data.message,
      });
      router.replace("/sign-in");
    } catch (error) {
      const axiosError = error as AxiosError<apiResponse>;
      toast({
        title: "Code Send Failed",
        description:
          axiosError.response?.data.message ||
          "There was a problem in sending code. Please try again.",
        variant: "destructive",
      });
    } finally {
      setSubmiting(false);
    }
  };
  return (
    <div className="flex h-screen justify-center items-center p-4">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <Card className="w-full max-w-md shadow-lg">
            <CardHeader>
              <CardTitle>Change Password</CardTitle>
              <CardDescription>
                Enter your new password and confirm it below.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <FormField
                  control={form.control}
                  name="newPassword"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>New Password</FormLabel>
                      <FormControl>
                        <Input
                          type="password"
                          placeholder="Enter new password"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="space-y-2">
                <FormField
                  control={form.control}
                  name="confirmPassword"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Confirm Password</FormLabel>
                      <FormControl>
                        <Input
                          type="password"
                          placeholder="Confirm new password"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </CardContent>
            <CardFooter>
              <Button className="w-full" type="submit">
                Update Password
              </Button>
            </CardFooter>
          </Card>
        </form>
      </Form>
    </div>
  );
}
