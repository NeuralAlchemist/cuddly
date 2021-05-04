// NPM Packages
import React, { useState } from "react";
import '../posts/postform.css';

export default function PostForm({ onSubmit, onImagePostSubmit }) {
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

  const handleImagePostSubmit = () => {
    const formData = new FormData();
    formData.append('image',contentFile);
    onImagePostSubmit({formData,contentText});
    setContentFile(null);
    setContentText("");
    setIsFilePicked(false);
  }
  const setFile = (event) => {
    setContentFile(event.target.files[0]);
    setIsFilePicked(true);
    const formData = new FormData();
    formData.append('file', contentFile);
    formData.append('contentText', contentText);
    formData.forEach(item => console.log(item))
    console.log(formData);
    console.log(formData.contentText)
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
          <button onClick={handleImagePostSubmit}>Upload Image</button>
        </div>
      </div>
    </form>
  );
}
