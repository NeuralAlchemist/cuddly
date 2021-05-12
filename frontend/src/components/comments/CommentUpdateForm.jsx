// NPM Packages
import React, { useState } from 'react';
import ResponsiveTextArea from '../ResponsiveTextArea';

export default function CommentUpdateForm({ onSubmit, comment }) {
  // Local State
  const [contentText, setContentText] = useState(comment.contentText);
  const [length, setLength] = useState(comment.contentText.length);
  const commentURL = require('../../assets/images/comment.svg');

  // Methods
  const handleSubmit = () => {
    // Invoke the passed in event callback
    onSubmit({ contentText: contentText });

    // Clear the input field
    setContentText('');
  };

  const onFormContentChange = (value) => {
    setContentText(value);
    setLength(value.length);
  };

  return (
    <form>
      <div className="form-field">
        <ResponsiveTextArea
          placeholder="Update your comment here."
          contentText={contentText}
          onFormContentChange={onFormContentChange}
          maxLength="255"
        />
      </div>
      <div>
        <p className="length">{length == null ? 0 : length}/255</p>
        <button className="button-comment" onClick={handleSubmit}>
          <img className="comment" src={commentURL} alt="Commment" />
          <span>Update Comment</span>
        </button>
      </div>
    </form>
  );
}
