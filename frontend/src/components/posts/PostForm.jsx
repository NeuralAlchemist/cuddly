// NPM Packages
import React, { useState } from 'react';

// Project Files
import ResponsiveTextArea from '../ResponsiveTextArea';
import FormFooter from "../FormFooter";


export default function PostForm({ onSubmit, onSubmitMedia }) {
  // Local State
  const [contentText, setContentText] = useState("");
  const [length, setLength] = useState();
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

  const setFile = (event) => {
    if(isFilePicked){
      alert("Only one attachment allowed!");
    } else {
      setIsFilePicked(false);
      if (getFileSizeInMB(event.target.files[0].size) > 10) {
        alert("Files larger than 10MB are not allowed");
      } else {
        setContentFile(event.target.files[0]);
        setIsFilePicked(true);
      }
    }
  };

  function getFileSizeInMB(bytes){
    if(bytes === 0){
      return 0;
    }else {
      return (bytes)/Math.pow(10,6).toFixed(1);
    }
  }
console.log(contentFile);

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
