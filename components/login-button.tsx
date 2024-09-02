"use client";
import { signIn } from "next-auth/react";
import { Button } from "./ui/button";

export function SignIn() {
  return (
    <Button onClick={() => signIn("credentials", { redirectTo: "/dashboard" })}>
      Log In
    </Button>
  );
}
