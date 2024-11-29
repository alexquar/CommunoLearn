"use client"
import { notFound } from "next/navigation";
import React from "react";
import Link from "next/link";
import { api } from "~/trpc/react";
import { useState } from "react";
import NewTodoModal from "~/app/_components/NewTodoModal";
export default function Todo({ params }: { params: { id: string } }) {
  const [edit, setEdit] = useState(false);
  const id = params.id;
  const numericId = Number(id);
  if (isNaN(numericId)) {
    return notFound();
  }
  const {data:todo} = api.todos.getTodoByIdWithReltions.useQuery({
    id: numericId,
  });

  return (
    <div className="mx-auto flex max-w-7xl flex-col gap-12 py-12">
      <div className="flex flex-col gap-y-3">
        <div className="flex flex-row justify-between">
        <h1 className="text-5xl font-bold text-accentBrand">{todo?.title}</h1>
        <Link href={`/projects/${todo?.projectId}`} className="text-primaryBrand hover:underline font-semibold text-lg cursor-pointer">
          Back to Project
        </Link>
        </div>
        <p className="text-textBrand text-lg font-semibold">{todo?.content}</p>
        <div className="flex text-textBrand flex-row gap-x-1">
          <p className="border-e pe-1 border-textBrand">Stage: {todo?.stage}</p>
          <p className="border-e pe-1 border-textBrand">Updated: {todo?.updatedAt.toDateString()}</p>
          <p className="border-e pe-1 border-textBrand">Created: {todo?.createdAt.toDateString()}</p>
          <p className="border-e pe-1 border-textBrand">Goal Completion: {todo?.completionDate.toDateString()}</p>
        </div>
        <div className="flex mt-4 text-primaryBrand font-bold text-xl flex-col gap-y-8">
          <span>
            Created by {todo?.createdBy.firstName} {todo?.createdBy.lastName}
          </span>
          <span>
            Assigned to {todo?.assignedUser?.firstName ?? 'No Body'} {todo?.assignedUser?.lastName ?? ''}
          </span>
          <button 
          onClick={()=>setEdit(true)}
          className="w-fit text-base font-normal px-10 py-3 bg-secondaryBrand hover:bg-secondaryBrand/75 text-white rounded-3xl">
            Edit Todo
          </button>
        </div>
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
      memberIdProp={todo?.assignedUser?.id ?? ''}
      stageProp={todo?.stage}
      
    />
    </div>
  );
}
