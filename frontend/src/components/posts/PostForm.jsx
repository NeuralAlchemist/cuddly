// NPM Packages
import React, { useState } from 'react';

// Project Files
import ResponsiveTextArea from '../ResponsiveTextArea';

// Project Files
import PostsApi from "../../api/PostsApi";
import FormFooter from "../FormFooter";

export default function PostForm({ onSubmit, onSubmitMedia }) {
  // Local State
  const [contentText, setContentText] = useState("");
  const [length, setLength] = useState();
  const postURL = require("../../assets/images/post.svg");
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
      setContentText("");
    }
  };

  const onFormContentChange = (value) => {
    setContentText(value);
    setLength(value.length);
  };

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
