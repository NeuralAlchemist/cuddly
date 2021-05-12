// NPM Packages
import React, { useState } from 'react';
import ResponsiveTextArea from '../ResponsiveTextArea';

export default function PostUpdateForm({ onSubmit, post }) {
  // Local State
  const [contentText, setContentText] = useState(post.contentText);
  const [length, setLength] = useState(post.contentText.length);
  const postURL = require('../../assets/images/post.svg');

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
          placeholder="Update your post here."
          contentText={contentText}
          onFormContentChange={onFormContentChange}
          maxLength="1000"
        />
      </div>
      <div>
        <p className="length">{length == null ? 0 : length}/1000</p>
        <button className="button-post" onClick={handleSubmit}>
          <img className="post" src={postURL} alt="Post" />
          <span>Update Post</span>
        </button>
      </div>
    </form>
  );
}
