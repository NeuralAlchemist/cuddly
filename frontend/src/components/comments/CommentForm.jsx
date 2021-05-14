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
  const [commentContentText, setCommentContentText] = useState("");
  const [contentFile, setContentFile] = useState();
  const [isFilePicked, setIsFilePicked] = useState(false);
  const postId = post.postId;
<<<<<<< HEAD
>>>>>>> 4daca27 (Update the methods to insert the image on Comment Form)

  const [contentText, setContentText] = useState('');
=======
>>>>>>> 7ffbbd3 (Before git rebase)
  const [length, setLength] = useState();
  // Methods
<<<<<<< HEAD
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

=======
 
>>>>>>> 7ffbbd3 (Before git rebase)
  const handleSubmit = (event) => {
    if (isFilePicked) {
      event.preventDefault();
      onSubmitMedia({ contentFile, commentContentText });
      setContentFile(null);
      setIsFilePicked(false);
    } else {
      // Invoke the passed in event callback
      onSubmit({ commentContentText: commentContentText });
      // Clear the input field
      setCommentContentText('');
    }
>>>>>>> e453629 (Applied stash from main)
  };

  const onFormContentChange = (value) => {
    setCommentContentText(value);
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
=======
          contentText={commentContentText}
>>>>>>> 7ffbbd3 (Before git rebase)
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