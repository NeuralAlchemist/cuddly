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
  const [userWithProfile, setUserWithProfile] = useState({});
  const [loggedInUser, setLoggedInUser] = useState({});
  const [isUsersProfile, setIsUsersProfile] = useState(false);

  // Constants
  const { id } = useParams();

  // Variables
  let userPostLikes = [];

  // Methods
  useEffect(() => {
    UserApi.getUser()
      .then(({ data }) => {
        setLoggedInUser(data);        
      })
      .catch((err) => console.error(err));
  }, []);

  useEffect(() => {
    console.log('logged in ', loggedInUser);
    if (id === "mine") {
      setUserWithProfile(loggedInUser);
      setIsUsersProfile(true);
    } else {
      const userProfile = usersGlobal.find((user) => user.id == id);
      console.log("userProfile", userProfile);
      setUserWithProfile(userProfile);
      if (userProfile === loggedInUser) {
        setIsUsersProfile(true);
      }
    }
  }, [setUserWithProfile, id, usersGlobal, loggedInUser]);



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
    .filter((post) => userWithProfile.id === post.relatedPostUser.id)
    .map((post) => (
      <PostCard
        key={post.id}
        post={post}
        currentUser={loggedInUser}
        onDeleteClick={() => deletePost(post)}
      />
    ));

  for (let i = 0; i < postsGlobal.length; i++) {
    for (let j = 0; j < postsGlobal[i].listOfLikes.length; j++) {
      if (postsGlobal[i].listOfLikes[j].likedUser.id === userWithProfile.id) {
        userPostLikes.push(postsGlobal[i]);
      }
    }
  }

  const userLikesPostCards = userPostLikes.map((post) => (
    <PostCard
      key={post.id}
      post={post}
      currentUser={loggedInUser}
      onDeleteClick={() => deletePost(post)}
    />
  ));

  return (
    <Profile
      thisUser={userWithProfile}
      userPostCards={userPostCards}
      userLikesPostCards={userLikesPostCards}
      isLoggedInUser={isUsersProfile}
    />
  );
}
