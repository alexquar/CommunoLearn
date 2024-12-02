"use client";
import React from "react";
import { useState } from "react";
import NewMeetingModal from "~/app/_components/NewMeetingModal";
import NewTodoModal from "~/app/_components/NewTodoModal";
import type { Prisma } from "@prisma/client";
import { useAuthContext } from "~/context/AuthContext";
import NewProjectModal from "~/app/_components/NewProjectModal";
import { type Project } from "@prisma/client";
import { useRouter } from "next/navigation";
import { api } from "~/trpc/react";
type ProjectMembersShort = Prisma.UserGetPayload<{
  select: { id: true; firstName: true; lastName: true; email: true };
}>;
export default function ClientPage({
  projectId,
  project,
  communityId,
  projectMembers,
  isPrivate
}: {
  projectId: number;
  project: Project;
  communityId: number;
  projectMembers: ProjectMembersShort[];
  isPrivate: boolean;
}) {
  const router = useRouter()
  const { user } = useAuthContext()
  const [meetingModalOpen, setMeetingModalOpen] = useState(false)
  const [todoModalOpen, setTodoModalOpen] = useState(false)
  const [editProjectModalOpen, setEditProjectModalOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  if(isPrivate && !projectMembers.some((member) => member.id === user?.id)){
    router.push("/communities")
  }

  const {mutate:deleteProject} = api.projects.deleteProjectById.useMutation({
    onSuccess: () => {
      setLoading(false)
      router.push(`/communities/${communityId}`)
    },
    onError: (error) => {
      setLoading(false)
      console.error(error)
    }
  })
  const handleDelete = () => {
    setLoading(true)
    deleteProject({
      id: projectId
    })
  }
  return (
    <>
      {!projectMembers.some((member) => member.id === user?.id) ? (
        <div className="mx-auto text-textBrand">Join this project to make changes</div>
      ) : (
        <>
          <h1 className="mt-12 text-center text-2xl font-bold text-accentBrand">
            Update this Project
          </h1>
          <div className="flex flex-row justify-center gap-x-4">
          <button
              onClick={() => setEditProjectModalOpen(true)}
              className="my-3 rounded-3xl bg-secondaryBrand px-10 py-3 text-white hover:bg-secondaryBrand/75"
            >
              Edit Project
            </button>
            <button
              onClick={handleDelete}
              className="my-3 rounded-3xl bg-secondaryBrand px-10 py-3 text-white hover:bg-secondaryBrand/75"
            >
              {loading ? "Deleting Project..." : "Delete Project"}
            </button>
            {!project.done && (
              <>
            <button
              onClick={() => setMeetingModalOpen(true)}
              className="my-3 rounded-3xl bg-secondaryBrand px-10 py-3 text-white hover:bg-secondaryBrand/75"
            >
              Add Meeting
            </button>

            <button
              onClick={() => setTodoModalOpen(true)}
              className="my-3 rounded-3xl bg-secondaryBrand px-10 py-3 text-white hover:bg-secondaryBrand/75"
            >
              Add todo
            </button>
            </>
            )
}
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
              description={project?.description ?? ""}
              completion={project?.endDate?.toISOString() ?? ""}
              projectStage={project.stage}
              projectId={projectId}
              doneProp={project.done}
              />
          </div>
        </>
      )}
    </>
  );
}
