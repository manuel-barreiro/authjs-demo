import { auth } from "@/auth";
import LogoutButton from "@/components/logout-button";

export default async function page() {
  const session = await auth();

  return (
    <main className="min-h-screen flex flex-col justify-center gap-5 items-center">
      <p className="text-5xl text-blue-500 font-bold">Admin page ("/admin")</p>
      {session?.user?.role !== "admin" ? (
        <p className="text-5xl text-red-500 font-bold">You are not an admin!</p>
      ) : (
        <pre>
          <code>{JSON.stringify(session, null, 2)}</code>
        </pre>
      )}
      <LogoutButton />
    </main>
  );
}
