// NPM Packages

import React, { useState } from 'react';

export default function PostForm({ onSubmit, onImagePostSubmit }) {
  // Local State

  const [contentText, setContentText] = useState('');
  const postObject = require('../../assets/images/post.svg');
  const postURL = postObject;
  const [contentFile, setContentFile] = useState();
  const [isFilePicked, setIsFilePicked] = useState(false);

  // Methods
  const handleSubmit = () => {
    // Invoke the passed in event callback
    onSubmit({ contentText: contentText });

    // Clear the input field
    setContentText('');
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
          <button onClick={handleImagePostSubmit}>Upload Image</button>
        </div>
      </form>
    </div>
  );
}
