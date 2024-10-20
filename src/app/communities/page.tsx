import { api } from "~/trpc/server"

export default async function Communities() {
  const {communities} = await api.communities.getCommunities()

  return (
   <>
    {(communities).map((community) => (
      <div key={community.id}>
        <h2>{community.name}</h2>
        <p>{community.aboutCommunity}</p>
      </div>
    ))}
   </>
  )
}
