"use client";
import {useState} from "react";
import type { Project, Meeting } from "@prisma/client";
import ProjectCard from "~/app/_components/ProjectCard";
import MeetingCard from "~/app/_components/MeetingCard";
import GenericModal from "~/app/_components/genericModal";
export default function ClientPage({
  id,
  projects,
  meetings,
}: {
  id: string;
  projects: Project[];
  meetings: Meeting[];
}) {
    
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
      <button onClick={()=>setProjectModalOpen(true)}>
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
    
    <GenericModal open={projectModalOpen} setOpen={setProjectModalOpen}>
        <div>
            <h1>Add Project</h1>
            <form>
                <input type="text" placeholder="Project Name" />
                <input type="text" placeholder="Project Description" />
                <button type="submit">Add Project</button>
            </form>
        </div>
    </GenericModal>

    </>
  );
}
