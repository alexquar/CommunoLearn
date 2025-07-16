"use client";
import { notFound } from "next/navigation";
import React, { useEffect } from "react";
import Link from "next/link";
import { api, type RouterOutputs } from "~/trpc/react";
import { useState } from "react";
import NewTodoModal from "~/app/_components/_todos/NewTodoModal";
import Loading from "~/app/loading";
import { useAuthContext } from "~/context/AuthContext";
type TodoWithRelations = RouterOutputs["todos"]["getTodoByIdWithRelations"];
import CommentSection from "~/app/_components/_comments/CommentSection";
import Blob from "~/app/_components/_general/Blob";
import { useRouter } from "next/navigation";
export default function Todo({ params }: { params: { id: string } }) {
  const [edit, setEdit] = useState(false);
  const [todo, setTodo] = useState<TodoWithRelations | null>(null);
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const id = params.id;
  const numericId = Number(id);
  const { user } = useAuthContext();
  const { refetch } = api.todos.getTodoByIdWithRelations.useQuery({
    id: numericId,
  });

  const {mutate: deleteTodo} = api.todos.deleteTodo.useMutation({
    onSuccess: () => {
      setLoading(false);
      router.push(`/projects/${todo?.projectId}`);
    },
    onError: (error) => {
      setLoading(false);
      console.error(error);
    },
  });

  const handleDelete = () => {
    setLoading(true);
    deleteTodo({
      id: numericId,
    });
  }

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
  }, [refetch, user]);

  if (isNaN(numericId)) {
    return notFound();
  }

  return (
    <>
      {todo ? (
  <div className="mx-auto max-w-5xl px-4 py-10">
    <div className="flex flex-col gap-8 rounded-2xl border border-borderBrand bg-white p-6 shadow-sm hover:shadow-md transition">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
        <h1 className="text-3xl font-bold text-textBrand line-clamp-2">{todo.title}</h1>
        <Link
          href={`/projects/${todo.projectId}`}
          className="text-sm text-primaryBrand hover:underline"
        >
          ← Back to Project
        </Link>
      </div>

      {/* Content */}
      <p className="text-base text-accentBrand">{todo.content}</p>

      {/* Metadata Section */}
      <div className="flex flex-wrap gap-4 text-sm text-textBrand border-t pt-4 border-borderBrand">
        <p><span className="font-semibold">Stage:</span> {todo.stage}</p>
        <p><span className="font-semibold">Created:</span> {todo.createdAt.toDateString()}</p>
        <p><span className="font-semibold">Updated:</span> {todo.updatedAt.toDateString()}</p>
        <p><span className="font-semibold">Goal Completion:</span> {todo.completionDate.toDateString()}</p>
        {todo.done && <Blob title="Done" />}
      </div>

      {/* User Info */}
      <div className="space-y-2 text-sm">
        <Link href={`/user/${todo.createdBy.id}`} className="text-primaryBrand hover:underline me-2">
          Created by {todo.createdBy.firstName} {todo.createdBy.lastName}
        </Link>
        {todo.assignedUser ? (
          <Link href={`/user/${todo.assignedUser.id}`} className="text-primaryBrand hover:underline">
            Assigned to {todo.assignedUser.firstName} {todo.assignedUser.lastName}
          </Link>
        ) : (
          <p className="text-textBrand">Assigned to: <span className="italic">Nobody</span></p>
        )}
      </div>

      {/* Actions */}
      {(todo.assignedUser?.id === user?.id || todo.createdBy.id === user?.id) && (
        <div className="flex flex-wrap gap-4 pt-2">
          <button
            onClick={() => setEdit(true)}
            className="rounded-full bg-secondaryBrand px-6 py-2 text-white text-sm hover:bg-secondaryBrand/80"
          >
            Edit Todo
          </button>
          <button
            onClick={handleDelete}
            className="rounded-full bg-red-500 px-6 py-2 text-white text-sm hover:bg-red-600"
            disabled={loading}
          >
            {loading ? "Deleting..." : "Delete Todo"}
          </button>
        </div>
      )}

      {/* Comments */}
      <div className="pt-6 border-t border-borderBrand">
        <CommentSection comments={todo.Comment} onId={todo.id} commentOn="todo" />
      </div>
    </div>

    {/* Edit Modal */}
    <NewTodoModal
      open={edit}
      setOpen={setEdit}
      projectId={todo.projectId}
      todoId={todo.id}
      isEdit
      projectMembers={todo.Project.projectMembers}
      titleProp={todo.title}
      contentProp={todo.content}
      completion={todo.completionDate.toDateString()}
      memberIdProp={todo.assignedUser?.id ?? ""}
      stageProp={todo.stage}
      isDone={todo.done}
    />
  </div>
) : (
  <Loading />
)}
    </>
  );
}
