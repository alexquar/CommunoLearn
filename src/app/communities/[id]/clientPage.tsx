"use client";
import {useState} from "react";
import type { Project, Meeting } from "@prisma/client";
import ProjectCard from "~/app/_components/ProjectCard";
import MeetingCard from "~/app/_components/MeetingCard";
import NewProjectModal from "~/app/_components/NewProjectModal";
import NewMeetingModal from "~/app/_components/NewMeetingModal";
export default function ClientPage({
  id,
  projects,
  meetings,
}: {
  id: number;
  projects: Project[];
  meetings: Meeting[];
}) {
    const [meetingModalOpen, setMeetingModalOpen] = useState(false);
    const [projectModalOpen, setProjectModalOpen] = useState(false);
  return (
    <>
    <div>
    <section>
      <ul>
        {projects.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </ul>
      <button onClick={()=>setProjectModalOpen(true)} className="text-white my-3 rounded-3xl bg-secondaryBrand hover:bg-secondaryBrand/75 px-10 py-3">
        Add Project
      </button>
      </section>

      <ul>
        {meetings.map((meeting) => (
          <MeetingCard key={meeting.id} meeting={meeting} />
        ))}
      </ul>
      <button onClick={()=>setMeetingModalOpen(true)} className="text-white my-3 rounded-3xl bg-secondaryBrand hover:bg-secondaryBrand/75 px-10 py-3">
        Add Meeting
      </button>
      {/* to dos will be rendered under the project themselves */}
    </div>
    <NewProjectModal open={projectModalOpen} setOpen={setProjectModalOpen} communityId={id} />
    <NewMeetingModal open={meetingModalOpen} setOpen={setMeetingModalOpen} communityId={id} projectId={1} />
    </>
  );
}
