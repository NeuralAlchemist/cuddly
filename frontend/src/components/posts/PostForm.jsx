// NPM Packages
import React, { useState } from 'react';

<<<<<<< HEAD
// Project Files
import ResponsiveTextArea from '../ResponsiveTextArea';
import FormFooter from "../FormFooter";


export default function PostForm({ onSubmit, onSubmitMedia }) {
  // Local State
  const [contentText, setContentText] = useState("");
  const [length, setLength] = useState();
=======
export default function PostForm({ onSubmit, onImagePostSubmit }) {
  // Local State

  const [contentText, setContentText] = useState('');
  const postObject = require('../../assets/images/post.svg');
  const postURL = postObject;
>>>>>>> 2c12a9d (add logic to obtain contentText and contentFile)
  const [contentFile, setContentFile] = useState();
  const [isFilePicked, setIsFilePicked] = useState(false);

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
      setContentText('');
    }
  };

  const onFormContentChange = (value) => {
    setContentText(value);
    setLength(value.length);
  };

<<<<<<< HEAD
  const setFile = (event) => {
    setContentFile(event.target.files[0]);
    setIsFilePicked(true);
  };


  return (
    <div className="form-container">
      <form className="form">
        <div className="form-field">
          <ResponsiveTextArea
            placeholder="What's on your mind?"
            contentText={contentText}
            onFormContentChange={onFormContentChange}
            maxLength="1000"
          />
=======
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
>>>>>>> 2c12a9d (add logic to obtain contentText and contentFile)
        </div>
        <FormFooter
          isFilePicked={isFilePicked}
          contentFile={contentFile}
          length={length}
          setFile={setFile}
          handleSubmit={handleSubmit}
        />
      </form>
    </div>
  );
}
