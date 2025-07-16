import { notFound } from "next/navigation";
import React from "react";
import Link from "next/link";
import ClientPage from "./clientPage";

import { api } from "~/trpc/server";
import TodoList from "~/app/_components/_todos/TodoList";
import MeetingGrid from "~/app/_components/_meetings/MeetingGrid";
import UserList from "~/app/_components/_users/UserList";
import JoinProjectButton from "~/app/_components/_projects/JoinProjectButton";
import Blob from "~/app/_components/_general/Blob";
import CommentSection from "~/app/_components/_comments/CommentSection";

export default async function Project({ params }: { params: { id: string } }) {
  const id = params.id;
  const numericId = Number(id);

  if (isNaN(numericId)) return notFound();

  const project = await api.projects.getProjectByIdWithRelations({
    projectId: numericId,
  });

  if (!project) return notFound();

  return (
    <div className="mx-auto max-w-5xl px-4 py-10">
      <div className="flex flex-col gap-8 rounded-2xl border border-borderBrand bg-white p-6 shadow-sm hover:shadow-md transition">

        {/* === Header === */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
          <h1 className="text-3xl font-bold text-textBrand line-clamp-2">
            {project.title}
          </h1>
          <Link
            href={`/communities/${project.associatedCommunityId}`}
            className="text-sm text-primaryBrand hover:underline"
          >
            ← Back to Community
          </Link>
        </div>

        {/* === Status === */}
        {project.done && <Blob title="Done" />}

        {/* === Description === */}
        <p className="text-base text-accentBrand">{project.description}</p>

        {/* === Metadata Section === */}
        <div className="flex flex-wrap gap-4 text-sm text-textBrand border-t pt-8 border-borderBrand">
          <p><span className="font-semibold">Stage:</span> {project.stage}</p>
          <p><span className="font-semibold">Created:</span> {project.createdAt.toDateString()}</p>
          <p><span className="font-semibold">Updated:</span> {project.updatedAt.toDateString()}</p>
          <p><span className="font-semibold">Goal Completion:</span> {project.endDate.toDateString()}</p>
          <p><span className="font-semibold">Members:</span> {project.projectMembers.length}</p>
        </div>

        {/* === Join Project Button === */}
        <JoinProjectButton
          projectId={project.id}
          members={project.projectMembers}
        />

        {/* === Project Members === */}
        <div className="border-t border-borderBrand pt-6">
          <h3 className="text-xl font-semibold text-accentBrand mb-4">
            Project Members
          </h3>
          <UserList
            members={project.projectMembers}
            ownerId={project.createdBy.id}
          />
        </div>

        {/* === Todos Section === */}
        <div className="border-t border-borderBrand pt-6">
          <h3 className="text-xl font-semibold text-accentBrand mb-4">
            Todos
          </h3>
          <TodoList todos={project.todos} />
        </div>

        {/* === Meetings Section === */}
        <div className="border-t border-borderBrand pt-6">
          <h3 className="text-xl font-semibold text-accentBrand mb-4">
            Meetings
          </h3>
          <MeetingGrid meetings={project.Meetings} />
        </div>

        {/* === Comments Section === */}
        <div className="pt-6 border-t border-borderBrand">
          <CommentSection
            comments={project.Comments}
            onId={project.id}
            commentOn="project"
          />
        </div>

        {/* === Management Controls === */}
        <ClientPage
          projectId={numericId}
          project={project}
          communityId={project.associatedCommunityId}
          projectMembers={project.projectMembers}
          isPrivate={project.AssociatedCommunity.private}
        />
      </div>
    </div>
  );
}
