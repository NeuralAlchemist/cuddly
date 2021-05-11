// NPM Packages
import React, { useState } from 'react';
import AutoFitContentPlaceholder from '../AutoFitContentPlaceholder';

export default function CommentForm({ post, onSubmit }) {
  // Local State
  const [commentContentText, setCommentContentText] = useState('');
  const commentObject = require('../../assets/images/comment.svg');
  const commentURL = commentObject;

  // Methods
  const handleSubmit = () => {
    // Invoke the passed in event callback
    onSubmit(post.id, { contentText: commentContentText });

    // Clear the input field
    setCommentContentText('');
  };

  return (
    <form>
      <div className="form-field">
        <AutoFitContentPlaceholder
          placeholder="Write your comment here."
          contentText={commentContentText}
          setContentText={setCommentContentText}
        />
      </div>
      <div>
        <button className="button-comment" onClick={handleSubmit}>
          <img className="comment" src={commentURL} alt="Commment" />
          <span>Comment</span>
        </button>
      </div>
    </form>
  );
}
