// NPM Packages

import React, { useState, useRef, useEffect } from 'react';

export default function PostForm({ onSubmit }) {
  // Local State
  const [contentText, setContentText] = useState('');
  const postObject = require('../../assets/images/post.svg');
  const postURL = postObject;

  const textArea = useRef(null);

  // Methods
  const handleSubmit = () => {
    // Invoke the passed in event callback
    onSubmit({ contentText: contentText });

    // Clear the input field
    setContentText('');
  };
  // Make textArea placeholder's height adaptive to the content
  useEffect(() => {
    const originalHeight = '52px';
    textArea.current.style.height = originalHeight;
    // counter 4px of padding included in scrollHeight
    const newHeight = textArea.current.scrollHeight - 4;
    textArea.current.style.height = `${newHeight}px`;
    if (newHeight > 200) {
      textArea.current.style.overflowY = 'scroll';
    } else {
      textArea.current.style.overflowY = 'none';
    }
  }, [contentText]);

  const onTextAreaValueChange = (value) => {
    setContentText(value);
  };

  return (
    <div className="form-container">
      <form className="form">
        <div>
          <div>
            <div className="form-field">
              <textarea
                ref={textArea}
                className="form-input"
                placeholder="What's on your mind?"
                value={contentText}
                onChange={(e) => onTextAreaValueChange(e.target.value)}
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
