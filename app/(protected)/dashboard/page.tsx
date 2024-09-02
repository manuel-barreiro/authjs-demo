import { Button } from "@/components/ui/button";
import Link from "next/link";
import { auth } from "@/auth";
import LogoutButton from "@/components/logout-button";

export default async function Dashboard() {
  const session = await auth();

  if (!session) {
    return (
      <main className="min-h-screen flex flex-col justify-center gap-5 items-center">
        <p className="text-5xl text-blue-500 font-bold">
          Dashboard page ("/dashboard")
        </p>
        <p className="text-5xl text-red-500 font-bold">NOT AUTHENTICATED</p>
        <Link href={"/login"}>
          <Button variant={"default"}>Login</Button>
        </Link>

        <Link href={"/register"}>
          <Button variant={"secondary"}>Register</Button>
        </Link>
      </main>
    );
  }

  return (
    <main className="min-h-screen flex flex-col justify-center gap-5 items-center">
      <p className="text-5xl text-blue-500 font-bold">
        Dashboard page ("/dashboard")
      </p>

      <pre>
        <code>{JSON.stringify(session, null, 2)}</code>
      </pre>

      <LogoutButton />
    </main>
  );
}
