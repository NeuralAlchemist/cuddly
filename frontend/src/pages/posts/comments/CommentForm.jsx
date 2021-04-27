// NPM Packages
import React from "react";

export default function CommentForm({ post, onSubmit }) {
    // Local State
    const [commentBody, setCommentBody] = React.useState("");

    // Methods
    const handleSubmit = () => {
        // Invoke the passed in event callback
        onSubmit(post.id,{ body: commentBody });

        // Clear the input field
        setCommentBody("");
    };

    return (
        <form className="CommentForm">
            <textarea
                value={commentBody}
                onChange={(e) => setCommentBody(e.target.value)}
            />
            <button onClick={handleSubmit}> Comment </button>
        </form>
    );
}
