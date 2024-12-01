"use client";
import React, { useEffect } from "react";
import { useState } from "react";
import { api } from "~/trpc/react";
import ErrorNotification from "./ErrorNotification";
import { useRouter } from "next/navigation";
import { type Prisma, type Stage } from "@prisma/client";
import { useAuthContext } from "~/context/AuthContext";
type ProjectMembersShort = Prisma.UserGetPayload<{
  select: { id: true; firstName: true; lastName: true; email: true };
}>;
export default function NewTodoModal({
  open,
  setOpen,
  projectId,
  projectMembers,
  isEdit = false,
  titleProp = "",
  contentProp = "",
  stageProp = "idea",
  completion = "",
  memberIdProp = "",
  todoId = 0,
  isDone = false,
}: {
  open: boolean;
  setOpen: (open: boolean) => void;
  projectId: number;
  projectMembers: ProjectMembersShort[];
  isEdit?: boolean;
  titleProp?: string;
  contentProp?: string;
  stageProp?: Stage;
  completion?: string;
  memberIdProp?: string;
  todoId?: number;
  isDone?: boolean;
}) {
  const router = useRouter();
  const [title, setTitle] = useState(titleProp);
  const [content, setContent] = useState(contentProp);
  const [stage, setStage] = useState<keyof typeof Stage>(stageProp);
  const [completionDate, setCompletionDate] = useState(() => {
    if (!completion) return ""; // Return empty if no date is provided
    const d = new Date(completion);
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, "0"); // Months are 0-based
    const day = String(d.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [memberId, setMemberId] = useState(() => {
    if (!memberIdProp) return projectMembers[0]?.id ?? "";
    return memberIdProp;
  });
  const [done, setDone] = useState(isDone);
  const { user } = useAuthContext();
  useEffect(() => {
    if (isEdit) {
      setTitle(titleProp);
      setContent(contentProp);
      setStage(stageProp);
      setCompletionDate(() => {
        if (!completion) return ""; // Return empty if no date is provided
        const d = new Date(completion);
        const year = d.getFullYear();
        const month = String(d.getMonth() + 1).padStart(2, "0"); // Months are 0-based
        const day = String(d.getDate()).padStart(2, "0");
        return `${year}-${month}-${day}`;
      });
      setMemberId(() => {
        if (!memberIdProp) return projectMembers[0]?.id ?? "";
        return memberIdProp;
      });
      setDone(isDone);
    }
  }, [completion, contentProp, isEdit, memberIdProp, open, isDone, projectMembers, stageProp, titleProp])
  const { mutate } = api.todos.newTodo.useMutation({
    onSuccess: () => {
      setLoading(false);
      setOpen(false);
      router.refresh();
    },
    onError: (error) => {
      console.error(error);
      setLoading(false);
      setError("Error Occured");
    },
  });

  const { mutate: edit } = api.todos.updateTodo.useMutation({
    onSuccess: () => {
      setLoading(false);
      setOpen(false);
      router.refresh();
    },
    onError: (error) => {
      setLoading(false);
      console.error(error);
      setError("Update Error Occured");
    },
  });

  //get the current user

  const handleSubmit = async (e: React.FormEvent) => {
    setLoading(true);
    setError("");
    e.preventDefault();
    const endDate = new Date(completionDate);
    //pass in correct user date here
    if (isEdit) {
      edit({
        id: todoId,
        title,
        content,
        stage: stage as Stage,
        done,
        userId: memberId,
        completionDate: endDate,
      });
    } else {
      mutate({
        title,
        content,
        userId: user?.id ?? "", //add real thing here
        projectId,
        completionDate: endDate,
        projectStage: stage as Stage,
        assignedId: memberId,
      });
    }
  };

  return (
    <>
      {open && (
        <div className="fixed left-0 right-0 top-0 z-50 flex h-full w-full items-center justify-center overflow-y-auto overflow-x-hidden bg-gray-300/75">
          <div className="relative max-h-full w-full max-w-xl p-4">
            <div className="relative rounded-lg bg-white shadow">
              <div className="flex items-center justify-between rounded-t border-b p-4 md:p-5">
                <h3 className="text-lg font-bold text-accentBrand">
                  {isEdit ? "Edit todo" : "Create New Todo"}
                </h3>
                <button
                  onClick={() => setOpen(false)}
                  type="button"
                  className="ms-auto inline-flex h-8 w-8 items-center justify-center rounded-lg bg-transparent text-sm text-accentBrand hover:bg-gray-100"
                >
                  <svg
                    className="h-3 w-3"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 14 14"
                  >
                    <path
                      stroke="currentColor"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                    />
                  </svg>
                  <span className="sr-only">Close modal</span>
                </button>
              </div>
              <form onSubmit={handleSubmit} className="p-4 md:p-5">
                <div className="mb-8 grid grid-cols-2 gap-12">
                  <div className="col-span-2">
                    <label className="mb-2 block text-sm font-medium text-accentBrand">
                      Todo
                    </label>
                    <input
                      type="text"
                      className="block w-full rounded-lg border-2 border-primaryBrand bg-white p-2.5 text-sm text-textBrand placeholder-textBrand outline-primaryBrand"
                      placeholder="Your Todo Name"
                      required
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                    />
                  </div>

                  <div className="col-span-2">
                    <label className="mb-2 block text-sm font-medium text-accentBrand">
                      What Todo ;)
                    </label>
                    <textarea
                      rows={3}
                      className="block w-full rounded-lg border-2 border-primaryBrand bg-white p-2.5 text-sm text-textBrand placeholder-textBrand outline-primaryBrand"
                      placeholder="What you've got Todo..."
                      required
                      value={content}
                      onChange={(e) => setContent(e.target.value)}
                    />
                  </div>

                  <div className="col-span-2 sm:col-span-1">
                    <label className="mb-2 block text-sm font-medium text-accentBrand">
                      Completion Date
                    </label>
                    <input
                      type="date"
                      className="block w-full rounded-lg border-2 border-primaryBrand bg-white p-2.5 text-sm text-textBrand placeholder-textBrand outline-primaryBrand"
                      required
                      value={completionDate}
                      onChange={(e) => setCompletionDate(e.target.value)}
                    />
                  </div>

                  <div className="col-span-2 sm:col-span-1">
                    <label className="mb-2 block text-sm font-medium text-accentBrand">
                      Todo Stage
                    </label>
                    <select
                      className="block w-full rounded-lg border-2 border-primaryBrand bg-white p-2.5 text-sm text-textBrand placeholder-textBrand outline-primaryBrand"
                      required
                      value={stage}
                      onChange={(e) =>
                        setStage(e.target.value as keyof typeof Stage)
                      }
                    >
                      <option value="idea">Idea</option>
                      <option value="planning">Planning</option>
                      <option value="inProgress">In Progress</option>
                      <option value="onHold">On Hold</option>
                      <option value="done">Done</option>
                    </select>
                  </div>

                  <div className="col-span-2 sm:col-span-1">
                    <label className="mb-2 block text-sm font-medium text-accentBrand">
                      Assigned Community Member
                    </label>
                    <select
                      className="block w-full rounded-lg border-2 border-primaryBrand bg-white p-2.5 text-sm text-textBrand placeholder-textBrand outline-primaryBrand"
                      required
                      value={memberId}
                      onChange={(e) => setMemberId(e.target.value)}
                    >
                      {projectMembers.map((member) => (
                        <option key={member.id} value={member.id}>
                          {member.firstName} {member.lastName}
                        </option>
                      ))}
                    </select>
                  </div>
                  {isEdit && (
                    <div className="col-span-2 mb-4 flex items-center gap-x-2">
                      <label
                        htmlFor="mark-completed"
                        className="text-sm font-medium text-accentBrand"
                      >
                        Mark Todo as Completed:
                      </label>
                      <input
                        id="mark-completed"
                        type="checkbox"
                        className="rounded-lg border-2 border-primaryBrand p-2 accent-primaryBrand outline-none"
                        checked={done}
                        onChange={(e) => setDone(e.target.checked)}
                      />
                    </div>
                  )}
                </div>
                <div className="flex flex-col items-center justify-between gap-y-4 sm:flex-row">
                  <button
                    type="submit"
                    className="inline-flex items-center rounded-lg bg-secondaryBrand px-5 py-2.5 text-center text-sm font-medium text-white hover:cursor-pointer hover:bg-secondaryBrand/75"
                  >
                    <svg
                      className="-ms-1 me-1 h-5 w-5"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
                        clip-rule="evenodd"
                      ></path>
                    </svg>
                    {loading
                      ? isEdit
                        ? "Updating Todo..."
                        : "Creating Todo..."
                      : isEdit
                        ? "Update Todo"
                        : "Add new Todo"}
                  </button>
                  <span>{error && <ErrorNotification message={error} />}</span>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
