// NPM Packages
import React from "react";
import { useRecoilState, useRecoilValue } from "recoil";

// Project files
import PostsApi from "../../api/PostsApi";
import PostForm from "../../components/posts/PostForm";
import PostCard from "../../components/posts/PostCard";
import { postsState, allPosts } from "../../state/postsData";
import { currentUserValue } from "../../state/currentUserData";

export default function PostsPage() {
  // Local state
  const [posts, setPosts] = useRecoilState(postsState);
  const postsGlobal = useRecoilValue(allPosts);

  const currentUserGlobal = useRecoilValue(currentUserValue);

  // Methods
  async function createPost(postData) {
    try {
      const response = await PostsApi.createPost(postData);
      const post = response.data;
      const newPosts = posts.concat(post);

      setPosts(newPosts);
    } catch (e) {
      console.error(e);
    }
  }

  async function createPostMedia(imageFile) {
    try {
      let formData = new FormData();
      console.log(imageFile);
      formData.append("file", imageFile.contentFile);
      formData.append("text", imageFile.contentText);
      await PostsApi.createImagePost(formData);
    } catch (e) {
      console.error(e);
    }
    window.location.reload()
  }

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
  const CardsArray = postsGlobal.map((post) => (
    <PostCard
      key={post.id}
      post={post}
      currentUser={currentUserGlobal}
      buddies={currentUserGlobal.buddiesFollowing}
      onDeleteClick={() => deletePost(post)}
    />
  ));

  return (
    <div className="main-container-item">
      <div className="post-main-content">
        <div className="postcard-container">
          <PostForm
            className="postform"
            onSubmit={(postData) => createPost(postData)}
            onSubmitMedia={(imageFile) => createPostMedia(imageFile)}
          />
          {CardsArray}
        </div>
      </div>
    </div>
  );
}
