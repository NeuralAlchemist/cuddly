// NPM Packages

import React from "react";

export default function PostCard({ post, onDeleteClick }) {
  return (
    <div>
      <div>
        <p>{post.contentText}</p>

        <button onClick={onDeleteClick}>Delete</button>
      </div>
    </div>
  );
}
