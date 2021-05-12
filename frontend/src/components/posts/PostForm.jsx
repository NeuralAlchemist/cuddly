// NPM Packages
import React, { useState } from 'react';
import ResponsiveTextArea from '../ResponsiveTextArea';

export default function PostForm({ onSubmit }) {
  // Local State
  const [contentText, setContentText] = useState('');
  const [length, setLength] = useState();
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
    <div className="form-container">
      <form className="form">
        <div>
          <div>
            <div className="form-field">
              <ResponsiveTextArea
                placeholder="What's on your mind?"
                contentText={contentText}
                onFormContentChange={onFormContentChange}
                maxLength="255"
              />
            </div>
            <p className="length">{length == null ? 0 : length}/255</p>
            <button className="button-post" onClick={handleSubmit}>
              <img className="post" src={postURL} alt="Post" />
              <span>Post</span>
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
