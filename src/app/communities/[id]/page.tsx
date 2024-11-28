import { api } from "~/trpc/server";
import { notFound } from "next/navigation";
import Blob from "~/app/_components/Blob";
import JoinCommunityButton from "~/app/_components/JoinCommunityButton";
import ClientPage from "./clientPage";
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
    <div className="place-content-center py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto flex w-full justify-between lg:mx-0">
          <div>
            <h2 className="text-4xl font-bold text-accentBrand sm:text-5xl">
              {community.name}
            </h2>
            <p className="mt-2 text-lg leading-8 text-textBrand">
              {community.sloganCommunity}
            </p>
            <div className="mt-4">
              <Blob title={community.communityType} />
            </div>
          </div>
          <div className="me-2 w-1/2 break-words text-right text-textBrand">
            {community.aboutCommunity}
          </div>
        </div>

        <div className="mx-auto mt-10 flex w-full flex-col items-center gap-x-8 border-y border-gray-200 py-8 sm:flex-row sm:justify-between">
          <div className="flex flex-col gap-y-4 sm:flex-row sm:gap-x-2">
            <span className="flex flex-col sm:hidden sm:flex-row sm:border-e sm:border-accentBrand sm:pe-2 md:flex">
              <p className="mb-2 sm:mb-0 sm:me-2">Created:</p>
              {community.createdAt.toDateString()}
            </span>
            <span className="flex flex-col sm:flex-row sm:border-e sm:border-accentBrand sm:pe-2">
              <p className="mb-2 sm:mb-0 sm:me-2">Located in:</p>
              {community.locationCommunity}
            </span>
            <span className="flex flex-col sm:hidden sm:flex-row sm:border-e sm:border-accentBrand sm:pe-2 lg:flex">
              <p className="mb-2 sm:mb-0 sm:me-2">Last Change:</p>
              {community.updatedAt.toDateString()}
            </span>
            <span className="flex flex-col sm:hidden sm:flex-row sm:border-e sm:border-accentBrand sm:pe-2 lg:flex">
              <p className="mb-2 sm:mb-0 sm:me-2"># Members:</p>
              {community.numberOfMembers}
            </span>
            {community.ownerEmail && (
              <span className="flex flex-col sm:flex-row">
                <p className="mb-2 sm:mb-0 sm:me-2">Contact Adress:</p>
                {community.ownerEmail}
              </span>
            )}
          </div>
          <JoinCommunityButton id={numericId} members={community.members} />
        </div>
        <ClientPage
          projects={community.projects}
          meetings={community.meetings}
          id={numericId}
          members={community.members}
          ownerId={community.createdBy.id}
        />
      </div>
    </div>
  );
}
