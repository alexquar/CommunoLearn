/* eslint-disable @typescript-eslint/no-unsafe-assignment */
"use client";
import type { CommentWithRelations } from "~/types/commentTypes";
import userIcon from "../../../../public/user.svg";
import { formatDistanceToNow } from "date-fns";
import Image from "next/image";
import { useState } from "react";
import { useAuthContext } from "~/context/AuthContext";
import Blob from "../Blob";
import { api } from "~/trpc/react";
import { useRouter } from "next/navigation";
export default function Comment({
  comment,
}: {
  comment: CommentWithRelations;
}) {
    const router = useRouter();
  const { user } = useAuthContext();
  const [optionsOpen, setOptionsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const {mutate:deteleComment} = api.comments.deleteCommentById.useMutation({
        onSuccess: () => {
            console.log("Comment deleted successfully");
            setLoading(false);
            setError(null);
            router.refresh();
        },
        onError: (error) => {
            console.error(error);
            setLoading(false);
            setError("Failed to delete comment");
        },
        });
    const handleDelete = () => {
        setLoading(true);
        setError(null);
        deteleComment({
            id: comment.id,
        });
    }

  return (
    <article className="rounded-lg py-3 text-base">
      <footer className="relative mb-2 flex items-center justify-between">
        <div className="flex items-center">
          <p className="mr-3 inline-flex items-center text-sm font-bold text-accentBrand">
            <Image
              className="mr-2 h-6 w-6 rounded-full border border-primaryBrand"
              src={userIcon}
              alt="User Icon"
            />
            {comment.commentedBy.firstName} {comment.commentedBy.lastName}
          </p>
          <p className="text-sm font-light text-textBrand">
            <time dateTime="2022-02-08" title="February 8th, 2022">
              {formatDistanceToNow(comment.createdAt)}
            </time>
          </p>
        </div>
        {user?.id === comment.commentedBy.id && (
          <button
            className="inline-flex items-center rounded-lg p-2 text-center text-sm font-medium text-secondaryBrand hover:text-secondaryBrand/75 active:text-secondaryBrand/50"
            type="button"
            onClick={() => setOptionsOpen((prev) => !prev)}
          >
            <svg
              className="h-6 w-6"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 16 3"
            >
              <path d="M2 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm6.041 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM14 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Z" />
            </svg>
            <span className="sr-only">Comment settings</span>
          </button>
        )}

        {optionsOpen && (
          <div
            className={`absolute right-0 z-20 mt-24 w-40 divide-y divide-gray-100 rounded border border-gray-200 bg-backgroundBrand shadow-xl transition-transform duration-200 ${
              optionsOpen ? "scale-100 opacity-100" : "scale-95 opacity-0"
            }`}
          >
            <ul className="text-sm font-semibold text-textBrand">

              <li>
                <p onClick={handleDelete} className="block px-4 py-2 hover:bg-secondaryBrand hover:text-white active:bg-secondaryBrand/75">
                  {loading ? "Deleting..." : "Delete"}
                </p>
              </li>
              <li>
                <p className="block px-4 py-2 hover:bg-secondaryBrand hover:text-white active:bg-secondaryBrand/75">
                  Edit Coming Soon
                </p>
              </li>
            </ul>
          </div>
        )}
      </footer>
      <p className="font-semibold my-2 w-11/12 text-textBrand">{comment.text}</p>
      <Blob title={comment.commentCategory} color="textBrand" />
    </article>
  );
}
