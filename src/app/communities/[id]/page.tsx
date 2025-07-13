import { api } from "~/trpc/server";
import { notFound } from "next/navigation";
import Blob from "~/app/_components/Blob";
import JoinCommunityButton from "~/app/_components/JoinCommunityButton";
import ClientPage from "./clientPage";
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
<div className="py-10 md:py-16">
  <div className="mx-auto max-w-6xl px-6 lg:px-8 space-y-10">
    {/* Header + Hero */}
    <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:gap-8">
      {community.icon && (
        <Image
          className="h-20 w-20 rounded-full border border-primaryBrand"
          src={String(community.icon)}
          alt="Community Icon"
          width={80}
          height={80}
        />
      )}
      <div>
        <h1 className="text-4xl font-bold text-accentBrand sm:text-5xl">
          {community.name}
        </h1>
        <p className="mt-2 text-lg text-textBrand">
          {community.sloganCommunity}
        </p>
        <div className="mt-3">
          <Blob title={community.communityType} />
        </div>
      </div>
    </div>

    {/* Description Card */}
    <div className="rounded-2xl border border-borderBrand bg-white p-6 shadow-sm hover:shadow-md transition">
      <p className="text-base text-textBrand leading-relaxed">
        {community.aboutCommunity}
      </p>
    </div>

    {/* Info & Join */}
    <div className="rounded-2xl border border-borderBrand bg-white p-6 shadow-sm hover:shadow-md transition flex flex-col justify-between gap-6 lg:flex-row lg:items-center">
      <div className="grid grid-cols-1 gap-4 text-sm text-textBrand sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        <div>
          <strong className="mr-1">Created:</strong>
          {community.createdAt.toDateString()}
        </div>
        <div>
          <strong className="mr-1">Location:</strong>
          {community.locationCommunity}
        </div>
        <div>
          <strong className="mr-1">Last Change:</strong>
          {community.updatedAt.toDateString()}
        </div>
        <div>
          <strong className="mr-1"># Members:</strong>
          {community.numberOfMembers}
        </div>
        <div>
          <strong className="mr-1">Contact:</strong>
          {community.ownerEmail ?? "No Address"}
        </div>
      </div>
      <JoinCommunityButton id={numericId} members={community.members} />
    </div>

    {/* Core Interaction Section */}
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
