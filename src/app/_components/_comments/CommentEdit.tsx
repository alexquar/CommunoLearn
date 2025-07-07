"use client";
import React, { useEffect } from "react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { type CommentWithRelations } from "~/types/commentTypes";
import CommentForm from "./CommentForm";
export default function CommentEditModal({
    open,
    setOpen,
    comment
}:{
    open: boolean;
    setOpen: (open: boolean) => void;
    comment: CommentWithRelations;
}) {
  const router = useRouter();

  return (
    <>
      {open && (
        <div className="fixed left-0 right-0 top-0 z-50 flex h-full w-full items-center justify-center overflow-y-auto overflow-x-hidden bg-gray-300/75">
          <div className="relative max-h-full w-full max-w-xl p-4">
            <div className="relative rounded-lg bg-white shadow">
              <div className="flex items-center justify-between rounded-t border-b p-4 md:p-5">
                <h3 className="text-lg font-bold text-accentBrand">
                  Edit your comment
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
                <div className="p-6">
                    <CommentForm
                    associatedId={undefined}
                    commentOn={undefined}
                    id={comment.id}
                    passedCategory={comment.commentCategory}
                    passedComment={comment.text}
                    />
                </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
