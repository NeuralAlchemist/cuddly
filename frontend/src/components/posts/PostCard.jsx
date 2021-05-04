// NPM Packages
import React, { useEffect, useState } from "react";
import Moment from "react-moment";

// Project files
import CommentForm from "../comments/CommentForm";
import CommentList from "../comments/CommentList";
import CommentsApi from "../../api/CommentsApi";
import PostsApi from "../../api/PostsApi";
import UserApi from "../../api/UserApi";
import PostUpdateForm from "./PostUpdateForm";
import PostLikeApi from "../../api/PostLikeApi";

export default function PostCard({ post, onDeleteClick }) {
  // Local state
  const [comments, setComments] = useState([]);
  const [toggleUpdatePost, setToggleUpdatePost] = useState(false);
  const [currentUser, setCurrentUser] = useState({});
  const [postLikes, setPostLikes] = useState([]);
  const [liked, setLiked] = useState(false);


  // Constants
  const postId = post.id;
  const postCreatorName = post.relatedPostUser.name;
  const postCreatorEmail = post.relatedPostUser.email;
  const listOfLikedUsers = post.listOfLikes.map((like) => like.likedUser);

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

  async function addLike() {
    try {
      const response = await PostLikeApi.addLike(postId);
      const like = response.data;
      const newPostLike = postLikes.concat(like);
      setPostLikes(newPostLike)
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

  function checkUserEmail() {
    return postCreatorEmail === currentUser.email;
  }

  function checkForLikedUser() {
    return listOfLikedUsers.map((user) => user === currentUser.name);
  }

  useEffect(() => {
    CommentsApi.getAllComments(postId)
      .then(({ data }) => setComments(data))
      .catch((err) => console.error(err));
  }, [setComments, postId]);

  useEffect(() => {
    PostLikeApi.getAllPostLikes(postId)
      .then(({ data }) => setPostLikes(data))
      .catch((err) => console.error(err));
  }, [setPostLikes, postId]);

  useEffect(() => {
    UserApi.getUser()
      .then(({ data }) => {
        setCurrentUser(data);
      })
      .catch((err) => console.error(err));
  }, [setCurrentUser]);

  return (
    <div>
      <div>
        <span>{postCreatorName} </span>
        <span>
          <Moment fromNow>{post.createdTime}</Moment>
        </span>
        <p>{post.contentText}</p>
        <p>{postLikes.length} like(s)</p>
        <button onClick={(postId) => addLike(postId)}>
          {liked ? "Dislike" : "Like"}
        </button>
        {checkUserEmail() && (
          <div>
            <button onClick={onDeleteClick}>Delete</button>
            <button
              onClick={() =>
                toggleUpdatePost
                  ? setToggleUpdatePost(false)
                  : setToggleUpdatePost(true)
              }
            >
              {toggleUpdatePost ? "Cancel Update" : "Update"}
            </button>
            {toggleUpdatePost && (
              <PostUpdateForm
                onSubmit={(postData) => updatePost(postData)}
                post={post}
              />
            )}
          </div>
        )}
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
