// NPM Packages
import React, { useState } from "react";

// Project Files
import ResponsiveTextArea from "../ResponsiveTextArea";
import FormFooter from "../FormFooter";
import getFileSizeInMB from "../../functions/getFileSizeInMB";

export default function PostForm({ onSubmit, onSubmitMedia }) {
  // Local State
  const [contentText, setContentText] = useState("");
  const [length, setLength] = useState(0);
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
    }
    setContentText("");
  };

  const onFormContentChange = (value) => {
    setContentText(value);
    setLength(value.length);
  };

  const setFile = (event) => {
    setIsFilePicked(false);
    const file = event.target.files[0];
    if (getFileSizeInMB(file.size) > 10) {
      alert("Files larger than 10MB are not allowed!");
    } else if (file.size === 0) {
      alert("Empty files are not allowed!");
    } else {
      setContentFile(file);
      setIsFilePicked(true);
    }
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
          maxFormTextLength="1000"
          buttonText="Post"
        />
      </form>
    </div>
  );
}
