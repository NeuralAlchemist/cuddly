// NPM Packages
import React, { useState, useRef, useEffect } from 'react';

export default function CommentForm({ post, onSubmit }) {
  // Local State
  const [commentContentText, setCommentContentText] = React.useState('');
  const commentObject = require('../../assets/images/comment.svg');
  const commentURL = commentObject;
  const textArea = useRef(null);

  // Methods
  const handleSubmit = () => {
    // Invoke the passed in event callback
    onSubmit(post.id, { contentText: commentContentText });

    // Clear the input field
    setCommentContentText('');
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
  }, [commentContentText]);

  const onTextAreaValueChange = (value) => {
    setCommentContentText(value);
  };

  return (
    <form>
      <div className="form-field">
        <textarea
          ref={textArea}
          className="form-input"
          placeholder="Write your comment here."
          value={commentContentText}
          onChange={(e) => onTextAreaValueChange(e.target.value)}
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
