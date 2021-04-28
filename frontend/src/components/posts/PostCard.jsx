// NPM Packages
import React, { useEffect, useState } from "react";

// Project files
import CommentForm from "../comments/CommentForm";
import CommentList from "../comments/CommentList";
import CommentsApi from "../../api/CommentsApi";
import PostsApi from "../../api/PostsApi";
import PostUpdateForm from "./PostUpdateForm";

export default function PostCard({ post, onDeleteClick }) {
  // Local state
  const [comments, setComments] = useState([]);
  const [toggleUpdatePost, setToggleUpdatePost] = useState(false);

  // Constants
  const postId = post.id;

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

  useEffect(() => {
    CommentsApi.getAllComments(postId)
      .then(({ data }) => setComments(data))
      .catch((err) => console.error(err));
  }, [setComments, postId]);

  return (
    <div>
      <div>
        <p>{post.contentText}</p>
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
        <CommentList
          postId={postId}
          comments={comments}
          onDelete={deleteComment}
        />
        <CommentForm post={post} onSubmit={createComment} />
      </div>
    </div>
  );
}
