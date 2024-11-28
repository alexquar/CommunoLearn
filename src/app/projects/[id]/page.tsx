import { notFound } from "next/navigation";
import React from "react";
import ClientPage from "./clientPage";
import { api } from "~/trpc/server";
import TodoList from "~/app/_components/TodoList";
import Link from "next/link";
import JoinProjectButton from "~/app/_components/JoinProjectButton";
import UserList from "~/app/_components/UserList";
import MeetingGrid from "~/app/_components/MeetingGrid";
export default async function Project({ params }: { params: { id: string } }) {
  const id = params.id;
  const numericId = Number(id);
  if (isNaN(numericId)) {
    return notFound();
  }
  const project = await api.projects.getProjectByIdWithRelations({
    projectId: numericId,
  });
  if (!project) {
    return notFound();
  }
  return (
    <div className="mx-auto flex max-w-7xl flex-col gap-12 py-12">
      <div className="flex flex-col gap-y-3">
        <div className="flex flex-row justify-between">
        <h1 className="text-5xl font-bold text-accentBrand">{project.title}</h1>
        <Link href={`/communities/${project.associatedCommunityId}`} className="text-primaryBrand hover:underline font-semibold text-lg cursor-pointer">
          Back to community
        </Link>
        </div>
        <p className="text-textBrand text-lg font-semibold">{project.description}</p>
        <div className="flex text-textBrand flex-row gap-x-1">
          <p className="border-e pe-1 border-textBrand">Stage: {project.stage}</p>
          <p className="border-e pe-1 border-textBrand">Updated: {project.updatedAt.toDateString()}</p>
          <p className="border-e pe-1 border-textBrand">Created: {project.createdAt.toDateString()}</p>
          <p className="border-e pe-1 border-textBrand">Goal Completeion: {project.endDate.toDateString()}</p>
          <p className="border-e pe-1 border-textBrand">Members: {project.projectMembers.length}</p>
        </div>
        <span className="ms-auto">
            <JoinProjectButton projectId={project.id} members={project.projectMembers}  />
          </span>
      </div>
      <div>
        <h3 className="text-lg font-semibold mb-4 text-accentBrand">Project Members</h3>
        <UserList members={project.projectMembers} ownerId={project.createdBy.id} />
      </div>
      <div>
        <h3 className="text-lg font-semibold mb-4 text-accentBrand">Todos</h3>
        <TodoList todos={project.todos} />
      </div>
      <div>
        <h3 className="text-lg font-semibold mb-4 text-accentBrand">Meetings</h3>
        <MeetingGrid meetings={project.Meetings} />
      </div>
      <ClientPage
        projectId={numericId}
        project = {project}
        communityId={project.associatedCommunityId}
        projectMembers={project.projectMembers}
      />
    </div>
  );
}
