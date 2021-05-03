// NPM Packages
import React, { useState } from "react";
import '../posts/postform.css';

export default function PostForm({ onSubmit }) {
  // Local State
  const [contentText, setContentText] = useState("");
  const [contentFile, setContentFile] = useState();
  const [isFilePicked, setIsFilePicked] = useState(false);
  // Methods
  const handleSubmit = () => {
    // Invoke the passed in event callback
    onSubmit({ contentText: contentText });

    // Clear the input field
    setContentText("");
  };

  const setFile = (event) => {
    setContentFile(event.target.files[0]);
    setIsFilePicked(true);
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
          {isFilePicked && (<button onClick={handleUpload}>Upload Image</button>) }
        </div>
      </div>
    </form>
  );
}
