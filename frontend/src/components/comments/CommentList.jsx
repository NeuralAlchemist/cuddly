// NPM Packages
import React from 'react';

// Project files
import CommentCard from './CommentCard';

export default function CommentList({
  postId,
  comments,
  onDelete,
  currentUser,
}) {
  // Components
  const CommentCardArray = comments.map((comment) => (
    <CommentCard
      key={comment.id}
      postId={postId}
      comment={comment}
      currentUser={currentUser}
      onDeleteClick={onDelete}
    />
  ));

  return (
    <details className="CommentList">
      <summary className="commentlist-heading">
        Click to show all comments
      </summary>
      {CommentCardArray}
    </details>
  );
}
