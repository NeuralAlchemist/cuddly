// NPM Packages
import React, { useEffect, useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { useParams } from "react-router-dom";

// Project files
import Profile from "../../components/profile/Profile";
import UserApi from "../../api/UserApi";
import PostsApi from "../../api/PostsApi";
import PostCard from "../../components/posts/PostCard";
import { postsState, allPosts } from "../../state/postsData";
import { allUsers } from "../../state/usersData";

export default function ProfilePage() {
  // Global state
  const [posts, setPosts] = useRecoilState(postsState);
  const postsGlobal = useRecoilValue(allPosts);
  const usersGlobal = useRecoilValue(allUsers);

  // Local state
  const [thisUser, setThisUser] = useState({});

  // Constants
  const { id } = useParams();
  console.log("id", id);
  console.log("usersGlobal", usersGlobal);
  const userProfile = usersGlobal.find((user) => user.id == id);
  console.log("userProfile", userProfile);

  // Variables
  let userPostLikes = [];

  // Methods
  useEffect(() => {
    if (id === "mine") {
      UserApi.getUser()
        .then(({ data }) => {
          setThisUser(data);
        })
        .catch((err) => console.error(err));
    } else {
      setThisUser(userProfile);
    }
  }, [setThisUser, userProfile, id]);

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
    <Profile
      thisUser={thisUser}
      userPostCards={userPostCards}
      userLikesPostCards={userLikesPostCards}
    />
  );
}
