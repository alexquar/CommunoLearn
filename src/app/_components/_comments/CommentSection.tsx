"use client";
import type { CommentWithRelations } from "~/types/commentTypes";
import CommentList from "./CommentList";
import CommentForm from "./CommentForm";
import { useState } from "react";
export default function CommentSection({
  commentOn,
  onId,
  comments,
}: {
  commentOn: string;
  onId: string | number;
  comments: CommentWithRelations[];
}) {
  const [openComments, setOpenComments] = useState(true);
  return (
    <div className="mt-8">
      <div className="flex flex-row items-center gap-x-2">
        <button
          onClick={() => setOpenComments((prev) => !prev)}
          className="my-auto h-6 w-6"
        >
          {openComments ? (
            <svg
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
              <g
                id="SVGRepo_tracerCarrier"
                stroke-linecap="round"
                stroke-linejoin="round"
              ></g>
              <g id="SVGRepo_iconCarrier">
                {" "}
                <path
                  d="M7 10L12 15L17 10"
                  stroke="#ee6605"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                ></path>{" "}
              </g>
            </svg>
          ) : (
            <svg
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
              <g
                id="SVGRepo_tracerCarrier"
                stroke-linecap="round"
                stroke-linejoin="round"
              ></g>
              <g id="SVGRepo_iconCarrier">
                {" "}
                <path
                  d="M10 7L15 12L10 17"
                  stroke="#ee6605"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                ></path>{" "}
              </g>
            </svg>
          )}
        </button>
        <h1 className="font-bold text-accentBrand">View comments on this {commentOn}</h1>
        <p
          className={`rounded-full font-light ${comments.length === 0 ? "bg-textBrand" : "bg-primaryBrand"} flex h-8 w-8 items-center justify-center text-white`}
        >
          {comments.length}
        </p>
      </div>
      {openComments && (
        <>
          <CommentList comments={comments} />
          <CommentForm associatedId={onId} commentOn={commentOn} />
        </>
      )}
    </div>
  );
}
