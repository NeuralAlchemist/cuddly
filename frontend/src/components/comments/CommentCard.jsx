// NPM Packages
import React, { useState } from "react";
import CommentsApi from "../../api/CommentsApi";
import Moment from "react-moment";

// Components
import CommentUpdateForm from "./CommentUpdateForm";
import CommentLikeApi from "../../api/CommentLikeApi";

export default function CommentCard({
  postId,
  comment,
  onDeleteClick,
  currentUser,
}) {
  // Local State
  const [toggle, setToggle] = useState(false);

  // Constants
  const commentCreatorName = comment.relatedCommentUser.name;
  const commentCreatorEmail = comment.relatedCommentUser.email;

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

  async function addCommentLike() {
    try {
      await CommentLikeApi.addCommentLike(comment.id);
    } catch (e) {
      console.error(e);
    }
  }

  async function removeCommentLike() {
    try {
      await CommentLikeApi.removeCommentLike(comment.id);
    } catch (e) {
      console.error(e);
    }
  }

  function checkCommentUserEmail() {
    return commentCreatorEmail === currentUser.email;
  }



  return (
    <div>
      <span>
        {commentCreatorName}: </span>
        <span>{comment.contentText} </span>
        <span>
          <Moment fromNow>{comment.createdTime}</Moment>
        </span>
        <p>{comment.listOfCommentLikes.length} like(s)</p>
        <button onClick={removeCommentLike}>
           Like Comment
        </button>

      {checkCommentUserEmail() && (
        <div>
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
      )}
    </div>
  );
}
