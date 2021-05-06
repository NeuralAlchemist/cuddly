// NPM Packages
import React, { useState } from "react";
import CommentsApi from "../../api/CommentsApi";
import Moment from "react-moment";

// Components
import CommentUpdateForm from "./CommentUpdateForm";

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

  function checkCommentUserEmail() {
    return commentCreatorEmail === currentUser.email;
  }

  return (
      <div>
          <span>{commentCreatorName}: </span>
          <span className="word-wrap">{comment.contentText} </span>
          <span>
              <Moment fromNow>{comment.createdTime}</Moment>
          </span>

          {checkCommentUserEmail() && (
              <div>
                  <button onClick={handleDelete}>Delete</button>
                  <button
                      onClick={() =>
                          toggle ? setToggle(false) : setToggle(true)
                      }
                  >
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
