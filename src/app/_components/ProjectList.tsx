/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { images } from "public/icons";
import Image from "next/image";
import Link from "next/link";
import { useAuthContext } from "~/context/AuthContext";
import { type Prisma } from "@prisma/client";
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

export default function ProjectList({ projects }: { projects: ProjectWithRelations[] }) {
  const { user } = useAuthContext();
  const router = useRouter();
  const [loadingProjectId, setLoadingProjectId] = useState<number | null>(null);

  const { mutate } = api.projects.addProjectMemberById.useMutation({
    onSuccess: () => {
      setLoadingProjectId(null);
      router.refresh();
    },
    onError: (error) => {
      console.error(error);
      setLoadingProjectId(null);
    },
  });

  const handleJoin = (projectId: number) => {
    setLoadingProjectId(projectId);
    mutate({ projectId, userId: user?.id ?? "" });
  };

  if (projects.length === 0) {
    return (
      <div className="my-8 text-textBrand text-center text-sm">
        No projects found 🙁
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {projects.map((project) => {
        const alreadyJoined = project.projectMembers.some((m) => m.id === user?.id);
        const isLoading = loadingProjectId === project.id;

        return (
          <div
            key={project.id}
            className="flex flex-col justify-between rounded-2xl border border-borderBrand bg-white p-6 shadow-sm hover:shadow-md transition min-h-[280px]"
          >
            <Link href={`/projects/${project.id}`} className="flex items-center gap-4 mb-4">
              <Image
                width={48}
                height={48}
                alt={`${project.stage} stage`}
                src={images[project.stage]}
                className="h-12 w-12 rounded-full bg-gray-100 flex-shrink-0"
              />
              <div className="flex flex-col min-w-0">
                <h3 className="text-md font-semibold text-textBrand truncate">{project.title}</h3>
                <p className="text-xs text-accentBrand truncate">
                  by {project.createdBy.firstName} {project.createdBy.lastName}
                </p>
              </div>
            </Link>

            <div className="space-y-1 mb-4">
              <p className="text-sm text-accentBrand">Created: {project.createdAt.toLocaleDateString()}</p>
              <p className="text-xs text-textBrand">
                {project.done ? (
                  <span className="text-green-600 font-medium">Completed</span>
                ) : (
                  <>Goal end date: {project.endDate.toLocaleDateString()}</>
                )}
              </p>
            </div>

            {!alreadyJoined && (
              <button
                onClick={() => handleJoin(project.id)}
                disabled={isLoading}
                className="mt-auto w-full rounded-3xl border border-primaryBrand bg-primaryBrand px-4 py-2 text-sm text-white hover:bg-white hover:text-primaryBrand transition"
              >
                {isLoading ? "Joining..." : "Join Project"}
              </button>
            )}
          </div>
        );
      })}
    </div>
  );
}
