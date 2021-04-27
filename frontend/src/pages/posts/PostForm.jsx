// NPM Packages
import React, { useState } from "react";

export default function PostForm({ onSubmit }) {
  // Local State
  const [body, setBody] = useState("");

  // Methods
  const handleSubmit = () => {
    // Invoke the passed in event callback
    onSubmit({ body: body });

    // Clear the input field
    setBody("");
  };

  return (
    <div>
      <div>
        <h4>What's on your mind?</h4>
        <div>
          <div>
            <textarea value={body} onChange={(e) => setBody(e.target.value)} />
          </div>
          <div>
            <button onClick={handleSubmit}>Post</button>
          </div>
        </div>
      </div>
    </div>
  );
}
