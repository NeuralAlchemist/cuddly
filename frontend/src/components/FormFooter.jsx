// NPM Packages
import React from "react";
export default function FormFooter({
  isFilePicked,
  contentFile,
  length,
  setFile,
  handleSubmit,
  buttonText,
  maxFormTextLength,
}) {
  // Method
  function getNiceName(requiredLength) {
    if (requiredLength >= contentFile.name.length) {
      return contentFile.name;
    } else {
      return contentFile.name.substring(0, requiredLength) + "..";
    }
  }
  return (
    <>
      <div className={`media-name-character-limit-display ${buttonText}`}>
        <div className={`${isFilePicked ? "file-selected" : "no-file"}`}>
          <span role="img" aria-label="file pin" className="media-name-full">
            📎 {isFilePicked ? getNiceName(35) : "nothing selected"}
          </span>
          <span role="img" aria-label="file pin" className="media-name-mobile">
            📎 {isFilePicked ? getNiceName(16) : "nothing selected"}
          </span>
        </div>
        <p className="length">
          {length == null ? 0 : length}/{maxFormTextLength}
        </p>
      </div>
      <div className="form-footer">
        <button
          className="button-post"
          onClick={handleSubmit}
          disabled={length === undefined || length === 0}
        >
          {buttonText.includes("comment") ? "Comment" : "Post"}
        </button>
        <div className="form-footer-extras">
          <input
            hidden
            id={`pick-media-image ${buttonText}`}
            className="pick-media"
            type="file"
            onChange={setFile}
            accept="image/*"
          />
          <label
            htmlFor={`pick-media-image ${buttonText}`}
            className="proxy-button pick-image"
          >
            <span className="tooltiptext">pick image</span>
          </label>
          <input
            hidden
            id={`pick-media-video ${buttonText}`}
            className="pick-media"
            type="file"
            onChange={setFile}
            accept="video/*"
          />
          <label
            htmlFor={`pick-media-video ${buttonText}`}
            className="proxy-button pick-video"
          >
            <div></div>
            <span className="tooltiptext">pick video</span>
          </label>
        </div>
      </div>
    </>
  );
}
