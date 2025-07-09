import { api } from "~/trpc/server";
import { notFound } from "next/navigation";
import Blob from "~/app/_components/Blob";
import JoinCommunityButton from "~/app/_components/JoinCommunityButton";
import ClientPage from "./clientPage";
import DeleteCommunity from "~/app/_components/DeleteCommunity";
import Link from "next/link";
import Image from "next/image";
//this component will need to be switched to client
export default async function Community({
  params,
}: {
  params: { id: string };
}) {
  const { id } = params;
  // const [newProject, setNewProject] = useState(false);
  const numericId = Number(id);
  if (isNaN(numericId)) {
    return notFound();
  }
  //switch to get with everything
  const community = await api.communities.getCommunityWithRelations({
    id: numericId,
  });
  console.log(community);
  
  if (!community) {
    return notFound();
  }

  return (
    <div className="place-content-center py-10 md:py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto flex w-full justify-between lg:mx-0">
          <div>
            <div className="flex flex-col-reverse sm:flex-row sm:items-center sm:gap-4">
              {community.icon &&
              <Image
              className="h-16 w-16 rounded-full border border-primaryBrand
              sm:h-20 sm:w-20"
              src={community.icon ? String(community.icon) : "/default-community-icon.png"}
              alt="Community Icon"
              width={80}
              height={80}
              />
}
              <h2 className="mt-4 sm:mt-0 text-4xl font-bold text-accentBrand sm:text-5xl">
              {community.name}
              </h2>
            </div>
            <p className="mt-4 text-lg leading-8 text-textBrand">
              {community.sloganCommunity}
            </p>
            <div className="mt-4">
              <Blob title={community.communityType} />
            </div>
            <div className="mt-4 text-textBrand">
            {community.aboutCommunity}
          </div>
          </div>
  
        </div>

        <div className="mx-auto mt-4 flex w-full lg:items-cennter flex-col items-start gap-y-8 gap-x-8 border-y border-gray-200 py-8 lg:flex-row">
          <div className="flex flex-col gap-y-4 lg:flex-row sm:gap-x-2">
            <span className="flex flex-row lg:border-e border-accentBrand pe-2 ">
              <p className="mb-2 sm:mb-0 me-2">Created: </p>
              {community.createdAt.toDateString()}
            </span>
            <span className="flex flex-row lg:border-e border-accentBrand pe-2">
              <p className="mb-2 sm:mb-0 me-2">Located in: </p>
              {community.locationCommunity}
            </span>
            <span className="flex  flex-row lg:border-e border-accentBrand pe-2">
              <p className="mb-2 sm:mb-0 me-2">Last Change: </p>
              {community.updatedAt.toDateString()}
            </span>
            <span className="flex flex-row lg:border-e border-accentBrand pe-2">
              <p className="mb-2 sm:mb-0 me-2"># Members: </p>
              {community.numberOfMembers}
            </span>
  
              <span className="flex flex-row">
                <p className="mb-2 sm:mb-0 me-2">Contact Adress:</p>
                {community.ownerEmail ?? "No Address"}
              </span>
        
          </div>
          <JoinCommunityButton id={numericId} members={community.members} />
         
        </div>
        <ClientPage
          projects={community.projects}
          meetings={community.meetings}
          id={numericId}
          members={community.members}
          ownerId={community.createdBy.id}
          isPrivate={community.private}
          comments={community.Comments}
        />

      </div>
    </div>
  );
}
