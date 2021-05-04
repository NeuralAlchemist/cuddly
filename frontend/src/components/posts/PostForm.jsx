// NPM Packages
import React, { useState } from "react";
import '../posts/postform.css';
import axios from "axios";

export default function PostForm({ onSubmit, onImagePostSubmit }) {
  // Local State
  const [contentText, setContentText] = useState("");
  // Methods
  const handleSubmit = () => {
    // Invoke the passed in event callback
    onSubmit({ contentText: contentText });

    // Clear the input field
    setContentText("");
  };

  const handleImagePostSubmit = () => {
    const formData = new FormData();
    onImagePostSubmit({formData});
  }

  const setFile = async (event) => {
    const formData = new FormData();
    var file = event.target.files[0];
    console.log(file)
    formData.append('file', event.target.files[0]);
    formData.forEach(item => console.log(item))
    onImagePostSubmit({file: formData});
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
          <input formEncType="multipart/form-data" type="file" onChange={(e) => setFile(e)}/>
          <div>
            <button onClick={handleSubmit}>Post</button>
          </div>
          <button onClick={handleImagePostSubmit}>Upload Image</button>
        </div>
      </div>
    </form>
  );
}
