"use client";
import {useState} from "react";
import type { Project, Meeting } from "@prisma/client";
import MeetingCard from "~/app/_components/MeetingCard";
import NewProjectModal from "~/app/_components/NewProjectModal";
import ProjectList from "~/app/_components/ProjectList";
export default function ClientPage({
  id,
  projects,
  meetings,
}: {
  id: number;
  projects: Project[];
  meetings: Meeting[];
}) {
    const [projectModalOpen, setProjectModalOpen] = useState(false);
  return (
    <>
    <div>
    <section>
      <ProjectList projects={projects} />
      <button onClick={()=>setProjectModalOpen(true)} className="text-white my-3 rounded-3xl bg-secondaryBrand hover:bg-secondaryBrand/75 px-10 py-3">
        Add Project
      </button>
      </section>

      <ul>
        {meetings.map((meeting) => (
          <MeetingCard key={meeting.id} meeting={meeting} />
        ))}
      </ul>
      {/* to dos will be rendered under the project themselves */}
    </div>
    <NewProjectModal open={projectModalOpen} setOpen={setProjectModalOpen} communityId={id} />
    </>
  );
}
