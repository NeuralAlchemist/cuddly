import React, { useRef, useEffect, useState } from 'react';

export default function AutoFitContentPlaceholder({
  placeholder,
  contentText,
  onFormContentChange,
}) {
  // Local State
  const textArea = useRef(null);

  //Method
  // Make textArea placeholder's height adaptive to the content
  useEffect(() => {
    const originalHeight = '52px';
    textArea.current.style.height = originalHeight;
    // counter 4px of padding included in scrollHeight
    const newHeight = textArea.current.scrollHeight - 4;
    textArea.current.style.height = `${newHeight}px`;
    if (newHeight > 200) {
      textArea.current.style.overflowY = 'scroll';
    } else {
      textArea.current.style.overflowY = 'none';
    }
  }, [contentText]);

  return (
    <textarea
      ref={textArea}
      className="form-input"
      placeholder={placeholder}
      value={contentText}
      onChange={(e) => onFormContentChange(e.target.value)}
      maxlenght="255"
    />
  );
}
