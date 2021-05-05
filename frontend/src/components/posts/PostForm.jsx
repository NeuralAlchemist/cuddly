// NPM Packages
import React, { useState } from 'react';
import '../posts/postform.css';

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
    <div className="postform-container">
      <form className="postform">
        <div>
          <div>
            <div className="postform-field">
              <input
                className="postform-input"
                type="content-text"
                placeholder="What's on your mind?"
                value={contentText}
                onChange={(e) => setContentText(e.target.value)}
              />
            </div>

            <button className="button-post" onClick={onSubmit}>
              <img className="post" src={postURL} alt="Post" />
              <span>Post</span>
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
