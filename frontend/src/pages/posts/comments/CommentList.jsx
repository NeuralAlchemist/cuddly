// NPM Packages
import React from "react";

// Project files
import CommentCard from "./CommentCard";

export default function CommentList({ comments, onDelete }) {
  // Components
  const CommentCardArray = comments.map((comment) => (
    <CommentCard key={comment.id} comment={comment} onDeleteClick={onDelete} />
  ));

  return <div className="CommentList">{CommentCardArray}</div>;
}
