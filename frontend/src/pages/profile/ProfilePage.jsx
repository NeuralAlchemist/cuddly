// NPM Packages
import React from "react";
import { useRecoilState, useRecoilValue } from "recoil";

// Project files
import ProfileCard from "../../components/profile/ProfileCard";
import PostsApi from "../../api/PostsApi";
import PostCard from "../../components/posts/PostCard";
import { postsState, allPosts } from "../../state/postsData";
import { currentUserValue } from "../../state/currentUserData";

export default function ProfilePage() {
  // Global state
  const [posts, setPosts] = useRecoilState(postsState);
  const postsGlobal = useRecoilValue(allPosts);


  const currentUserGlobal = useRecoilValue(currentUserValue);

  // Variables
  let userPostLikes = [];

  async function deletePost(post) {
    try {
      await PostsApi.deletePost(post.id);
      const newPosts = postsGlobal.filter((p) => p.id !== post.id);

      setPosts(newPosts);
    } catch (e) {
      console.error(e);
    }
  }

  // Components
  const userPostCards = postsGlobal
    .filter((post) => currentUserGlobal.id === post.relatedPostUser.id)
    .map((post) => (
      <PostCard
      key={post.id}
      post={post}
      currentUser={currentUserGlobal}
      buddies={currentUserGlobal.buddiesFollowing}
      onDeleteClick={() => deletePost(post)}
    />
    ));

  for (let i = 0; i < postsGlobal.length; i++) {
    for (let j = 0; j < postsGlobal[i].listOfLikes.length; j++) {
      if (postsGlobal[i].listOfLikes[j].likedUser.id === currentUserGlobal.id) {
        userPostLikes.push(postsGlobal[i]);
      }
    }
  }

  const userLikesPostCards = userPostLikes.map((post) => (
    <PostCard
      key={post.id}
      post={post}
      currentUser={currentUserGlobal}
      buddies={currentUserGlobal.buddiesFollowing}
      onDeleteClick={() => deletePost(post)}
    />
  ));

  // Constants
  const hasCreatedPosts = userPostCards.length > 0;
  const hasLikedPosts = userLikesPostCards.length > 0;

  return (
    <div className="main-container-item ProfilePage">
      <h1 className="page-name">Profile</h1>
      <ProfileCard thisUser={currentUserGlobal} />
      <div className="user-feed">
        <h3>My posts</h3>
        {hasCreatedPosts && userPostCards}
        {!hasCreatedPosts && <p className="prompt">You haven't created any posts yet</p>}
        <h3>My liked posts</h3>
        {hasLikedPosts && userLikesPostCards}
        {!hasLikedPosts && <p className="prompt">You haven't liked any posts yet</p>}
      </div>
    </div>
  );
}
