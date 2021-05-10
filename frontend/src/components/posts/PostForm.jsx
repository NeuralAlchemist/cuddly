// NPM Packages
import React, { useState } from "react";
import PostsApi from "../../api/PostsApi";

export default function PostForm({ onSubmit }) {
  // Local State
  const [contentText, setContentText] = useState("");
  const [file, setFile] = useState([])
  const postObject = require("../../assets/images/post.svg");
  const postURL = postObject;

  // Methods
  const handleSubmit = () => {
    // Invoke the passed in event callback
    onSubmit({ contentText: contentText });

    // Clear the input field
    setContentText("");
  };

  const onFileChangeHandler = (e) => {
    e.preventDefault();
    setFile(e.target.files[0])

    const formData = new FormData();
    formData.append('file', file);
    PostsApi.upload(formData)
        .then(res => {
                console.log(res.data);
                alert("File uploaded successfully.")
        })
};

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

            <button className="button-post" onClick={handleSubmit}>
              <img className="post" src={postURL} alt="Post" />
              <div className="form-group files color">
                {/* <label>Upload Your File </label>
                <input
                  type="file"
                  className="form-control"
                  name="file"
                  onChange={onFileChangeHandler}
                /> */}
              </div>
              <span>Post</span>
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
