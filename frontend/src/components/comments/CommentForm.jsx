// NPM Packages
import React, { useState } from "react";
import ResponsiveTextArea from "../ResponsiveTextArea";
import FormFooter from "../FormFooter";
import getFileSizeInMB from "../../functions/getFileSizeInMB";

export default function CommentForm({ post, onSubmit, onSubmitMedia }) {
  // Local State
  const [contentText, setContentText] = useState("");
  const [length, setLength] = useState();
  const [contentFile, setContentFile] = useState();
  const [isFilePicked, setIsFilePicked] = useState(false);
  // Methods
  const handleSubmit = (event) => {
    if (isFilePicked) {
      event.preventDefault();
      console.log("Make API call to comment upload image");
      onSubmitMedia(post.id, {contentFile, contentText});
      setContentFile(null);
      setIsFilePicked(false);
    } else {
      // Invoke the passed in event callback
      onSubmit(post.id, { contentText: contentText });
    }
    // Clear the input field
    setContentText("");
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
      console.log(contentFile);
      setIsFilePicked(true);
    }
  };

  const onFormContentChange = (value) => {
    setContentText(value);
    setLength(value.length);
  };

  return (
    <form>
      <div className="form-field">
        <ResponsiveTextArea
          placeholder="Write your comment here."
          contentText={contentText}
          onFormContentChange={onFormContentChange}
          maxLength="500"
        />
      </div>
      <FormFooter
        isFilePicked={isFilePicked}
        contentFile={contentFile}
        length={length}
        setFile={setFile}
        handleSubmit={handleSubmit}
        buttonText="Comment"
        maxFormTextLength="500"
      />
    </form>
  );
}
