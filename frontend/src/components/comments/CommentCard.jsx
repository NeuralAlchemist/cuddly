// NPM Packages
import React, { useState } from "react";
import CommentsApi from "../../api/CommentsApi";
// Components
import CommentUpdateForm from "./CommentUpdateForm";

export default function CommentCard({ postId, comment, onDeleteClick }) {
  // Local State
  const [toggle, setToggle] = useState(false);

  // Methods
  const handleDelete = () => {
    // Invoke the passed in event callback
    onDeleteClick(postId, comment);
  };

  async function updateComment(updatedComment) {
    try {
      await CommentsApi.updateComment(postId, comment.id, updatedComment);
    } catch (e) {
      console.error(e);
    }
  }

  return (
    <div>
      <p>{comment.contentText}</p>
      <button onClick={handleDelete}>Delete</button>
      <button onClick={() => (toggle ? setToggle(false) : setToggle(true))}>
        {toggle ? "Cancel Update" : "Update"}
      </button>
      {toggle && (
        <CommentUpdateForm
          onSubmit={(commentData) => updateComment(commentData)}
          comment={comment}
        />
      )}
    </div>
  );
}
