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

export default function Login() {
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
