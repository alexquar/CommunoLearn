"use client";
import React from "react";
import { useState } from "react";
import NewMeetingModal from "~/app/_components/NewMeetingModal";
import NewTodoModal from "~/app/_components/NewTodoModal";
import type { Prisma } from "@prisma/client";
type ProjectMembersShort = Prisma.UserGetPayload<{
  select: { id: true, firstName: true, lastName: true, email: true }
}>
export default function ClientPage({
  projectId,
  communityId,
  projectMembers,
}: {
  projectId: number;
  communityId: number;
  projectMembers: ProjectMembersShort[];
}) {
  const [meetingModalOpen, setMeetingModalOpen] = useState(false);
  const [todoModalOpen, setTodoModalOpen] = useState(false);
  return (
    <div>
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
    </div>
  );
}
