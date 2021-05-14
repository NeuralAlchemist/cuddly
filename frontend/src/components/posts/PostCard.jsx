// NPM Packages
import React, { useEffect, useState } from "react";
import Moment from "react-moment";
import ReactPlayer from "react-player";
<<<<<<< HEAD
<<<<<<< HEAD

=======
>>>>>>> 22c89f4 (Mulitple edits)
=======

>>>>>>> 7ffbbd3 (Before git rebase)
// Project files
import CommentForm from "../comments/CommentForm";
import CommentList from "../comments/CommentList";
import CommentsApi from "../../api/CommentsApi";
import PostsApi from "../../api/PostsApi";
import PostUpdateForm from "./PostUpdateForm";
import PostLikeApi from "../../api/PostLikeApi";

<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> 7ffbbd3 (Before git rebase)
export default function PostCard({ post, currentUser, onDeleteClick }) {
  // Local state
  const [comments, setComments] = useState([]);
  const [toggleUpdatePost, setToggleUpdatePost] = useState(false);
<<<<<<< HEAD
=======
export default function PostCard({ post, onDeleteClick }) {
    // Local state
    const [comments, setComments] = useState([]);
    const [toggleUpdatePost, setToggleUpdatePost] = useState(false);
    const [currentUser, setCurrentUser] = useState({});
    const hasImage =
        post.imageType == null ? false : post.imageType.includes("image");
    const hasVideo =
        post.imageType == null ? false : post.imageType.includes("video");
>>>>>>> 22c89f4 (Mulitple edits)
=======
>>>>>>> 7ffbbd3 (Before git rebase)

  // Constants
  const postId = post.id;
  const postCreatorName = post.relatedPostUser.name;
  const postCreatorEmail = post.relatedPostUser.email;
  const listOfLikedUsers = post.listOfLikes.map((like) => like.likedUser);
  const hasImage =
    post.mediaType == null ? false : post.mediaType.includes("image");
  const hasVideo =
    post.mediaType == null ? false : post.mediaType.includes("video");

  // Methods
  async function updatePost(updatedPost) {
    try {
      await PostsApi.updatePost(updatedPost, post.id);
    } catch (e) {
      console.error(e);
    }
  }

  async function createComment(postId, commentData) {
    try {
      const response = await CommentsApi.createComment(postId, commentData);
      const comment = response.data;
      const newComments = comments.concat(comment);
      setComments(newComments);
    } catch (e) {
      console.error(e);
    }
  }

<<<<<<< HEAD
  async function deleteComment(postId, commentToDelete) {
    try {
      await CommentsApi.deleteComment(postId, commentToDelete.id);
      const newComments = comments.filter(
        (comment) => comment.id !== commentToDelete.id
      );
      setComments(newComments);
    } catch (e) {
      console.error(e);
    }
  }

  function likeAction() {
    if (checkForLikedUser()) {
      removeLike();
    } else {
      addLike();
    }
    window.location.reload();
  }

  async function addLike() {
    try {
      await PostLikeApi.addLike(postId);
    } catch (e) {
      console.error(e);
    }
  }

  async function removeLike() {
    try {
      await PostLikeApi.removeLike(postId);
=======
  async function createCommentMedia(imageFile) {
    try {
      let formData = new FormData();
      console.log(imageFile);
      formData.append("file", imageFile.contentFile);
      formData.append("text", imageFile.contentText);
      await CommentsApi.createImageComment(formData);
    } catch (e) {
      console.error(e);
    }
    window.location.reload()
  }

  async function deleteComment(postId, commentToDelete) {
    try {
      await CommentsApi.deleteComment(postId, commentToDelete.id);
      const newComments = comments.filter(
        (comment) => comment.id !== commentToDelete.id
      );
      setComments(newComments);
    } catch (e) {
      console.error(e);
    }
  }

  function likeAction() {
    if (checkForLikedUser()) {
      removeLike();
    } else {
      addLike();
    }
    window.location.reload();
  }

  async function addLike() {
    try {
      await PostLikeApi.addLike(postId);
>>>>>>> 7ffbbd3 (Before git rebase)
    } catch (e) {
      console.error(e);
    }
  }

<<<<<<< HEAD
  function checkUserEmail() {
    return postCreatorEmail === currentUser.email;
  }

  function checkForLikedUser() {
    const likedEmail = listOfLikedUsers.find(
      (user) => user.email === currentUser.email
    );
    return likedEmail != null;
  }

<<<<<<< HEAD
  useEffect(() => {
    CommentsApi.getAllComments(postId)
      .then(({ data }) => setComments(data))
      .catch((err) => console.error(err));
  }, [setComments, postId]);

  return (
    <div className="PostCard">
      <div>
        <div className="postcard-header">
          <div className="post-info">{postCreatorName} posted</div>
          <div className="delete-edit-icons">
            {checkUserEmail() && (
              <span>
                <button
                  className="button-post-card delete-icon"
                  onClick={onDeleteClick}
                ></button>
                <button
                  className={`button-post-card ${
                    toggleUpdatePost ? " cancel" : " active"
                  }`}
                  onClick={() =>
                    toggleUpdatePost
                      ? setToggleUpdatePost(false)
                      : setToggleUpdatePost(true)
                  }
                ></button>
              </span>
            )}
          </div>
        </div>
        <Moment className="time-lapse" fromNow>
          {post.createdTime}
        </Moment>
        <p className="content-text word-wrap">
          {!toggleUpdatePost ? (
            post.contentText
          ) : (
            <div>
              <span>
                <PostUpdateForm
                  onSubmit={(postData) => updatePost(postData)}
                  post={post}
=======
    useEffect(() => {
        UserApi.getUser()
            .then(({ data }) => {
                setCurrentUser(data);
            })
            .catch((err) => console.error(err));
    }, [setCurrentUser]);
=======
  async function removeLike() {
    try {
      await PostLikeApi.removeLike(postId);
    } catch (e) {
      console.error(e);
    }
  }

  function checkUserEmail() {
    return postCreatorEmail === currentUser.email;
  }

  function checkForLikedUser() {
    const likedEmail = listOfLikedUsers.find(
      (user) => user.email === currentUser.email
    );
    return likedEmail != null;
  }

  useEffect(() => {
    CommentsApi.getAllComments(postId)
      .then(({ data }) => setComments(data))
      .catch((err) => console.error(err));
  }, [setComments, postId]);
>>>>>>> 7ffbbd3 (Before git rebase)

  return (
    <div className="PostCard">
      <div>
        <div className="postcard-header">
          <div className="post-info">{postCreatorName} posted</div>
          <div className="delete-edit-icons">
            {checkUserEmail() && (
              <span>
                <button
                  className="button-post-card delete-icon"
                  onClick={onDeleteClick}
                ></button>
                <button
                  className={`button-post-card ${
                    toggleUpdatePost ? " cancel" : " active"
                  }`}
                  onClick={() =>
                    toggleUpdatePost
                      ? setToggleUpdatePost(false)
                      : setToggleUpdatePost(true)
                  }
                ></button>
              </span>
            )}
          </div>
        </div>
        <Moment className="time-lapse" fromNow>
          {post.createdTime}
        </Moment>
        <p className="content-text word-wrap">
          {!toggleUpdatePost ? (
            post.contentText
          ) : (
            <div>
<<<<<<< HEAD
                <div className="postcard-header">
                    <div className="post-info">{postCreatorName} posted</div>
                    <div className="delete-edit-icons">
                        {checkUserEmail() && (
                            <span>
                                <button
                                    className="button-post-card delete-icon"
                                    onClick={onDeleteClick}
                                ></button>
                                <button
                                    className={`button-post-card ${
                                        toggleUpdatePost ? " cancel" : " active"
                                    }`}
                                    onClick={() =>
                                        toggleUpdatePost
                                            ? setToggleUpdatePost(false)
                                            : setToggleUpdatePost(true)
                                    }
                                ></button>
                            </span>
                        )}
                    </div>
                </div>
                <Moment className="time-lapse" fromNow>
                    {post.createdTime}
                </Moment>
                <p className="content-text word-wrap">
                    {!toggleUpdatePost ? (
                        post.contentText
                    ) : (
                        <div>
                            <span>
                                <PostUpdateForm
                                    onSubmit={(postData) =>
                                        updatePost(postData)
                                    }
                                    post={post}
                                />
                            </span>
                            <span></span>
                        </div>
                    )}
                </p>
                {hasImage && (
                    <img
                        src={`data:${post.imageType};base64, ${post.image}`}
                        height="100%"
                        width="100%"
                    />
                )}
                {hasVideo && (
                    <ReactPlayer
                        url={require(`../../videos/${post.videoName}`)}
                        width="100%"
                        height="100%"
                        controls={true}
                    />
                )}
                <div className="like-container">
                    <button
                        onClick={likeAction}
                        className={`like-button button-post-card ${
                            checkForLikedUser() ? "liked" : "not-liked"
                        }`}
                    ></button>
                    <span className="like-counter">
                        {" "}
                        {post.listOfLikes.length}
                    </span>
                </div>
                <CommentList
                    postId={postId}
                    comments={comments}
                    currentUser={currentUser}
                    onDelete={deleteComment}
>>>>>>> 8d9c8c3 (add image and video tag to display)
=======
              <span>
                <PostUpdateForm
                  onSubmit={(postData) => updatePost(postData)}
                  post={post}
>>>>>>> 7ffbbd3 (Before git rebase)
                />
              </span>
              <span></span>
            </div>
          )}
        </p>
        {hasImage && (
          <img
            src={`data:${post.imageType};base64, ${post.image}`}
            height="100%"
            width="100%"
          />
        )}
        {hasVideo && (
          <ReactPlayer
            url={require(`../../videos/${post.videoName}`)}
            width="100%"
            height="100%"
            controls={true}
          />
        )}
        <div className="like-container">
          <button
            onClick={likeAction}
            className={`like-button button-post-card ${
              checkForLikedUser() ? "liked" : "not-liked"
            }`}
          ></button>
          <span className="like-counter"> {post.listOfLikes.length}</span>
        </div>
        <CommentList
          postId={postId}
          comments={comments}
          currentUser={currentUser}
          onDelete={deleteComment}
        />
<<<<<<< HEAD
        <CommentForm post={post} onSubmit={createComment} />
=======
        <CommentForm post={post} onSubmit={createComment} onSubmitMedia={createCommentMedia} />
>>>>>>> 7ffbbd3 (Before git rebase)
      </div>
    </div>
  );
}
