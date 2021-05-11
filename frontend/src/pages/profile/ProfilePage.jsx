// NPM Packages
import React, { useEffect, useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";

// Project files
import ProfileCard from "../../components/profile/ProfileCard";
import UserApi from "../../api/UserApi";
import PostsApi from "../../api/PostsApi";
import PostCard from "../../components/posts/PostCard";
import { postsState, allPosts } from "../../state/postsData";

export default function ProfilePage() {
  // Global state
  const [posts, setPosts] = useRecoilState(postsState);
  const postsGlobal = useRecoilValue(allPosts);

  // Local state
  const [thisUser, setThisUser] = useState({});

  // Variables
  let userPostLikes = [];
  
  // Methods
  useEffect(() => {
    UserApi.getUser()
      .then(({ data }) => {
        setThisUser(data);
      })
      .catch((err) => console.error(err));
  }, [setThisUser]);

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

  return (
    <div className="main-container-item">
      <h1>Profile</h1>
      <ProfileCard thisUser={thisUser} />
      <p>My posts</p>
      {userPostCards}
      <p>Liked posts</p>
      {userLikesPostCards}
    </div>
  );
}
