// NPM Packages

import React, { useState } from 'react';
import ResponsiveTextArea from '../ResponsiveTextArea';

export default function PostForm({ onSubmit, onImagePostSubmit }) {
  // Local State

  const [contentText, setContentText] = useState('');
  const [length, setLength] = useState();
  const postURL = require('../../assets/images/post.svg');
  const [contentFile, setContentFile] = useState();
  const [isFilePicked, setIsFilePicked] = useState(false);

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

  const setFile = async (event) => {
    const formData = new FormData();
    var file = event.target.files[0];
    console.log(file)
    formData.append('file', event.target.files[0]);
    formData.forEach(item => console.log(item))
    onImagePostSubmit({file: formData});
    console.log(`selected file is now: ${event.target.files[0]}`);
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
