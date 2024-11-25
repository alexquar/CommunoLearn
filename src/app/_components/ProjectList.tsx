/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { images } from "public/icons";

import Image from "next/image";
import { useAuthContext } from "~/context/AuthContext";
import { type Prisma } from "@prisma/client";
import Link from "next/link";
import { api } from "~/trpc/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
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

export default function ProjectList({
  projects,
}: {
  projects: ProjectWithRelations[];
}) {
  const {user} = useAuthContext();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const {mutate} = api.projects.addProjectMemberById.useMutation(
    {
      onSuccess: () => {
        console.log("Project joined successfully");
        setLoading(false);
        router.refresh();
      },
      onError: (error) => {
        console.error(error);
        setLoading(false);
      },
    }
  );
  const handleJoin = (projectId:number) => {
    setLoading(true);
    mutate({
      projectId,
      userId: user?.id ?? "",
    });
    
  };

  return (
    <ul role="list" className="divide-y divide-gray-100">
      {projects.map((project) => (

        <div
          key={project.id}
          className="flex justify-between gap-x-6 py-5"
        >
          <Link           
          href={`/projects/${project.id}`}
           className="flex min-w-0 gap-x-4">
            <Image
            width={48}
            height={48}
              alt={`${project.stage} stage image`}
              src={images[project.stage]}
              className="h-12 w-12 flex-none rounded-full bg-gray-50"
            />
            <div className="min-w-0 flex-auto">
              <p className="text-sm/6 font-semibold text-gray-900">
                {project.title}
              </p>
              <p className="mt-1 truncate text-xs/5 text-gray-500">
                {" "}
                created by: {project.createdBy.firstName}{" "}
                {project.createdBy.lastName}{" "}
              </p>
            </div>
          </Link>
          <div className="flex flex-row gap-x-8">
          {!project.projectMembers.some((member) => member.id === user?.id) &&
            <button onClick={()=>handleJoin(project.id)} className="px-10 py-3 bg-white border-accentBrand text-accentBrand border rounded-3xl hover:text-white hover:bg-accentBrand">
              {loading ? "Joining..." : "Join Project"}
            </button>
}

          <div className="hidden shrink-0 sm:flex sm:flex-col sm:items-end">
            <p className="text-sm/6 text-gray-900">
              Created: {project.createdAt.toLocaleDateString()}
            </p>

            <p className="mt-1 text-xs/5 text-gray-500">
              {project.done ? (
                <span>Project has been completed!</span>
              ) : (
                <span>
                  Goal end date: {project.endDate.toLocaleDateString()}
                </span>
              )}
            </p>
          </div>
          </div>
          </div>
     
      ))}
    </ul>
  );
}
