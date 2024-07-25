"use client";

import * as Form from "../ui/form";
import * as z from "zod";
import { Input, Button, useToast } from "../ui";
import * as Card from "../ui/card";
import { LoginSchema, RegisterSchema } from "@/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useState, useTransition } from "react";
import { Lock, Mail, User } from "lucide-react";
import Link from "next/link";
import { GoogleSignIn } from "./social";
import { OtpModal } from "../modals";
import { CreateNewUser, Login } from "@/app/action/auth";
import { useAppCtx } from "@/app/appcontext";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

const Login_Form = () => {
  const router = useRouter();
  const form = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const { toast } = useToast();
  const [isLoading, startTransition] = useTransition();
  const onSubmit = (values: z.infer<typeof LoginSchema>) => {
    startTransition(() => {
      Login(values).then(async (data) => {
        if (data.success) {
          const { email, password } = values;
          await signIn("credentials", {
            email,
            password,
            redirect: false,
          });
          router.push("/dashboard");
        }
        toast({
          title: data.success ? "Login successfully!" : "An error occured",
          description: data.success ? "Login successfully!" : `${data.error}`,
        });
      });
    });
  };
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
            onSubmit={form.handleSubmit(onSubmit)}
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
                        disabled={isLoading}
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
                      href=""
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
                        disabled={isLoading}
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
          Don&apos;t have an account?{" "}
          <Link href="/auth/signup" className="underline">
            Sign Up
          </Link>
        </div>
      </Card.CardContent>
    </Card.Card>
  );
};

const Sign_Up_Form = () => {
  const { setShowOtp } = useAppCtx();
  const [user, serUser] = useState<{
    email: string;
    id: string;
  }>();
  const { toast } = useToast();
  const form = useForm<z.infer<typeof RegisterSchema>>({
    resolver: zodResolver(RegisterSchema),
    defaultValues: {
      email: "",
      password: "",
      name: "",
      passwordConfirm: "",
    },
  });
  const [isLoading, startTransition] = useTransition();
  const onSubmit = (values: z.infer<typeof RegisterSchema>) => {
    startTransition(() => {
      CreateNewUser(values).then((data) => {
        toast({
          title: data.success
            ? "Registration successfully!"
            : "An error occured",
          description: `${data.message}`,
        });

        if (data.success) {
          setShowOtp(true);
          serUser({
            email: values.email,
            id: data.user_id!,
          });
        }
      });
    });
  };
  return (
    <Card.Card className="w-full max-w-[476px]">
      <Card.CardHeader>
        <Card.CardTitle className="text-3xl">Sign Up</Card.CardTitle>
        <Card.CardDescription>
          Enter your information to create an account
        </Card.CardDescription>
      </Card.CardHeader>
      <Card.CardContent className="grid gap-4">
        <Form.Form {...form}>
          <form
            action=""
            className="grid gap-[24px]"
            onSubmit={form.handleSubmit(onSubmit)}
          >
            <Form.FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <Form.FormItem className="grid gap-2">
                  <Form.FormLabel htmlFor="fullname">Full Name</Form.FormLabel>
                  <Form.FormControl>
                    <div className="relative flex w-full items-center">
                      <Input
                        {...field}
                        type="text"
                        id="fullname"
                        placeholder="e.g. john doe"
                        className="pl-[36px]"
                        disabled={isLoading}
                      />
                      <span className="absolute left-2 h-4 w-4  sm:h-6 sm:w-6 sm:p-[2px]">
                        <User className="h-full w-full" size={16} />
                      </span>
                    </div>
                  </Form.FormControl>
                  <Form.FormMessage />
                </Form.FormItem>
              )}
            />
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
                        disabled={isLoading}
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
                  <Form.FormLabel htmlFor="password">Password</Form.FormLabel>
                  <Form.FormControl>
                    <div className="relative flex w-full items-center">
                      <Input
                        {...field}
                        type="password"
                        id="password"
                        placeholder="Enter your password"
                        className="pl-[36px]"
                        disabled={isLoading}
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
            <Form.FormField
              control={form.control}
              name="passwordConfirm"
              render={({ field }) => (
                <Form.FormItem className="grid gap-2">
                  <div className="flex items-center">
                    <Form.FormLabel htmlFor="passwordConfirm">
                      Confirm your Password
                    </Form.FormLabel>
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
                        id="passwordConfirm"
                        placeholder="confirm your password"
                        className="pl-[36px]"
                        disabled={isLoading}
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
            <Button type="submit" className="w-full" disabled={isLoading}>
              Continue
            </Button>
          </form>
        </Form.Form>

        <GoogleSignIn />

        <div className="mt-4 text-center text-sm">
          Already have an account?{" "}
          <Link href="/auth/login" className="underline">
            Login
          </Link>
        </div>
      </Card.CardContent>
      {user && <OtpModal {...user} />}
    </Card.Card>
  );
};

export { Login_Form, Sign_Up_Form };
