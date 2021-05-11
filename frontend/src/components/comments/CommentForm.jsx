// NPM Packages
import React, { useState } from 'react';
import ResponsiveTextArea from '../ResponsiveTextArea';

export default function CommentForm({ post, onSubmit }) {
  // Local State
  const [commentContentText, setCommentContentText] = useState('');
  const [length, setLength] = useState();
  const commentObject = require('../../assets/images/comment.svg');
  const commentURL = commentObject;

  // Methods
  const handleSubmit = () => {
    // Invoke the passed in event callback
    onSubmit(post.id, { contentText: commentContentText });

    // Clear the input field
    setCommentContentText('');
  };

  const onFormContentChange = (value) => {
    setCommentContentText(value);
    setLength(value.length);
  };

  return (
    <form>
      <div className="form-field">
        <ResponsiveTextArea
          placeholder="Write your comment here."
          contentText={commentContentText}
          onFormContentChange={onFormContentChange}
        />
      </div>
      <div>
        <p className="length">{length == null ? 0 : length}/255</p>
        <button className="button-comment" onClick={handleSubmit}>
          <img className="comment" src={commentURL} alt="Commment" />
          <span>Comment</span>
        </button>
      </div>
    </form>
  );
}
