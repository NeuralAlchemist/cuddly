// NPM Packages
import React, { useEffect, useState } from "react";

// Project files
import PostsApi from "../../api/PostsApi";
import Form from "./PostForm";
import Card from "./PostCard";

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
  }, [setPosts]);

  // Components
  const CardsArray = posts.map((post) => (
    <Card key={post.id} post={post} onDeleteClick={() => deletePost(post)} />
  ));

  return (
    <div>
      <Form onSubmit={(postData) => createPost(postData)} />

      {CardsArray}
    </div>
  );
}
