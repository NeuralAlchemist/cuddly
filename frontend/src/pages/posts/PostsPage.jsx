// NPM Packages
import React, { useEffect, useState } from "react";
import '../posts/postcard-container.css';
import '../posts/postcard-item.css';

// Project files
import PostsApi from "../../api/PostsApi";
import PostForm from "../../components/posts/PostForm";
import PostCard from "../../components/posts/PostCard";

export default function PostsPage() {
  // Local state
  const [posts, setPosts] = useState([]);

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
    PostsApi.getAllPosts()
      .then(({ data }) => setPosts(data))
      .catch((err) => console.error(err));
  }, [posts, setPosts]);

  // Components
  const CardsArray = posts.map((post) => (
    <PostCard key={post.id} post={post} onDeleteClick={() => deletePost(post)} />
  ));

  return (
    <div className="postcard-container">
      <PostForm className= "postcard-item" onSubmit={(postData) => createPost(postData)} />

      {CardsArray}
    </div>
  );
}
