// NPM Packages
import React, { useEffect, useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";

// Project files
import ProfileCard from "../../components/profile/ProfileCard";
import PostsApi from "../../api/PostsApi";
import PostCard from "../../components/posts/PostCard";
import { postsState, allPosts } from "../../state/postsData";
import {usersState, allUsers } from"../../state/usersData";

export default function OtherProfilePage({match}) {
  // Global state
  const [posts, setPosts] = useRecoilState(postsState);
  const postsGlobal = useRecoilValue(allPosts);
  const usersGlobal = useRecoilValue(allUsers);

  // Local state
  const [thisUser, setThisUser] = useState({});

  // Constants
  const routerID = match.params.id;
  const userProfile = usersGlobal.find((user) => user.id === routerID);
  console.log(userProfile);

  // Variables
  let userPostLikes = [];

  // Methods
  useEffect(() => {
    setThisUser(userProfile)
  }, [setThisUser, userProfile]);

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
    .filter((post) => thisUser.id === post.relatedPostUser.id)
    .map((post) => (
      <PostCard
        key={post.id}
        post={post}
        currentUser={thisUser}
        onDeleteClick={() => deletePost(post)}
      />
    ));

  for (let i = 0; i < postsGlobal.length; i++) {
    for (let j = 0; j < postsGlobal[i].listOfLikes.length; j++) {
      if (postsGlobal[i].listOfLikes[j].likedUser.id === thisUser.id) {
        userPostLikes.push(postsGlobal[i]);
      }
    }
  }

  const userLikesPostCards = userPostLikes.map((post) => (
    <PostCard
      key={post.id}
      post={post}
      currentUser={thisUser}
      onDeleteClick={() => deletePost(post)}
    />
  ));

  // Constants
  const hasCreatedPosts = userPostCards.length > 0;
  const hasLikedPosts = userLikesPostCards.length > 0;

  return (
    <div className="main-container-item ProfilePage">
      <h1 className="page-name">Profile</h1>
      <ProfileCard thisUser={thisUser} />
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
