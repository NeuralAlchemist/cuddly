// NPM Packages

import React from "react";

export default function PostCard({ post, onDeleteClick }) {
  return (
    <div>
      <div>
        <p>{post.body}</p>

        <button onClick={onDeleteClick}>Delete</button>
      </div>
    </div>
  );
}
