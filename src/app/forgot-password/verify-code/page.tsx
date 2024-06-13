"use client";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";

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
import { verifySchema } from "@/schemas/verifySchema";
import { useSearchParams } from "next/navigation";
import axios, { AxiosError } from "axios";
import { apiResponse } from "@/types/apiResponse";
import { useToast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function page() {
  const [submiting, setSubmiting] = useState(false);
  const form = useForm<z.infer<typeof verifySchema>>({
    resolver: zodResolver(verifySchema),
    defaultValues: {
      code: "",
    },
  });
  const searchParams = useSearchParams()
  const search = searchParams.get('email')
  const { toast } = useToast()
  const router=useRouter()
  const onSubmit =async (values: z.infer<typeof verifySchema>) => {
    setSubmiting(true);
    try {
      const response = await axios.post<apiResponse>(
        "/api/reset-code/verify-code",
        { email: search ,code:values.code}
      );
      toast({
        title: "Success",
        description: response.data.message,
      });
      router.push(`set-password?email=${search}`)
    } catch (error) {
        const axiosError = error as AxiosError<apiResponse>;
        toast({
                title: "Code Verification Failed",
                description: axiosError.response?.data.message || "There was a problem in verifying code. Please try again." ,
                variant: "destructive",
              });
        
    } finally {
      setSubmiting(false);
    }

  };
 

  return (
    <div className="flex justify-center items-center h-screen px-4">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <Card className="w-full max-w-md shadow-lg">
            <CardHeader className="space-y-2 text-center">
              <CardTitle className="text-2xl">
                Reset Code Verification
              </CardTitle>
              <CardDescription>
                Enter your reset code from email to
                verify your identity.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <FormField
                  control={form.control}
                  name="code"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Reset Code</FormLabel>
                      <FormControl>
                        <Input
                                  placeholder="123456"
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
              <Button className="w-full" type="submit" disabled={submiting}>
                Verify
              </Button>
            </CardFooter>
          </Card>
        </form>
      </Form>
    </div>
  );
}
