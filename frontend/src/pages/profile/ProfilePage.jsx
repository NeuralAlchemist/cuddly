// NPM Packages
import React, {useState} from "react";
import { useRecoilState, useRecoilValue } from "recoil";

// Project files
import ProfileCard from "../../components/profile/ProfileCard";
import BuddyCard from "../../components/profile/BuddyCard";
import PostsApi from "../../api/PostsApi";
import PostCard from "../../components/posts/PostCard";
import { postsState, allPosts } from "../../state/postsData";
import { currentUserValue } from "../../state/currentUserData";

export default function ProfilePage() {
  // Global state
  const [posts, setPosts] = useRecoilState(postsState);
  const postsGlobal = useRecoilValue(allPosts);
  const currentUserGlobal = useRecoilValue(currentUserValue);

  // Local State
  const [buddiesPosts, setBuddiesPosts] = useState(currentUserGlobal.buddiesFollowing.map(buddy => buddy.createdPosts));
  // const [suggestedFollowers, setSuggestedFollowers] = useState(currentUserGlobal.buddiesFollowing.map(users => users).filter(bud => bud.buddiesFollowing != []))

  // let arrayUsers = (currentUserGlobal.buddiesFollowing.map(users => users[0]))
  // let suggest = arrayUsers.filter(bud => bud.buddiesFollowing != []);
  // console.log("MEEE", suggest)
  // console.log("ARR", arrayUsers)
  // Variables
  let userPostLikes = [];
  let suggestedFollowers = [];

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

  for (let i = 0; i < currentUserGlobal.buddiesFollowing.length; i++) {
    for (let j = 0; j < currentUserGlobal.buddiesFollowing[i].buddiesFollowing.length; j++) {
      if (currentUserGlobal.buddiesFollowing[i].buddiesFollowing[j].id !== currentUserGlobal.id && currentUserGlobal.buddiesFollowing[i].id !== currentUserGlobal.buddiesFollowing[i].buddiesFollowing[j].id) {
        suggestedFollowers.push(currentUserGlobal.buddiesFollowing[i].buddiesFollowing[j]);
      }
    }
  }

console.log("SUGG", suggestedFollowers)
  const userLikesPostCards = userPostLikes.map((post) => (
    <PostCard
      key={post.id}
      post={post}
      currentUser={currentUserGlobal}
      buddies={currentUserGlobal.buddiesFollowing}
      onDeleteClick={() => deletePost(post)}
    />
  ));

  const suggestedFollowingCard = suggestedFollowers.map((buddy) => (
    <BuddyCard
      key={buddy.id}
      buddy={buddy}
    />
  ));

    // const buddiesPostCards = buddiesPosts.map(arr => arr.map(post => 
    //   <PostCard
    //   key={post.id}
    //   post={post}
    //   currentUser={currentUserGlobal}
    //   buddies={currentUserGlobal.buddiesFollowing}
    //   onDeleteClick={() => deletePost(post)}
    // />
    //   ))  

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
        <h3>Suggested Buddies</h3>
        {suggestedFollowingCard}
      </div>
    </div>
  );
}
