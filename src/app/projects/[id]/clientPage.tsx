"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { api } from "~/trpc/react";
import { useAuthContext } from "~/context/AuthContext";
import NewMeetingModal from "~/app/_components/NewMeetingModal";
import NewTodoModal from "~/app/_components/NewTodoModal";
import NewProjectModal from "~/app/_components/NewProjectModal";
import type { Project } from "@prisma/client";
import type { Prisma } from "@prisma/client";

type ProjectMembersShort = Prisma.UserGetPayload<{
  select: { id: true; firstName: true; lastName: true; email: true };
}>;

export default function ClientPage({
  projectId,
  project,
  communityId,
  projectMembers,
  isPrivate,
}: {
  projectId: number;
  project: Project;
  communityId: number;
  projectMembers: ProjectMembersShort[];
  isPrivate: boolean;
}) {
  const router = useRouter();
  const { user } = useAuthContext();

  const [meetingModalOpen, setMeetingModalOpen] = useState(false);
  const [todoModalOpen, setTodoModalOpen] = useState(false);
  const [editProjectModalOpen, setEditProjectModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const userIsMember = projectMembers.some((member) => member.id === user?.id);

  const { mutate: deleteProject } = api.projects.deleteProjectById.useMutation({
    onSuccess: () => {
      setLoading(false);
      router.push(`/communities/${communityId}`);
    },
    onError: (error) => {
      setLoading(false);
      console.error(error);
    },
  });

  const handleDelete = () => {
    setLoading(true);
    deleteProject({ id: projectId });
  };

  if (isPrivate && !userIsMember) {
    router.push("/communities");
  }

  return (
    <div className="border-t border-borderBrand pt-10">
      {!userIsMember ? (
        <p className="text-center text-textBrand text-lg">
          Join this project to make changes.
        </p>
      ) : (
        <>
          <h2 className="text-2xl font-bold text-accentBrand text-center mb-6">
            Manage This Project
          </h2>
          <div className="flex flex-wrap justify-center gap-4">
            <button
              onClick={() => setEditProjectModalOpen(true)}
              className="rounded-3xl bg-secondaryBrand px-6 py-2 text-white font-medium hover:bg-secondaryBrand/75"
            >
              Edit Project
            </button>
            <button
              onClick={handleDelete}
              className="rounded-3xl bg-secondaryBrand px-6 py-2 text-white font-medium hover:bg-secondaryBrand/75"
            >
              {loading ? "Deleting..." : "Delete Project"}
            </button>
            {!project.done && (
              <>
                <button
                  onClick={() => setMeetingModalOpen(true)}
                  className="rounded-3xl bg-secondaryBrand px-6 py-2 text-white font-medium hover:bg-secondaryBrand/75"
                >
                  Add Meeting
                </button>
                <button
                  onClick={() => setTodoModalOpen(true)}
                  className="rounded-3xl bg-secondaryBrand px-6 py-2 text-white font-medium hover:bg-secondaryBrand/75"
                >
                  Add Todo
                </button>
              </>
            )}
          </div>

          {/* Modals */}
          <NewMeetingModal
            open={meetingModalOpen}
            setOpen={setMeetingModalOpen}
            communityId={communityId}
            projectId={projectId}
          />
          <NewTodoModal
            open={todoModalOpen}
            setOpen={setTodoModalOpen}
            projectId={projectId}
            projectMembers={projectMembers}
          />
          <NewProjectModal
            open={editProjectModalOpen}
            setOpen={setEditProjectModalOpen}
            isEdit
            communityId={communityId}
            name={project.title}
            description={project.description ?? ""}
            completion={project.endDate?.toISOString() ?? ""}
            projectStage={project.stage}
            projectId={projectId}
            doneProp={project.done}
          />
        </>
      )}
    </div>
  );
}
