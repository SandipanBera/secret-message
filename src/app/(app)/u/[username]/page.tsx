"use client";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { messageSchema } from "@/schemas/messageSchema";
import { toast } from "@/components/ui/use-toast";
import { useState } from "react";
import { Loader } from "lucide-react";
import axios, { AxiosError } from "axios";
import { apiResponse } from "@/types/apiResponse";
import { Sparkles } from "lucide-react";
import Hovercard from "@/components/HoverCard";
import { StreamingTextResponse } from "ai";
import { useChat } from 'ai/react';

export default function SendMessage({
  params,
}: {
  params: { username: string };
}) {
  const [isSending, setIsSending] = useState(false);
  const { messages, handleSubmit } = useChat();
  const [suggestMessages, setSuggestMessages] = useState([
    "Hey, I just wanted to let you know how much your friendship means to me. You’ve been a great support, and I appreciate you more than words can say.",
    "I admire your work ethic and dedication to the team. You inspire me to push myself harder and be a better professional. Keep up the great work!",
    "I’m sorry for the argument we had. I didn’t mean to hurt you, and I hope we can find a way to move past this. You mean the world to me.",
  ]);
  const form = useForm<z.infer<typeof messageSchema>>({
    resolver: zodResolver(messageSchema),
    defaultValues: {
      content: "",
    },
  });
  const { setValue } = form;

  async function onSubmit(data: z.infer<typeof messageSchema>) {
    setIsSending(true);
    try {
      const response = await axios.post<apiResponse>("/api/send-message", {
        content: data.content,
        username: params.username,
      });
      toast({
        title: "Successfull",
        description:
          response?.data?.message ?? "Message delivered successfully",
      });
    } catch (error) {
      const axiosError = error as AxiosError<apiResponse>;
      toast({
        title: "Error",
        description:
          axiosError?.response?.data?.message ?? "Something went wrong",
        variant: "destructive",
      });
    } finally {
      setIsSending(false);
    }
  }
  async function handleSuggestMessage() {
    setIsSending(true);
    try {
      const response = await axios.post<StreamingTextResponse>("/api/suggest-message")
      console.log(response);
      
    } catch (error) {
      const axiosError = error as AxiosError<any>;
      console.log(axiosError?.message);
      
    } finally {
      setIsSending(false);
    }
  }
  return (
    <div className="w-full max-w-lg mx-auto space-y-8 py-12 px-4 md:px-0">
      <div className="space-y-2">
        <h2 className="text-3xl font-bold">Send Message</h2>
        <p className="text-electric-violet-850 dark:text-gray-400">
          Share your thoughts securely and privately.Your identity will remain
          completely anonymous.
        </p>
      </div>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-full space-y-6"
        >
          <FormField
            control={form.control}
            name="content"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Message</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Enter your message"
                    className="resize-none"
                    rows={5}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" className="w-20" disabled={isSending}>
            {isSending ? <Loader className="animate-spin" /> : "Send"}
          </Button>
        </form>
      </Form>
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold">Suggested Message</h3>
          <Hovercard content="get suggested message from gpt">
            <Button
              variant="ghost"
              size="sm"
              className="hover:bg-electric-violet-200"
              onClick={handleSuggestMessage}
            >
              <Sparkles />
            </Button>
          </Hovercard>
        </div>
        <div className="grid grid-cols-1 gap-4 ">
          {suggestMessages.map((suggestMessage, index: number) => (
            <div
              className="rounded-md border border-gray-200 bg-gray-100 p-4 text-sm dark:border-gray-800 dark:bg-gray-800"
              key={index}
              onClick={(e) => setValue("content", suggestMessage)}
            >
              <p className="text-gray-500 dark:text-gray-400 cursor-pointer">
                {suggestMessage}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
