"use client";
import { useState } from "react";
import NewProjectModal from "~/app/_components/_projects/NewProjectModal";
import ProjectList from "~/app/_components/_projects/ProjectList";
import { useAuthContext } from "~/context/AuthContext";
import { type Prisma } from "@prisma/client";
import MeetingCalendar from "~/app/_components/_meetings/MeetingGrid";
import DeleteCommunity from "~/app/_components/_communities/DeleteCommunity";
import Link from "next/link";
import CommentSection from "~/app/_components/_comments/CommentSection";
import { api } from "~/trpc/react";
type ProjectWithRelations = Prisma.ProjectGetPayload<{
  include: {
    createdBy: {
      select: { firstName: true; lastName: true; email: true; id: true };
    };
    projectMembers: {
      select: { id: true; firstName: true; lastName: true; email: true };
    };
  };
}>;
import type { MemberOf } from "~/types/userTypes";
import UserList from "~/app/_components/_users/UserList";
import { useRouter } from "next/navigation";
type MeetingWithRelations = Prisma.MeetingGetPayload<{
  include: {
    createdBy: true;
    AssociatedProject: true;
  };
}>;
import type { CommentWithRelations } from "~/types/commentTypes";
export default function ClientPage({
  id,
  projects,
  meetings,
  members,
  ownerId,
  isPrivate,
  comments
}: {
  id: number;
  projects: ProjectWithRelations[];
  meetings: MeetingWithRelations[];
  members: MemberOf[];
  ownerId: string;
  isPrivate: boolean;
  comments: CommentWithRelations[];
}) {
  const router = useRouter();
  const { user } = useAuthContext();
  const [projectModalOpen, setProjectModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  if(isPrivate && !members.some((member) => member.id === user?.id)){
    router.push("/communities");
  }

  const {mutate:deleteCommunity} = api.communities.deleteCommunity.useMutation({
    onSuccess: () => {
      setLoading(false);
      router.push("/communities")
    },
    onError: (error) => {
      setLoading(false);
      console.error(error)
    }
  })

  const handleDelete = () => {
    setLoading(true);
    deleteCommunity({
      id: id
    })
  }

   return (
    <>
      {members.some((member) => member.id === user?.id) && (
        <>
  <section className="mt-12 space-y-10">
    {/* Members Section */}
    <div className="rounded-2xl border border-borderBrand bg-white p-6 shadow-sm hover:shadow-md transition">
      <h2 className="text-xl font-bold text-accentBrand mb-4">Members</h2>
      <UserList members={members} ownerId={ownerId} />
    </div>

    {/* Projects Section */}
    <div className="rounded-2xl border border-borderBrand bg-white p-6 shadow-sm hover:shadow-md transition">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold text-accentBrand">Projects</h2>
        <button
          onClick={() => setProjectModalOpen(true)}
          className="rounded-3xl bg-secondaryBrand px-6 py-2 text-sm font-semibold text-white hover:bg-secondaryBrand/80"
        >
          + Add Project
        </button>
      </div>
      <ProjectList projects={projects} />
    </div>

    {/* Meetings Section */}
    <div className="rounded-2xl border border-borderBrand bg-white p-6 shadow-sm hover:shadow-md transition">
      <h2 className="text-xl font-bold text-accentBrand mb-4">Meetings</h2>
      <MeetingCalendar meetings={meetings} />
    </div>

    {/* Comments Section */}
    <div className="rounded-2xl border border-borderBrand bg-white p-6 shadow-sm hover:shadow-md transition">
      <h2 className="text-xl font-bold text-accentBrand mb-4">Discussion</h2>
      <CommentSection comments={comments} onId={id} commentOn="community" />
    </div>

    {/* Owner Options */}
    {user?.id === ownerId && (
      <div className="rounded-2xl border border-borderBrand bg-white p-6 shadow-sm hover:shadow-md transition text-center space-y-6">
        <h2 className="text-xl font-bold text-accentBrand">Community Options</h2>
        <div className="flex flex-wrap justify-center gap-4">
          <Link
            href={`/communities/new?existing=${id}`}
            className="rounded-3xl bg-secondaryBrand px-6 py-2 text-sm font-semibold text-white hover:bg-secondaryBrand/80"
          >
            Update Community
          </Link>
            <button
            onClick={() => {
              const emailList = members.map(member => member.email).join(',');
              const subject = encodeURIComponent('Community Message');
              window.open(`mailto:${emailList}?subject=${subject}`, '_blank');
            }}
            className="rounded-3xl bg-secondaryBrand px-6 py-2 text-sm font-semibold text-white hover:bg-secondaryBrand/80"
            >
            Send Community Email
            </button>
          <button
            onClick={handleDelete}
            disabled={loading}
            className="rounded-3xl bg-secondaryBrand px-6 py-2 text-sm font-semibold text-white hover:bg-secondaryBrand/80"
          >
            {loading ? "Deleting..." : "Delete Community"}
          </button>
        </div>
      </div>
    )}
  </section>

  <NewProjectModal
    open={projectModalOpen}
    setOpen={setProjectModalOpen}
    communityId={id}
  />
</>
      )}
    </>
  );
}
