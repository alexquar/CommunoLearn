/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import idea from '../../../public/free_icon_1.svg'
import Image from 'next/image'
 
import { type Prisma } from "@prisma/client";

type ProjectWithRelations = Prisma.ProjectGetPayload<{
  include: { 
    createdBy: {
      select: { firstName: true, lastName:true, email: true, id: true },
    },
    projectMembers: {
      select: { id: true, firstName: true, lastName: true, email: true },
    },
   };
}>;



  export default function ProjectList({projects}: {projects: ProjectWithRelations[]}) {
    return (
      <ul role="list" className="divide-y divide-gray-100">
        {projects.map((project) => (
          <li key={project.id} className="flex justify-between gap-x-6 py-5">
            <div className="flex min-w-0 gap-x-4">
              <Image alt={`${project.stage} stage image`} src={idea} className="h-12 w-12 flex-none rounded-full bg-gray-50" />
              <div className="min-w-0 flex-auto">
                <p className="text-sm/6 font-semibold text-gray-900">{project.title}</p>
                <p className="mt-1 truncate text-xs/5 text-gray-500"> created by: {project.createdBy.firstName} {project.createdBy.lastName} </p>
              </div>
            </div>
            <div className="hidden shrink-0 sm:flex sm:flex-col sm:items-end">
              <p className="text-sm/6 text-gray-900">Created: {project.createdAt.toLocaleDateString()}</p>
            
            <p className="mt-1 text-xs/5 text-gray-500">
                  {project.done ?
                  <span>
                    Project has been completed!
                  </span>
                  :
                  <span>
                    Goal end date: {project.endDate.toLocaleDateString()}
                  </span>
                }
                </p>
            </div>
          </li>
        ))}
      </ul>
    )
  }