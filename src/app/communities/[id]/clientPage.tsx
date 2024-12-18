"use client";
import { useState } from "react";
import NewProjectModal from "~/app/_components/NewProjectModal";
import ProjectList from "~/app/_components/ProjectList";
import { useAuthContext } from "~/context/AuthContext";
import { type Prisma } from "@prisma/client";
import MeetingCalendar from "~/app/_components/MeetingGrid";
import DeleteCommunity from "~/app/_components/DeleteCommunity";
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
import UserList from "~/app/_components/UserList";
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
          <div>
            <section className="my-8">
              <h1 className="text-2xl font-bold text-accentBrand">Members</h1>
              <div className="mb-8 w-full">
                <UserList members={members} ownerId={ownerId} />
              </div>
              <h1 className="text-2xl font-bold text-accentBrand">Projects</h1>
              <ProjectList projects={projects} />
              <button
                onClick={() => setProjectModalOpen(true)}
                className="my-3 rounded-3xl bg-secondaryBrand px-10 py-3 text-white hover:bg-secondaryBrand/75"
              >
                Add Project
              </button>
            </section>

            <section className="my-8">
              <h1 className="mb-8 text-2xl font-bold text-accentBrand">
                Meetings
              </h1>
              <MeetingCalendar meetings={meetings} />
            </section>
            <CommentSection
              comments={comments}
              onId = {id}
              commentOn="community"
              />
        {user?.id === ownerId &&
        <>
            <div className="flex justify-center flex-row">
        <h1 className="mt-12 text-center text-2xl font-bold text-accentBrand">
            Community Options
          </h1>
        </div>
        
        <div className="mx-auto flex flex-row justify-center gap-x-8 mt-8">
         <DeleteCommunity id={id} ownerId={ownerId} />              
         <Link href={`/communities/new?existing=${id}`} className="py-3 text-center px-10 rounded-3xl text-white bg-secondaryBrand hover:bg-secondaryBrand/75">
            Update Community
         </Link> 
         <button onClick={handleDelete}  className="py-3 text-center px-10 rounded-3xl text-white bg-secondaryBrand hover:bg-secondaryBrand/75">
            {loading ? "Deleting Community..." : "Delete Community"}
         </button> 
         </div>          
          </>}
          </div>
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
