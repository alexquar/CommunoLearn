"use client";
import React from "react";
import { useState } from "react";
import NewMeetingModal from "~/app/_components/NewMeetingModal";
export default function ClientPage({
  projectId,
  communityId,
}: {
  projectId: number;
  communityId: number;
}) {
  const [meetingModalOpen, setMeetingModalOpen] = useState(false);
  return (
    <div>
      <button
        onClick={() => setMeetingModalOpen(true)}
        className="my-3 rounded-3xl bg-secondaryBrand px-10 py-3 text-white hover:bg-secondaryBrand/75"
      >
        Add Meeting
      </button>
      <NewMeetingModal
        open={meetingModalOpen}
        setOpen={setMeetingModalOpen}
        communityId={communityId}
        projectId={projectId}
      />
    </div>
  );
}
