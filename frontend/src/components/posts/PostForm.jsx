// NPM Packages
import React, { useState } from 'react';
import AutoFitContentPlaceholder from '../AutoFitContentPlaceholder';

export default function PostForm({ onSubmit }) {
  // Local State
  const [contentText, setContentText] = useState('');
  const postObject = require('../../assets/images/post.svg');
  const postURL = postObject;

  // Methods
  const handleSubmit = () => {
    // Invoke the passed in event callback
    onSubmit({ contentText: contentText });

    // Clear the input field
    setContentText('');
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
                setContentText={setContentText}
              />
            </div>

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
