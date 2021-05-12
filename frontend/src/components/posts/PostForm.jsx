// NPM Packages

import React, { useState } from 'react';
import ResponsiveTextArea from '../ResponsiveTextArea';
import PostsApi from "../../api/PostsApi";

export default function PostForm({ onSubmit, onSubmitMedia }) {
  // Local State

  const [contentText, setContentText] = useState('');
  const [length, setLength] = useState();
  const postURL = require('../../assets/images/post.svg');
  const [contentFile, setContentFile] = useState();
  const [isFilePicked, setIsFilePicked] = useState(false);
  const formData = new FormData();
  
  // Methods
  const handleSubmit = (event) => {
    if (isFilePicked) {
      event.preventDefault();
      onSubmitMedia({ contentFile, contentText });
      setContentFile(null);
      setIsFilePicked(false);
    } else {
      // Invoke the passed in event callback
      onSubmit({ contentText: contentText });
      // Clear the input field
      setContentText("");
    }

  };

  const onFormContentChange = (value) => {
    setContentText(value);
    setLength(value.length);
  };
  
  const handleImagePostSubmit = (event) => {
    event.preventDefault();
    console.log("inside content   " ,contentFile);
    onSubmitMedia({file: contentFile, text: contentText});
    setContentFile(null);
    setIsFilePicked(false);
  };

  const setFile = (event) => {
    setContentFile(event.target.files[0]);
    setIsFilePicked(true);
    console.log(`selected file is now: ${event.target.files[0]}`);
  };

  return (
    <div className="form-container">
      <form className="form">
        <div>
          <div>
            <div className="form-field">
              <ResponsiveTextArea
                placeholder="What's on your mind?"
                contentText={contentText}
                onFormContentChange={onFormContentChange}
                maxLength="255"
              />
            </div>
            <p className="length">{length == null ? 0 : length}/255</p>
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
