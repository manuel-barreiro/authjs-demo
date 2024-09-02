"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { loginSchema } from "@/lib/zod-schemas";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { loginAction } from "@/actions/auth-actions";
import { useState, useTransition } from "react";
import GoogleLoginButton from "../login-google-button";

interface FormLoginProps {
  isVerified: boolean;
  OAuthAccountNotLinked: boolean;
}
export default function LoginForm({
  isVerified,
  OAuthAccountNotLinked,
}: FormLoginProps) {
  const [error, setError] = useState<string | null>("");
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onLogin(values: z.infer<typeof loginSchema>) {
    setError(null);
    startTransition(async () => {
      const login = await loginAction(values);
      if (login.error) {
        setError(login.error);
      } else {
        router.push("/dashboard");
      }
    });
  }

  return (
    <section className="min-h-screen flex justify-center items-center">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onLogin)}
          className="space-y-6 p-6 border rounded-lg shadow-lg w-auto min-w-96"
        >
          <p className="font-bold text-2xl">Log in to your account</p>
          {isVerified && (
            <p className="text-green-500">
              Email verified, log into your account.
            </p>
          )}
          {OAuthAccountNotLinked && (
            <p className="text-red-500">
              To confirm your identity, sign in with the same account you used
              originally.
            </p>
          )}
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder="john@doe.com" {...field} />
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
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input type="password" placeholder="Password" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {error && <FormMessage>{error}</FormMessage>}
          <Button type="submit" className="w-full" disabled={isPending}>
            Log in
          </Button>
          <GoogleLoginButton />
          <FormDescription>
            Don't have an account?{" "}
            <Link href={"/register"} className="text-blue-500">
              Register
            </Link>
          </FormDescription>
        </form>
      </Form>
    </section>
  );
}
