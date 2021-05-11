// NPM Packages
import React, { useEffect, useState } from "react";
import { useRecoilState } from "recoil";

// Project files
import ProfileCard from "../../components/profile/ProfileCard";
import UserApi from "../../api/UserApi";
import PostsApi from "../../api/PostsApi";
import PostCard from "../../components/posts/PostCard";
import { postsState } from "../../state/postsData";

export default function ProfilePage() {
  // Global state
  const [posts, setPosts] = useRecoilState(postsState);

  // Local state
  const [thisUser, setThisUser] = useState({});

  // Methods
  useEffect(() => {
    PostsApi.getAllPosts()
      .then(({ data }) => setPosts(data))
      .catch((err) => console.error(err));
  }, [setPosts]);

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
      const newPosts = posts.filter((p) => p.id !== post.id);

      setPosts(newPosts);
    } catch (e) {
      console.error(e);
    }
  }

  // Components
  const userPostCards = posts
    .filter((post) => thisUser.id === post.relatedPostUser.id)
    .map((post) => (
      <PostCard
        key={post.id}
        post={post}
        currentUser={thisUser}
        onDeleteClick={() => deletePost(post)}
      />
    ));

  let userPostLikes = [];

  for (let i = 0; i<posts.length; i++) {
    for (let j = 0; j < posts[i].listOfLikes.length; j++) {
      if (posts[i].listOfLikes[j].likedUser.id === thisUser.id ) {
        userPostLikes.push(posts[i])
      }
    }
  }

  const userLikesPostCards = userPostLikes
  .map((post) => (
    <PostCard
      key={post.id}
      post={post}
      currentUser={thisUser}
      onDeleteClick={() => deletePost(post)}
    />
  ));

  return (
    <div className="ProfilePage">
      <h1>Profile</h1>
      <ProfileCard thisUser={thisUser} />
      <p>my posts</p>
      {userPostCards}
      <p>Liked posts</p>
      {userLikesPostCards}
    </div>
  );
}
