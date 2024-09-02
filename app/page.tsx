import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col justify-center gap-5 items-center">
      <p className="text-5xl text-blue-500 font-bold">Root page ("/")</p>

      <Link href={"/login"}>
        <Button variant={"default"}>Login</Button>
      </Link>

      <Link href={"/register"}>
        <Button variant={"secondary"}>Register</Button>
      </Link>
    </main>
  );
}
