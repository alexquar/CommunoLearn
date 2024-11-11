import { notFound } from 'next/navigation';
import React from 'react'
import ClientPage from './clientPage';
import { api } from '~/trpc/server';
import MeetingCard from '~/app/_components/MeetingCard';
export default async function Project({params}: {params: {id: string}}) {
  const id = params.id;
  const numericId = Number(id);
  if (isNaN(numericId)) {
    return notFound();
  }
  const project = await api.projects.getProjectByIdWithRelations({projectId: numericId});
  if(!project) {
    return notFound();
  }
  return (
    <>
    <div>{project.title}</div>
    <ul>
        {project.Meetings.map((meeting) => (
          <MeetingCard key={meeting.id} meeting={meeting} />
        ))}
      </ul>
    <ClientPage projectId={numericId} communityId={project.associatedCommunityId}/>
    </>
  )
}
