import { type RouterOutputs } from "~/trpc/react"
import { api } from "~/trpc/server"
import { type Community } from "@prisma/client"
import { type Project } from "@prisma/client"
import { notFound } from "next/navigation"
import Blob from "~/app/_components/Blob"

export default async function Community({params}:{params:{id:string}}) {
const { id } = params

let community: Community | null
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
    <div className="py-24 h-[85vh] place-content-center sm:py-32">
    <div className="mx-auto max-w-7xl px-6 lg:px-8">
      <div className="mx-auto flex justify-between w-full lg:mx-0">
        <div>
        <h2 className="text-pretty text-4xl font-semibold tracking-tight text-gray-900 sm:text-5xl">{community.name}</h2>
        <p className="mt-2 text-lg leading-8 text-textBrand">
          {community.sloganCommunity}
        </p>
        <div className="mt-4">       
          <Blob title={community.communityType}/>
        </div>
        </div>
        <div className="text-textBrand me-2">
        {community.aboutCommunity}
      </div>
      </div>
    
      <div className="mx-auto flex flex-col items-center sm:flex-row sm:justify-between mt-10 w-full gap-x-8 border-t border-gray-200 pt-8">
        <div className="flex flex-col sm:flex-row gap-y-4 sm:gap-x-2">
        <span className="flex flex-col sm:flex-row sm:border-e sm:hidden md:flex  sm:border-accentBrand sm:pe-2">
          <p className="sm:me-2 mb-2 sm:mb-0">Created:</p>
          {community.createdAt.toDateString()}
        </span>
        <span className="flex flex-col sm:flex-row sm:border-e sm:border-accentBrand sm:pe-2">
        <p className="sm:me-2 mb-2 sm:mb-0">Located in:</p>
          {community.locationCommunity}
        </span>
        <span className="flex flex-col sm:flex-row sm:border-e sm:hidden lg:flex sm:border-accentBrand sm:pe-2">
        <p className="sm:me-2 mb-2 sm:mb-0">Last Change:</p>
          {community.updatedAt.toDateString()}
        </span>
        <span className="flex flex-col sm:hidden lg:flex sm:flex-row sm:border-e sm:border-accentBrand sm:pe-2">
        <p className="sm:me-2 mb-2 sm:mb-0"># Members:</p>
          {community.numberOfMembers}
        </span>
        <span className="flex flex-col sm:flex-row">
        <p className="sm:me-2 mb-2 sm:mb-0">Contact Adress:</p>

        {
          community.ownerEmail
}
        </span>
        </div>
        <span className="bg-secondaryBrand text-white py-2 px-4 mt-4 sm:mt-0 hover:bg-secondaryBrand/50 rounded-full">
          Join Community
        </span>
      </div>
    </div>
  </div>
  )
}
