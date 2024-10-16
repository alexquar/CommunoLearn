
import { getServerAuthSession } from "~/server/auth";
import { api, HydrateClient } from "~/trpc/server";
import { db } from "~/server/db";
export const dynamic = "force-dynamic";
import { signIn } from "next-auth/react";
import { signOut } from "next-auth/react";
import { useSession } from "next-auth/react";

export default async function Home() {
  const hello = await api.post.hello({ text: "from tRPC" });
  const session = await getServerAuthSession();
  const error = true
  void api.post.getLatest.prefetch();
  await new Promise((resolve) => setTimeout(resolve, 1000));
  const Users = await db.user.findMany();

  return (
    <HydrateClient>
      <main className="flex min-h-screen flex-col items-center justify-center">
       <>
        {Users.map((user) => (
          <div key={user.id}>{user.email}</div>
        ))}
       </>
      </main>
    </HydrateClient>
  );
}
