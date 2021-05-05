// NPM Packages
import React, { useEffect, useState } from "react";
import Moment from "react-moment";

// Project files
import CommentForm from "../comments/CommentForm";
import CommentList from "../comments/CommentList";
import CommentsApi from "../../api/CommentsApi";
import PostsApi from "../../api/PostsApi";
import UserApi from "../../api/UserApi";
import PostUpdateForm from "./PostUpdateForm";
import PostLikeApi from "../../api/PostLikeApi";

export default function PostCard({ post, onDeleteClick }) {
    // Local state
    const [comments, setComments] = useState([]);
    const [toggleUpdatePost, setToggleUpdatePost] = useState(false);
    const [currentUser, setCurrentUser] = useState({});

    // Constants
    const deleteURL = require("../../assets/images/delete.svg");
    const editURL = require("../../assets/images/edit.svg");
    const pawURL = require("../../assets/images/paw.svg");
    const postId = post.id;
    const postCreatorName = post.relatedPostUser.name;
    const postCreatorEmail = post.relatedPostUser.email;
    const listOfLikedUsers = post.listOfLikes.map((like) => like.likedUser);
    const likeIconURL = require("../../assets/images/like.svg");

    // Methods
    async function updatePost(updatedPost) {
        try {
            await PostsApi.updatePost(updatedPost, post.id);
        } catch (e) {
            console.error(e);
        }
    }

    async function createComment(postId, commentData) {
        try {
            const response = await CommentsApi.createComment(
                postId,
                commentData
            );
            const comment = response.data;
            const newComments = comments.concat(comment);
            setComments(newComments);
        } catch (e) {
            console.error(e);
        }
    }

    async function deleteComment(postId, commentToDelete) {
        try {
            await CommentsApi.deleteComment(postId, commentToDelete.id);
            const newComments = comments.filter(
                (comment) => comment.id !== commentToDelete.id
            );
            setComments(newComments);
        } catch (e) {
            console.error(e);
        }
    }

    function likeAction() {
        if (checkForLikedUser()) {
            removeLike();
        } else {
            addLike();
        }
        window.location.reload();
    }

    async function addLike() {
        try {
            await PostLikeApi.addLike(postId);
        } catch (e) {
            console.error(e);
        }
    }

    async function removeLike() {
        try {
            await PostLikeApi.removeLike(postId);
        } catch (e) {
            console.error(e);
        }
    }

    function checkUserEmail() {
        return postCreatorEmail === currentUser.email;
    }

    function checkForLikedUser() {
        const likedEmail = listOfLikedUsers.find(
            (user) => user.email === currentUser.email
        );
        return likedEmail != null;
    }

    useEffect(() => {
        CommentsApi.getAllComments(postId)
            .then(({ data }) => setComments(data))
            .catch((err) => console.error(err));
    }, [setComments, postId]);

    useEffect(() => {
        UserApi.getUser()
            .then(({ data }) => {
                setCurrentUser(data);
            })
            .catch((err) => console.error(err));
    }, [setCurrentUser]);

    return (
        <div className="PostCard">
            <div>
                <div className="postcard-header">
                    <span className="post-info">
                        {postCreatorName} posted{" "}
                        <Moment fromNow>{post.createdTime}</Moment>
                    </span>
                    <div className="delete-edit-icons">
                        {checkUserEmail() && (
                            <span>
                                <button
                                    className="button-post-card delete-icon"
                                    onClick={onDeleteClick}
                                ></button>
                                <button
                                    className={`button-post-card ${
                                        toggleUpdatePost ? " cancel" : " active"
                                    }`}
                                    onClick={() =>
                                        toggleUpdatePost
                                            ? setToggleUpdatePost(false)
                                            : setToggleUpdatePost(true)
                                    }
                                ></button>
                            </span>
                        )}
                    </div>
                </div>
                <p className="content-text">
                    {!toggleUpdatePost ? (
                        post.contentText
                    ) : (
                        <div>
                            <span>
                                <PostUpdateForm
                                    onSubmit={(postData) =>
                                        updatePost(postData)
                                    }
                                    post={post}
                                />
                            </span>
                            <span></span>
                        </div>
                    )}
                </p>
                <div className="like-counter">
                    <img className="icon-like" src={pawURL} alt="like(s)" />
                    <span>  {post.listOfLikes.length}</span>
                </div>
                <button onClick={likeAction} className="like-button">
                    {checkForLikedUser() ? "Remove Like" : "Like"}
                </button>
                <CommentList
                    postId={postId}
                    comments={comments}
                    currentUser={currentUser}
                    onDelete={deleteComment}
                />
                <CommentForm post={post} onSubmit={createComment} />
            </div>
        </div>
    );
}
