// NPM Packages
import React from 'react';

export default function CommentForm({ post, onSubmit }) {
  // Local State
  const [commentContentText, setCommentContentText] = React.useState('');

  // Methods
  const handleSubmit = () => {
    // Invoke the passed in event callback
    onSubmit(post.id, { contentText: commentContentText });

    // Clear the input field
    setCommentContentText('');
  };

  return (
    <form>
      <div className="postform-field">
        <textarea
          className="postform-input"
          placeholder="Comment"
          value={commentContentText}
          onChange={(e) => setCommentContentText(e.target.value)}
        />
      </div>
      <div>
        <button className="button-comment" onClick={handleSubmit}>
          <span>Comment</span>
        </button>
      </div>
    </form>
  );
}
