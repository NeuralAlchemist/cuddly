// NPM Packages
import React, { useState } from 'react';
import AutoFitContentPlaceholder from '../AutoFitContentPlaceholder';

export default function PostForm({ onSubmit }) {
  // Local State
  const [contentText, setContentText] = useState('');
  const [length, setLength] = useState();
  const postObject = require('../../assets/images/post.svg');
  const postURL = postObject;

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
              <AutoFitContentPlaceholder
                placeholder="What's on your mind?"
                contentText={contentText}
                onFormContentChange={onFormContentChange}
              />
            </div>
            <div>
              <button className="button-post" onClick={handleSubmit}>
                <img className="post" src={postURL} alt="Post" />
                <span>Post</span>
              </button>
              <p>{length == null ? 0 : length}/255</p>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
