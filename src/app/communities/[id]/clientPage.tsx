"use client";
import { useState } from "react";
import NewProjectModal from "~/app/_components/_projects/NewProjectModal";
import ProjectList from "~/app/_components/_projects/ProjectList";
import { useAuthContext } from "~/context/AuthContext";
import { type Prisma } from "@prisma/client";
import MeetingCalendar from "~/app/_components/_meetings/MeetingGrid";
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
  comments,
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
  if (isPrivate && !members.some((member) => member.id === user?.id)) {
    router.push("/communities");
  }

  const { mutate: deleteCommunity } =
    api.communities.deleteCommunity.useMutation({
      onSuccess: () => {
        setLoading(false);
        router.push("/communities");
      },
      onError: (error) => {
        setLoading(false);
        console.error(error);
      },
    });

  const handleDelete = () => {
    setLoading(true);
    deleteCommunity({
      id: id,
    });
  };

  return (
    <>
      {members.some((member) => member.id === user?.id) && (
        <>
          <section className="mt-12 space-y-10">
            {/* Members Section */}
            <div className="border-borderBrand rounded-2xl border bg-white p-6 shadow-sm transition hover:shadow-md">
              <h2 className="mb-4 text-xl font-bold text-accentBrand">
                Members
              </h2>
              <UserList members={members} ownerId={ownerId} />
            </div>

            {/* Projects Section */}
            <div className="border-borderBrand rounded-2xl border bg-white p-6 shadow-sm transition hover:shadow-md">
              <div className="mb-4 flex items-center justify-between">
                <h2 className="text-xl font-bold text-accentBrand">Projects</h2>
                <button
                  onClick={() => setProjectModalOpen(true)}
                  className="hover:bg-secondaryBrand/80 rounded-3xl bg-secondaryBrand px-6 py-2 text-sm font-semibold text-white"
                >
                  + Add Project
                </button>
              </div>
              <ProjectList projects={projects} />
            </div>

            {/* Meetings Section */}
            <div className="border-borderBrand rounded-2xl border bg-white p-6 shadow-sm transition hover:shadow-md">
              <h2 className="mb-4 text-xl font-bold text-accentBrand">
                Meetings
              </h2>
              <MeetingCalendar meetings={meetings} />
            </div>

            {/* Comments Section */}
            <div className="border-borderBrand rounded-2xl border bg-white p-6 shadow-sm transition hover:shadow-md">
              <h2 className="mb-4 text-xl font-bold text-accentBrand">
                Discussion
              </h2>
              <CommentSection
                comments={comments}
                onId={id}
                commentOn="community"
              />
            </div>

            {/* Owner Options */}
            {user?.id === ownerId && (
              <div className="border-borderBrand space-y-6 rounded-2xl border bg-white p-6 text-center shadow-sm transition hover:shadow-md">
                <h2 className="text-xl font-bold text-accentBrand">
                  Community Options
                </h2>
                <div className="flex flex-wrap justify-center gap-4">
                  <Link
                    href={`/communities/new?existing=${id}`}
                    className="hover:bg-secondaryBrand/80 rounded-3xl bg-secondaryBrand px-6 py-2 text-sm font-semibold text-white"
                  >
                    Update Community
                  </Link>
                 <button
  onClick={() => {
    if (typeof window !== "undefined") {
      const emailList = members
        .map((m) => m.email)
        .filter((email) => !!email)
        .join(",");
      if (emailList.length === 0) {
        alert("No member emails available.");
        return;
      }
      const subject = encodeURIComponent("Community Message");
      const mailtoLink = `mailto:${emailList}?subject=${subject}`;
      const a = document.createElement("a");
      a.href = mailtoLink;
      a.style.display = "none";
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    }
  }}
  className="hover:bg-secondaryBrand/80 rounded-3xl bg-secondaryBrand px-6 py-2 text-sm font-semibold text-white"
>
  Send Community Email
</button>




                  <button
                    onClick={handleDelete}
                    disabled={loading}
                    className="hover:bg-secondaryBrand/80 rounded-3xl bg-secondaryBrand px-6 py-2 text-sm font-semibold text-white"
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
