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

  async function deletePost(post) {
    try {
      await PostsApi.deletePost(post.id);
      const newPosts = posts.filter((p) => p.id !== post.id);

      setPosts(newPosts);
    } catch (e) {
      console.error(e);
    }
  }

  /*async function createImagePost(text, file) {
    try {
      const response = await PostsApi.createImagePost(text, file);
      const post = response.data;
      const newPosts = posts.concat(post);
      setPosts(newPosts);
    } catch (e) {
      console.error(e);
      alert("Post with Image failed to post");
    }
  }*/

  /*async function uploadFile(file){
    try{
      const response = await PostsApi.uploadFile(file);
      const post = response.data;
      const newPosts = posts.concat(post);
      setPosts(newPosts);
    }catch (e) {
      console.error(e);
      alert("Image failed to upload");
    }
  }*/

  useEffect(() => {
    PostsApi.getAllPosts()
        .then(({data}) => setPosts(data))
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
          onDeleteClick={() => deletePost(post)}
      />
  ));

  return (
      <div className="post-grid-item">
        <div className="post-main-content">
          <div className="postcard-container">
            <PostForm
                className="postform"
                onSubmit={(postData) => createPost(postData)}
            />
            {CardsArray}
          </div>
        </div>
      </div>
  );
}
