// NPM Packages
import React, { useEffect, useState } from "react";

// Project files
import CommentForm from "../comments/CommentForm";
import CommentList from "../comments/CommentList";
import CommentsApi from "../../api/CommentsApi";
import PostsApi from "../../api/PostsApi";
import UserApi from "../../api/UserApi";
import PostUpdateForm from "./PostUpdateForm";

export default function PostCard({ post, onDeleteClick }) {
  // Local state
  const [comments, setComments] = useState([]);
  const [toggleUpdatePost, setToggleUpdatePost] = useState(false);
  const [currentUser, setCurrentUser] = useState({});

  // Constants
  const postId = post.id;
  const postCreatorName = post.relatedPostUser.name;
  const postCreatorEmail = post.relatedPostUser.email;

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

  function checkUserEmail() {
    return postCreatorEmail === currentUser.email;
  }

  useEffect(() => {
    CommentsApi.getAllComments(postId)
      .then(({ data }) => setComments(data))
      .catch((err) => console.error(err));
  }, [setComments, postId]);

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
        <p>
          {postCreatorName}: {post.contentText}
        </p>
        {checkUserEmail() && (
          <div>
            <button type="button" onClick={onDeleteClick}>Delete</button>
            <button type="button"
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
