import { type RouterOutputs } from "~/trpc/react"
import { api } from "~/trpc/server"
type Community = RouterOutputs['communities']['getCommunity']
import { notFound } from "next/navigation"

export default async function Community({params}:{params:{id:string}}) {
const { id } = params

let community: Community | undefined
const numericId = Number(id)
if (isNaN(numericId)) {
    return notFound()
} else {
    community = await api.communities.getCommunity({ id: numericId })
    if(!community){
        return notFound()
    }
}

  return (
    <div>
        {community && 
        <h1>{community.name}</h1>
}
    </div>
  )
}
