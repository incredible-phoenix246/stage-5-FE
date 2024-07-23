"use client";

import * as Form from "../ui/form";
import * as z from "zod";
import { Input, Button, useToast } from "../ui";
import * as Card from "../ui/card";
import { LoginSchema } from "@/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useTransition } from "react";
import { Lock, Mail } from "lucide-react";
import Link from "next/link";
import { GoogleSignIn } from "./social";

const Login_Form = () => {
  const form = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const [isLoading, startTransition] = useTransition();
  return (
    <Card.Card className="w-full max-w-[476px]">
      <Card.CardHeader>
        <Card.CardTitle className="text-3xl">Login</Card.CardTitle>
        <Card.CardDescription>
          Add your details below to get back into the app
        </Card.CardDescription>
      </Card.CardHeader>
      <Card.CardContent className="grid gap-4">
        <Form.Form {...form}>
          <form
            action=""
            className="grid gap-[24px]"
            // onSubmit={form.handleSubmit(onSubmit)}
          >
            <Form.FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <Form.FormItem className="grid gap-2">
                  <Form.FormLabel htmlFor="email">Email address</Form.FormLabel>
                  <Form.FormControl>
                    <div className="relative flex w-full items-center">
                      <Input
                        {...field}
                        type="email"
                        id="email"
                        placeholder="e.g. alex@email.com"
                        className="pl-[36px]"
                      />
                      <span className="absolute left-2 h-4 w-4  sm:h-6 sm:w-6 sm:p-[2px]">
                        <Mail className="h-full w-full" size={16} />
                      </span>
                    </div>
                  </Form.FormControl>
                  <Form.FormMessage />
                </Form.FormItem>
              )}
            />
            <Form.FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <Form.FormItem className="grid gap-2">
                  <div className="flex items-center">
                    <Form.FormLabel htmlFor="password">Password</Form.FormLabel>
                    <Link
                      href="#"
                      className="ml-auto inline-block text-sm underline"
                    >
                      Forgot your password?
                    </Link>
                  </div>
                  <Form.FormControl>
                    <div className="relative flex w-full items-center">
                      <Input
                        {...field}
                        type="password"
                        id="password"
                        placeholder="Enter your password"
                        className="pl-[36px]"
                      />
                      <span className="absolute left-2 h-4 w-4  sm:h-6 sm:w-6 sm:p-[2px]">
                        <Lock className="h-full w-full" size={16} />
                      </span>
                    </div>
                  </Form.FormControl>
                  <Form.FormMessage />
                </Form.FormItem>
              )}
            />
            <Button type="submit" className="w-full">
              Login
            </Button>
          </form>
        </Form.Form>

        <GoogleSignIn />

        <div className="mt-4 text-center text-sm">
          Already have an account?{" "}
          <Link href="#" className="underline">
            Sign in
          </Link>
        </div>
      </Card.CardContent>
    </Card.Card>
  );
};

export { Login_Form };
