// NPM Packages

import React, { useState } from 'react';
import ResponsiveTextArea from '../ResponsiveTextArea';
import PostsApi from "../../api/PostsApi";

export default function PostForm({ onSubmit, onImagePostSubmit }) {
  // Local State

  const [contentText, setContentText] = useState('');
  const [length, setLength] = useState();
  const postURL = require('../../assets/images/post.svg');
  const [contentFile, setContentFile] = useState();
  const [isFilePicked, setIsFilePicked] = useState(false);
  const formData = new FormData();
  // Methods
  const handleSubmit = () => {
    // Invoke the passed in event callback
    onSubmit({ contentText: contentText });

    // Clear the input field
    setContentText('');
  };

  const onFormContentChange = (value) => {
    setContentText(value);
    setLength(value.length);
  };
  const handleImagePostSubmit = () => {
    const formData = new FormData();
    onImagePostSubmit({formData});
  }
  const handleImagePostSubmit = (event) => {
    event.preventDefault();
    formData.append('file', contentFile);
    formData.append('text', contentText);
    PostsApi.createImagePost(formData)
        .then ((response) => {
          console.log(response);
          alert("Image uploaded successfully");
        })
        .catch((err) => {
          alert("FAILED");
          console.error(err);
        });
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
          <button onClick={handleImagePostSubmit}>Upload Image</button>
        </div>
      </form>
    </div>
  );
}
