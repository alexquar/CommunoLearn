"use client";
import { useAuthContext } from "~/context/AuthContext";
import { useState } from "react";
import { api } from "~/trpc/react";
import { useRouter } from "next/navigation";
import ErrorNotification from "../_general/ErrorNotification";
export default function CommentForm({
  associatedId,
  commentOn,
  passedComment = "",
  passedCategory = "praise",
  id = ""
}: {
  associatedId: number | string | undefined;
  commentOn: string | undefined;
  passedComment?: string;
  passedCategory?: string;
  id?: string;
}) {
  const { user } = useAuthContext();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [comment, setComment] = useState<string>(passedComment);
  const [category, setCategory] = useState<string>(passedCategory);
  const { mutate: newComment } = api.comments.createNewComment.useMutation({
    onSuccess: () => {
      console.log("Comment added successfully");
      setLoading(false);
      setError(null);
      setComment("");
      setCategory("");
      router.refresh();
    },
    onError: (error) => {
      console.error(error);
      setLoading(false);
      setError("Failed to add comment");
    },
  });

  const { mutate: editComment } = api.comments.editCommentById.useMutation({
    onSuccess: () => {
      console.log("Comment edited successfully");
      setLoading(false);
      setError(null);
      setComment("");
      setCategory("");
      router.refresh();
    },
    onError: (error) => {
      console.error(error);
      setLoading(false);
      setError("Failed to edit comment");
    },
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    if(associatedId === undefined) {
      // If associatedId is undefined, we are editing a comment
      editComment({
        id: id,
        text: comment,
        commentCategory: category as
          | "other"
          | "update"
          | "suggestion"
          | "question"
          | "concern"
          | "praise",
      })
      return;
    }

    switch (commentOn) {
      case "project":
        newComment({
          userId: user?.id ?? "",
          text: comment,
          projectId: associatedId as number,
          commentCategory: category as
            | "other"
            | "update"
            | "suggestion"
            | "question"
            | "concern"
            | "praise",
        });
        break;
      case "todo":
        newComment({
          userId: user?.id ?? "",
          text: comment,
          todoId: associatedId as number,
          commentCategory: category as
            | "other"
            | "update"
            | "suggestion"
            | "question"
            | "concern"
            | "praise",
        });
        break;
      case "meeting":
        newComment({
          userId: user?.id ?? "",
          text: comment,
          meetingId: associatedId as number,
          commentCategory: category as
            | "other"
            | "update"
            | "suggestion"
            | "question"
            | "concern"
            | "praise",
        });
        break;
      case "community":
        newComment({
          userId: user?.id ?? "",
          text: comment,
          communityId: associatedId as number,
          commentCategory: category as
            | "other"
            | "update"
            | "suggestion"
            | "question"
            | "concern"
            | "praise",
        });
        break;
      default:
        break;
    }
  };

  return (
    <div>
      {associatedId !== undefined && 
      <div className="mt-4 flex items-center justify-between">
        <h2 className="my-3 mb-6 text-lg font-bold text-accentBrand lg:text-2xl">
          Add to the discussion
        </h2>
      </div>
}
      <form onSubmit={handleSubmit} className="flex flex-col">
        <div className="max-w-3xl rounded-lg rounded-t-lg border border-primaryBrand bg-white px-4 py-2">
          <label htmlFor="comment" className="sr-only">
            Your comment
          </label>
          <textarea
            id="comment"
            rows={6}
            className="w-full border-0 text-sm text-textBrand focus:outline-none focus:ring-0"
            placeholder={associatedId === undefined ? "Edit the comment..." : "Write a comment..."}
            required
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          ></textarea>
        </div>
        <span className="my-6">
          <label className="mb-2 block text-sm font-medium text-accentBrand">
            Comment Type
          </label>
          <select
            className="block w-full max-w-xs rounded-lg border-2 border-primaryBrand bg-white p-2.5 text-sm text-textBrand placeholder-textBrand outline-primaryBrand"
            required
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="praise">Praise</option>
            <option value="update">Update</option>
            <option value="suggestion">Suggestion</option>
            <option value="question">Question</option>
            <option value="concern">Concern</option>
            <option value="other">Other</option>
          </select>
        </span>
        <div className="flex flex-row gap-x-2">
          {
            associatedId === undefined ? (
              <button
            type="submit"
            className="inline-flex w-fit items-center font-normal text-base rounded-3xl bg-secondaryBrand px-10 py-3 text-center text-white hover:bg-secondaryBrand/75"
          >
            {loading ? "Editing Comment..." : "Edit Comment"}
          </button>
            ) :
          (
          <button
            type="submit"
            className="inline-flex w-fit items-center font-normal text-base rounded-3xl bg-secondaryBrand px-10 py-3 text-center text-white hover:bg-secondaryBrand/75"
          >
            {loading ? "Adding Comment..." : "Add Comment"}
          </button>
          )
}
          {error && (
            <span className="w-fit">
              <ErrorNotification message={error} />
            </span>
          )}
        </div>
      </form>
    </div>
  );
}
