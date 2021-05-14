// NPM Packages
import React, { useEffect, useState } from "react";
import Moment from "react-moment";
import ReactPlayer from "react-player";

// Project files
import CommentForm from "../comments/CommentForm";
import CommentList from "../comments/CommentList";
import CommentsApi from "../../api/CommentsApi";
import PostsApi from "../../api/PostsApi";
import PostUpdateForm from "./PostUpdateForm";
import PostLikeApi from "../../api/PostLikeApi";
import UserApi from "../../api/UserApi";

export default function PostCard({ post, currentUser, onDeleteClick, buddies }) {
  // Local state
  const [comments, setComments] = useState([]);
  const [toggleUpdatePost, setToggleUpdatePost] = useState(false);
  // const [buddies, setBuddies] = useState([]);
  const [user, setUser] = useState({});

  // Constants
  const postId = post.id;
  const postCreatorName = post.relatedPostUser.name;
  const postCreatorEmail = post.relatedPostUser.email;
  const postCreatorId = post.relatedPostUser.id;
  const listOfLikedUsers = post.listOfLikes.map((like) => like.likedUser);
  let listOfBuddyIds = buddies.map(bud => bud.id);
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
    } catch (e) {
      console.error(e);
    }
  }

  async function startFollowing() {
    try {
      await UserApi.followBuddy(postCreatorId);
    } catch (e) {
      console.error(e);
    }
  }

  async function unfollow() {
    try {
      await UserApi.unfollowBuddy(postCreatorId);
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
  console.log("LIST", listOfBuddyIds)

  // function buddyCheck() {
  //   const buddyId = 
  // }

  useEffect(() => {
    CommentsApi.getAllComments(postId)
      .then(({ data }) => setComments(data))
      .catch((err) => console.error(err));
  }, [setComments, postId]);

  useEffect(() => {
    UserApi.getUser()
      .then(({ data }) => setUser(data))
      .catch((err) => console.error(err));
  }, []);

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
            <button onClick={startFollowing}>follow this buddy</button>
            <button onClick={unfollow}>unfollow this buddy</button>
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
        <CommentForm post={post} onSubmit={createComment} />
      </div>
    </div>
  );
}
