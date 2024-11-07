"use client";
import React from "react";
import type { Project, Meeting } from "@prisma/client";
import ProjectCard from "~/app/_components/ProjectCard";
import MeetingCard from "~/app/_components/MeetingCard";
export default function ClientPage({
  id,
  projects,
  meetings,
}: {
  id: string;
  projects: Project[];
  meetings: Meeting[];
}) {
  return (
    <div>
      <p>{id}</p>
      <ul>
        {projects.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </ul>

      <ul>
        {meetings.map((meeting) => (
          <MeetingCard key={meeting.id} meeting={meeting} />
        ))}
      </ul>
      {/* to dos will be rendered under the project themselves */}
    </div>
  );
}
