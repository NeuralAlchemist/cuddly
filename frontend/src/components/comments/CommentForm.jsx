// NPM Packages
import React from 'react';

export default function CommentForm({ post, onSubmit }) {
  // Local State
  const [commentContentText, setCommentContentText] = React.useState('');
  const commentObject = require('../../assets/images/comment.svg');
  const commentURL = commentObject;

  // Methods
  const handleSubmit = () => {
    // Invoke the passed in event callback
    onSubmit(post.id, { contentText: commentContentText });

    // Clear the input field
    setCommentContentText('');
  };

  return (
    <form>
      <div className="form-field">
        <textarea
          className="form-input"
          placeholder="Write your comment here."
          value={commentContentText}
          onChange={(e) => setCommentContentText(e.target.value)}
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
