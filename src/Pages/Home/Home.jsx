import "../../styles/pages/_home.scss";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import UserPostsList from "../../Cmps/UserPostsList";
import AddPost from "../../Cmps/AddPost";
import { Link } from "react-router-dom";

function Home() {
  const user = JSON.parse(localStorage.getItem("Connected User"));

  const baseUrl = process.env.REACT_APP_SERVER_URL;
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    getPosts();
  }, []);

  async function getPosts() {
    try {
      const res = await axios.get(`${baseUrl}/posts`);
      const posts = res.data;
      setPosts(posts);
    } catch (error) {
      toast.error(error.message);
    }
  }

  const handleSignOut = () => {
    localStorage.removeItem("Connected User");
  };

  async function onAddPost(newPostContent) {
    try {
      const res = await axios.post(`${baseUrl}/posts`, {
        content: newPostContent,
        by: { username: user.username },
      });
      const { posts, message } = res.data;
      setPosts(posts);
      toast.success(message);
    } catch (error) {
      toast.error("Error to add post");
    }
  }

  const onRemovePost = async (postId) => {
    try {
      const res = await axios.delete(`${baseUrl}/posts/${postId}`);
      const { posts, message } = res.data;
      toast.success(message);
      setPosts(posts);
    } catch (error) {
      toast.error("Error deleting post, please try later.");
    }
  };

  const onUpdatePost = async (newPostContent, postId) => {
    const updatedPost = {
      id: postId,
      content: newPostContent,
    };
    try {
      await axios.put(`${baseUrl}/posts`, updatedPost);
      setPosts((prevPosts) => {
        return prevPosts.map((currPost) => {
          if (currPost.id === postId) {
            return {
              ...currPost,
              content: newPostContent,
            };
          }
          return currPost;
        });
      });
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div className="wrapper home">
      {user && (
        <div>
          <p>
            Hi, {user.username}{" "}
            <Link to="/login" onClick={handleSignOut}>
              sign out
            </Link>
          </p>

          <h2 className="title">Forum Page</h2>
          <AddPost onAddPost={onAddPost} />
          <h3>Published posts</h3>

          <UserPostsList
            posts={posts}
            user={user}
            onRemovePost={onRemovePost}
            onUpdatePost={onUpdatePost}
          />
        </div>
      )}
    </div>
  );
}

export default Home;
