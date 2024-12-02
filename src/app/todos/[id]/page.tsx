"use client";
import { notFound } from "next/navigation";
import React, { useEffect } from "react";
import Link from "next/link";
import { api, type RouterOutputs } from "~/trpc/react";
import { useState } from "react";
import NewTodoModal from "~/app/_components/NewTodoModal";
import Loading from "~/app/loading";
import { useAuthContext } from "~/context/AuthContext";
type TodoWithRelations = RouterOutputs["todos"]["getTodoByIdWithRelations"];
import CommentSection from "~/app/_components/_comments/CommentSection";
import Blob from "~/app/_components/Blob";
export default function Todo({ params }: { params: { id: string } }) {
  const [edit, setEdit] = useState(false);
  const [todo, setTodo] = useState<TodoWithRelations | null>(null);
  const id = params.id;
  const numericId = Number(id);
  const { user } = useAuthContext();
  const { refetch } = api.todos.getTodoByIdWithRelations.useQuery({
    id: numericId,
  });

  useEffect(() => {
    refetch()
      .then((result) => {
        const data = result.data;
        if (!data) {
          return notFound();
        }
        if (
          data.Project.AssociatedCommunity.private &&
          !data.Project.projectMembers.some((member) => member.id === user?.id)
        ) {
          return notFound();
        }
        setTodo(data ?? null);
      })
      .catch((error) => {
        console.error("Failed to refetch todo:", error);
      });
  }, [refetch]);

  if (isNaN(numericId)) {
    return notFound();
  }

  return (
    <>
      {" "}
      {todo ? (
        <div className="mx-auto flex max-w-7xl flex-col gap-12 px-10 py-12">
          <div className="flex flex-col gap-y-3">
            <div className="flex flex-row justify-between">
              <h1 className="text-5xl font-bold text-accentBrand">
                {todo?.title}
              </h1>
              <Link
                href={`/projects/${todo?.projectId}`}
                className="cursor-pointer text-lg font-semibold text-primaryBrand hover:underline"
              >
                Back to Project
              </Link>
            </div>
            {todo.done && (
              <div className="inline-flex">
                <Blob title="Done" />
              </div>
            )}
            <p className="text-lg font-semibold text-textBrand">
              {todo?.content}
            </p>
            <div className="flex flex-col gap-x-1 gap-y-4 text-textBrand md:flex-row">
              <p className="border-textBrand pe-1 md:border-e">
                Stage: {todo?.stage}
              </p>
              <p className="border-textBrand pe-1 md:border-e">
                Updated: {todo?.updatedAt.toDateString()}
              </p>
              <p className="border-textBrand pe-1 md:border-e">
                Created: {todo?.createdAt.toDateString()}
              </p>
              <p className="border-textBrand pe-1 md:border-e">
                Goal Completion: {todo?.completionDate.toDateString()}
              </p>
            </div>
            <div className="mt-4 flex flex-col gap-y-8 text-xl font-bold text-primaryBrand">
              <span>
                Created by {todo?.createdBy.firstName}{" "}
                {todo?.createdBy.lastName}
              </span>
              <span>
                Assigned to {todo?.assignedUser?.firstName ?? "No Body"}{" "}
                {todo?.assignedUser?.lastName ?? ""}
              </span>
              {(todo?.assignedUser?.id === user?.id ||
                todo.createdBy.id === user?.id) && (
                <button
                  onClick={() => setEdit(true)}
                  className="w-fit rounded-3xl bg-secondaryBrand px-10 py-3 text-base font-normal text-white hover:bg-secondaryBrand/75"
                >
                  Edit Todo
                </button>
              )}
            </div>
            <CommentSection
              comments={todo.Comment}
              onId = {todo.id}
              commentOn="todo"
              />
          </div>
          <NewTodoModal
            open={edit}
            setOpen={setEdit}
            projectId={todo?.projectId ?? 0}
            todoId={todo?.id ?? 0}
            isEdit
            projectMembers={todo?.Project.projectMembers ?? []}
            titleProp={todo?.title}
            contentProp={todo?.content}
            completion={todo?.completionDate.toDateString()}
            memberIdProp={todo?.assignedUser?.id ?? ""}
            stageProp={todo?.stage}
            isDone={todo?.done}
          />
        </div>
      ) : (
        <Loading />
      )}
    </>
  );
}
