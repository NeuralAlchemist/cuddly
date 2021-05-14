// NPM Packages
<<<<<<< HEAD
<<<<<<< HEAD
import React, { useState } from 'react';
import ResponsiveTextArea from '../ResponsiveTextArea';

export default function CommentForm({ post, onSubmit }) {
  // Local State
  const [commentContentText, setCommentContentText] = useState('');
  const [length, setLength] = useState();
  const commentURL = require('../../assets/images/comment.svg');;
=======
import React, { useState } from "react";
import CommentsApi from "../../api/CommentsApi";
=======
import React, { useState } from 'react';
import ResponsiveTextArea from '../ResponsiveTextArea';
import FormFooter from "../FormFooter";
>>>>>>> e453629 (Applied stash from main)

export default function CommentForm({ post, onSubmit, onSubmitMedia }) {
  // Local State
  const [commentContentText, setCommentContentText] = React.useState("");
  const commentObject = require("../../assets/images/comment.svg");
  const commentURL = commentObject;
  const [contentFile, setContentFile] = useState();
  const [isFilePicked, setIsFilePicked] = useState(false);
  const formData = new FormData();
  const postId = post.postId;
>>>>>>> 4daca27 (Update the methods to insert the image on Comment Form)

  const [contentText, setContentText] = useState('');
  const [length, setLength] = useState();
  const commentURL = require('../../assets/images/comment.svg');;
  //const [length, setLength] = useState();
  const [contentFile, setContentFile] = useState();
  const [isFilePicked, setIsFilePicked] = useState(false);
  // Methods
  /*
  const handleSubmit = () => {
    // Invoke the passed in event callback
    onSubmit(post.id, { contentText: commentContentText });

    // Clear the input field
    setCommentContentText('');
<<<<<<< HEAD
  };

  const onFormContentChange = (value) => {
    setCommentContentText(value);
    setLength(value.length);
=======
  };*/

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
>>>>>>> e453629 (Applied stash from main)
  };

 const handleSubmit = (event) => {
    if (isFilePicked) {
        handleImagePostSubmit(event);
      } else {
      // Invoke the passed in event callback
        onSubmit({ commentContentText: commentContentText });
      }
      // Clear the input field
      setCommentContentText("");
  };

  const handleImagePostSubmit = (event) => {
      event.preventDefault();
      formData.append("file", contentFile);
      formData.append("text", commentContentText);
      CommentsApi.createImageComment(postId, formData).catch((err) => {
          alert("FAILED");
          console.error(err);
      });
      setContentFile(null);
      setIsFilePicked(false);
      window.location.reload();
  };

  const setCommentFile = async (event) => {
      setContentFile(event.target.files[0]);
      setIsFilePicked(true);
      console.log(`selected file is now: ${event.target.files[0]}`);
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
    <form>
      <div className="form-field">
        <ResponsiveTextArea
          placeholder="Write your comment here."
<<<<<<< HEAD
          contentText={commentContentText}
          onFormContentChange={onFormContentChange}
          maxLength="500"
        />
<<<<<<< HEAD
      </div>
      <div>
        <p className="length">{length == null ? 0 : length}/500</p>
        <button className="button-comment" onClick={handleSubmit}>
          <img className="comment" src={commentURL} alt="Commment" />
          <span>Comment</span>
        </button>
      </div>
=======
        </div>
        <div>
            <input type="file" onChange={setCommentFile} />
            <button onClick={handleSubmit}>
              <span>Comment</span>
              </button>
        </div>
>>>>>>> 4daca27 (Update the methods to insert the image on Comment Form)
=======
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
          action="Comment"
          maxLength="500"
        />
>>>>>>> e453629 (Applied stash from main)
    </form>
  );
}