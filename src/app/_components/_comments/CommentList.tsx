import React from "react";
import type { CommentWithRelations } from "~/types/commentTypes";
import Comment from "./Comment";
export default function CommentList({
  comments,
}: {
  comments: CommentWithRelations[];
}) {
  return (
    <section className="py-2 antialiased ">
      <div className="max-w-7xl">
        {comments.map((comment) => (
          <React.Fragment key={comment.id}>
            <Comment comment={comment} />
          </React.Fragment>
        ))}
      </div>
    </section>
  );
}
