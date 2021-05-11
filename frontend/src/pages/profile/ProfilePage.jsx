// NPM Packages
import React, { useEffect, useState } from "react";
import { useRecoilState } from "recoil";

// Project files
import ProfileCard from "../../components/profile/ProfileCard";
import UserApi from "../../api/UserApi";
import PostsApi from "../../api/PostsApi";
import PostCard from "../../components/posts/PostCard"
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

  const userLikedPosts = thisUser.likedPosts;
  console.log('userLikedPosts', userLikedPosts);

  // const getLikedPostID = userLikedPosts
  // .map((post) => (
  //   posts.filter((post.id) => object.id === post.id)
  // ));

  // console.log('getLikedPosts', getLikedPosts);

  // // Get listOfLikes array for each post in posts
  // const userLikesArray = posts
  // .map((post) => post.listOfLikes);

  // console.log('userLikesArray', userLikesArray);

  // // Check if the array is empty (no likes)

  // const notEmptyArrays = userLikesArray.filter((array) => array.length !== 0);

  // const extractLikedUserID = userLikesArray.length !== 0 ?  


  // // If it's not empty, filter for likes by this user
  // userLikesArray.filter((postLike) => thisUser.id === postLike.likedUser.id) : null;

  // console.log('userLikesArray', extractLikedUserID);



  return (
    <div className="ProfilePage">
      <h1>Profile</h1>
      <ProfileCard thisUser={thisUser} />
      <p>my posts</p>
      {userPostCards}
      <p>Liked posts</p>
    </div>
  );
}
