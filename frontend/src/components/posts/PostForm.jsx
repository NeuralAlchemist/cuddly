// NPM Packages
import React, { useState } from "react";
import '../posts/postform.css';

export default function PostForm({ onSubmit }) {
  // Local State
  const [contentText, setContentText] = useState("");

  // Methods
  const handleSubmit = () => {
    // Invoke the passed in event callback
    onSubmit({ contentText: contentText });

    // Clear the input field
    setContentText("");
  };

  const setFile = (event) => {
    console.log(`selected file is now: ${event.target.files[0]}`);
  }

  const handleUpload = () => {
    console.log(`make a call to upload endpoint with selected file`);
  }

  return (
    <form className="postform">
      <div>
        <h4>What's on your mind?</h4>
        <div>
          <div>
            <textarea value={contentText} onChange={(e) => setContentText(e.target.value)} />
          </div>
          <input type="file" onChange={setFile}/>
          <div>
            <button onClick={handleSubmit}>Post</button>
          </div>
          <button onClick={handleUpload}>Upload Image</button>
        </div>
      </div>
    </form>
  );
}
