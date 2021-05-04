// NPM Packages
<<<<<<< HEAD
=======
import React, { useState } from "react";
import '../posts/postform.css';
import axios from "axios";
>>>>>>> 1fc5758 (re structure setFile remove unused local states)

<<<<<<< HEAD
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

=======
export default function PostForm({ onSubmit, onImagePostSubmit }) {
  // Local State
  const [contentText, setContentText] = useState("");
<<<<<<< HEAD
  const [contentFile, setContentFile] = useState();
  const [isFilePicked, setIsFilePicked] = useState(false);
>>>>>>> d48cf09 (add logic to obtain contentText and contentFile)
=======
>>>>>>> 1fc5758 (re structure setFile remove unused local states)
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

<<<<<<< HEAD
=======
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
>>>>>>> d48cf09 (add logic to obtain contentText and contentFile)

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
<<<<<<< HEAD
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
=======
            <textarea value={contentText} onChange={(e) => setContentText(e.target.value)} />
          </div>
          <input formEncType="multipart/form-data" type="file" onChange={(e) => setFile(e)}/>
          <div>
            <button onClick={handleSubmit}>Post</button>
          </div>
          <button onClick={handleImagePostSubmit}>Upload Image</button>
>>>>>>> d48cf09 (add logic to obtain contentText and contentFile)
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
