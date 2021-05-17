// NPM Packages
import React, { useState } from "react";
import CommentsApi from "../../api/CommentsApi";
import Moment from "react-moment";
import ReactPlayer from "react-player";

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
  const [likes, setLikes] = useState(comment.listOfCommentLikes.length);
  const [listOfCommentLikedUsers, setListOfCommentLikedUsers] = useState(
    comment.listOfCommentLikes.map(
    (commentLike) => commentLike.likedCommentUser
  ));
  const hasImage =
    comment.mediaType == null ? false : comment.mediaType.includes("image");
  const hasVideo =
    comment.mediaType == null ? false : comment.mediaType.includes("video");

  // Constants
  const commentCreatorName = comment.relatedCommentUser.name;
  const commentCreatorEmail = comment.relatedCommentUser.email;

  // Methods
  const handleDelete = () => {
    // Invoke the passed in event callback
    onDeleteClick(postId, comment);
  };

  async function updateComment(contentText) {
    try {
      let formData = new FormData();
      formData.append("text", contentText);
      await CommentsApi.updateComment(postId, comment.id, formData);
    } catch (e) {
      console.error(e);
    }
  }

  async function addCommentLike() {
    try {
      await CommentLikeApi.addCommentLike(comment.id);
      const newLikes = likes+1;
      setLikes(newLikes);
      const newListOfCommentLikedUsers = listOfCommentLikedUsers.concat(currentUser);
      setListOfCommentLikedUsers(newListOfCommentLikedUsers);
    } catch (e) {
      console.error(e);
    }
  }

  async function removeCommentLike() {
    try {
      await CommentLikeApi.removeCommentLike(comment.id);
      const newLikes = likes-1;
      setLikes(newLikes);
      const newListOfCommentLikedUsers = listOfCommentLikedUsers.filter((p) => p.email !== currentUser.email);
      setListOfCommentLikedUsers(newListOfCommentLikedUsers);
    } catch (e) {
      console.error(e);
    }
  }

  function commentLikeAction() {
    if (checkForCommentLikeUser()) {
      removeCommentLike();
    } else {
      addCommentLike();
    }
  }

  function checkCommentUserEmail() {
    return commentCreatorEmail === currentUser.email;
  }

  function checkForCommentLikeUser() {
    const likeUserEmail = listOfCommentLikedUsers.find(
      (user) => user.email === currentUser.email
    );
    return likeUserEmail != null;
  }

  return (
    <div className="comment-card">
      <div className="postcard-header">
        <div className="post-info">{commentCreatorName}</div>
        <div className="delete-edit-icons">
          {checkCommentUserEmail() && (
            <span>
              <button
                className="button-post-card delete-icon"
                onClick={handleDelete}
              />
              <button
                className={`button-post-card ${toggle ? " cancel" : " active"}`}
                onClick={() => (toggle ? setToggle(false) : setToggle(true))}
              />
            </span>
          )}
        </div>
        <Moment className="time-lapse" fromNow>
          {comment.createdTime}
        </Moment>
      </div>
      <div className="word-wrap comment-content">
        {!toggle ? (
          <p>{comment.contentText}</p>
        ) : (
          <div>
            <CommentUpdateForm onSubmit={updateComment} comment={comment} />
          </div>
        )}
      </div>
      {hasImage && (
        <img
          src={`data:${comment.imageType};base64, ${comment.image}`}
          height="100%"
          width="100%"
        />
      )}
      {hasVideo && (
        <ReactPlayer
          url={require(`../../videos/comment/${comment.videoName}`)}
          width="100%"
          className="post-video"
          controls={true}
        />
      )}
      <div className="like-container">
        <button 
          onClick={commentLikeAction}
          className={`like-button button-post-card ${
            checkForCommentLikeUser() ? "liked" : "not-liked"
          }`}
        ></button>
        <span className="like-counter"> {likes}</span>
      </div>
    </div>
  );
}
