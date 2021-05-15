// NPM Packages
import React from "react";

// Project files
import ProfileCard from "./ProfileCard";

export default function ProfilePage({thisUser, userPostCards, userLikesPostCards, isLoggedInUser}) {

  // Constants
  const hasCreatedPosts = userPostCards.length > 0;
  const hasLikedPosts = userLikesPostCards.length > 0;

  return (
    <div className="main-container-item ProfilePage">
      <h1 className="page-name">Profile</h1>
      <ProfileCard thisUser={thisUser} isLoggedInUser={isLoggedInUser}/>
      <div className="user-feed">
        <h3>Posts</h3>
        {hasCreatedPosts && userPostCards}
        {!hasCreatedPosts && <p className="prompt">You haven't created any posts yet</p>}
        <h3>Liked posts</h3>
        {hasLikedPosts && userLikesPostCards}
        {!hasLikedPosts && <p className="prompt">You haven't liked any posts yet</p>}
      </div>
    </div>
  );
}
