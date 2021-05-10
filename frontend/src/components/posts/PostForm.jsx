// NPM Packages

import React, { useState } from 'react';
import PostsApi from "../../api/PostsApi";

export default function PostForm({ onSubmit, onImagePostSubmit }) {
  // Local State

  const [contentText, setContentText] = useState('');
  const postObject = require('../../assets/images/post.svg');
  const postURL = postObject;
  const [contentFile, setContentFile] = useState();
  const [isFilePicked, setIsFilePicked] = useState(false);
  const formData = new FormData();
  // Methods
  const handleSubmit = (event) => {
    if(isFilePicked){
      handleImagePostSubmit(event);
    }else {
      // Invoke the passed in event callback
      onSubmit({ contentText: contentText });
      // Clear the input field
      setContentText('');
    }

  };

  const handleImagePostSubmit = (event) => {
    event.preventDefault();
    formData.append('file', contentFile);
    formData.append('text', contentText);
    PostsApi.createImagePost(formData)
        .catch((err) => {
          alert("FAILED");
          console.error(err);
        });
    setContentFile(null);
    setIsFilePicked(false);
  };

  const setFile = async (event) => {
    setContentFile(event.target.files[0]);
    setIsFilePicked(true);
    console.log(`selected file is now: ${event.target.files[0]}`);
  }

  const handleUpload = () => {
    console.log(`make a call to upload endpoint with selected file`);
  }

  return (
    <div className="postform-container">
      <form className="postform">
        <div>
          <div>
            <div className="postform-field">
              <textarea 
                className="postform-input"
                placeholder="What's on your mind?"
                value={contentText}
                onChange={(e) => setContentText(e.target.value)}
              />
            </div>
            <input type="file" onChange={setFile}/>
            <button className="button-post" onClick={handleSubmit}>
              <img className="post" src={postURL} alt="Post" />
              <span>Post</span>
            </button>
          </div>
          </div>
      </form>
    </div>
  );
}
