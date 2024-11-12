"use client";
import { useState } from "react";
import NewProjectModal from "~/app/_components/NewProjectModal";
import ProjectList from "~/app/_components/ProjectList";

import { type Prisma } from "@prisma/client";
import MeetingCalendar from "~/app/_components/MeetingCalendar";

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

type MeetingWithRelations = Prisma.MeetingGetPayload<{
  include: {
    createdBy: true;
    AssociatedProject: true;
  };
}>;

export default function ClientPage({
  id,
  projects,
  meetings,
}: {
  id: number;
  projects: ProjectWithRelations[];
  meetings: MeetingWithRelations[];
}) {
  const [projectModalOpen, setProjectModalOpen] = useState(false);
  return (
    <>
      <div>
        <section className="my-8">
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
          <h1 className="text-2xl font-bold text-accentBrand">Meetings</h1>
          <MeetingCalendar />
        </section>

      </div>
      <NewProjectModal
        open={projectModalOpen}
        setOpen={setProjectModalOpen}
        communityId={id}
      />
    </>
  );
}
