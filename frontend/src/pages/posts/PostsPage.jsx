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

  async function createImagePost(text, file) {
    try {
      const response = await PostsApi.createPost(text, file);
      const post = response.data;
      const newPosts = posts.concat(post);
      setPosts(newPosts);
    } catch (e) {
      console.error(e);
      alert("Post with Image failed to post");
    }
  }

  async function createImagePost(text, file){
    try{
      const response = await PostsApi.createPost(text, file);
      const post = response.data;
      const newPosts = posts.concat(post);
      setPosts(newPosts);
    } catch (e) {
      console.error(e);
      alert("Post with Image failed to post");
    }
  }

  async function uploadFile(file){
    try{
      const response = await PostsApi.uploadFile(file);
      const post = response.data;
      const newPosts = posts.concat(post);
      setPosts(newPosts);
    }catch (e) {
      console.error(e);
      alert("Image failed to upload");
    }
  }

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
          currentUser={currentUser}
          onDeleteClick={() => deletePost(post)}
      />
  ));

  return (
<<<<<<< HEAD
      <div className="post-grid-item">
        <div className="post-main-content">
          <div className="postcard-container">
            <PostForm
                className="postform"
                onSubmit={(postData) => createPost(postData)}
                onImagePostSubmit={(text, file) => createImagePost(text, file)}
            />
            {CardsArray}
          </div>
        </div>
      </div>
=======
    <div className="postcard-container">
      <PostForm className= "postcard-item" onSubmit={(postData) => createPost(postData)} onImagePostSubmit={(file) => uploadFile(file)}/>

      {CardsArray}
    </div>
>>>>>>> d975597 (add logic for on submission of image)
  );
}
