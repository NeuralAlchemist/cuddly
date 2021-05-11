// NPM Packages
import React, { useState } from "react";
import ResponsiveTextArea from '../ResponsiveTextArea';

export default function PostUpdateForm({ onSubmit, post }) {
  // Local State
  const [contentText, setContentText] = useState(post.contentText);
  const [length, setLength] = useState(post.contentText.length);
  const postObject = require('../../assets/images/post.svg');
  const postURL = postObject;

  // Methods
  const handleSubmit = () => {
    // Invoke the passed in event callback
    onSubmit({ contentText: contentText });

    // Clear the input field
    setContentText("");
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
          maxLength="255"
        />
      </div>
      <div>
      <p className="length">{length == null ? 0 : length}/255</p>
            <button className="button-post" onClick={handleSubmit}>
              <img className="post" src={postURL} alt="Post" />
              <span>Update Post</span>
              </button>
              </div>
    </form>
  );
}
