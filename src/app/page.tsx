import Link from "next/link";
import Error from "./_error";
import { LatestPost } from "~/app/_components/post";
import { getServerAuthSession } from "~/server/auth";
import { api, HydrateClient } from "~/trpc/server";

export default async function Home() {
  const hello = await api.post.hello({ text: "from tRPC" });
  const session = await getServerAuthSession();
  const error = true
  void api.post.getLatest.prefetch();
  await new Promise((resolve) => setTimeout(resolve, 1000));
  return (
    <HydrateClient>
      {error ? <Error redirectLink="/" redirectPlace="home" errorMessage="Could not fetch" statusCode={400} /> :
      <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c] text-white">
        to come
      </main>
      } 
    </HydrateClient>
  );
}
