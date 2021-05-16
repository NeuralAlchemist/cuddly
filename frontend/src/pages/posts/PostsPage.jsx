// NPM Packages
import React, { useEffect, useState } from "react";

// Project files
import PostsApi from "../../api/PostsApi";
import PostForm from "../../components/posts/PostForm";
import PostCard from "../../components/posts/PostCard";
import UserApi from "../../api/UserApi";

export default function PostsPage() {
  // Local state
  const [posts, setPosts] = useState([]);
  const [currentUser, setCurrentUser] = useState({});

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

  /* async function createPostMedia(imageFile) {
    try {
      let formData = new FormData();
      console.log(imageFile);
      formData.append("file", imageFile.contentFile);
      formData.append("text", imageFile.contentText);
      const response = await PostsApi.createImagePost(formData);
      const post = response.data;
      const newPosts = posts.concat(post);
      const currPost = newPosts.pop();
      newPosts.unshift(currPost);
      setPosts(newPosts);
    } catch (e) {
      console.error(e);
    }
  } */

  async function createPostMedia(imageFile) {
    try {
      let formData = new FormData();
      console.log(imageFile);
      formData.append("file", imageFile.contentFile);
      formData.append("text", imageFile.contentText);
      const response = await PostsApi.createImagePost(formData);
      // Sleep for one second before setting the returned post
      await new Promise((r) => setTimeout(r, 1000));
      const post = response.data;
      const newPosts = posts.concat(post);
      const currPost = newPosts.pop();
      newPosts.unshift(currPost);
      
      setPosts(newPosts);
    } catch (e) {
      console.error(e);
    }
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

  useEffect(() => {
    console.log("fetching all posts")
    PostsApi.getAllPosts()
      .then(({ data }) => setPosts(data))
      .catch((err) => console.error(err));
  }, [setPosts]);

  useEffect(() => {
    UserApi.getUser()
      .then(({ data }) => {
        setCurrentUser(data);
      })
      .catch((err) => console.error(err));
  }, [setCurrentUser]);

  // Components
  const CardsArray = posts.map((post) => (
    <PostCard
      key={post.id}
      post={post}
      currentUser={currentUser}
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
