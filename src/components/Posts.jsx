import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchPosts,
  togglePostsSelection,
  deletePost,
} from "../features/blogSlice";
import { Link } from "react-router-dom";

const Posts = () => {
  const dispatch = useDispatch();
  const { posts, loading, selectedPosts } = useSelector((state) => state.blog);
  const [hiding, setHiding] = useState(true);

  useEffect(() => {
    dispatch(fetchPosts());
  }, [dispatch]);

  const handlePostSelection = (postId) => {
    dispatch(togglePostsSelection(postId));
  };

  const handleHiding = () => {
    if (!hiding) {
      setHiding(true);
    } else {
      setHiding(false);
    }
  };

  const handleDelete = () => {
    if (selectedPosts > 0) {
      selectedPosts.forEach((postId) => {
        dispatch(deletePost(postId));
      });
    }
    return;
  };

  return (
    <>
      <div style={{ textAlign: "right" }}>
        <Link style={{ textDecoration: "none" }} to="/PostCreation">
          <button
            style={{
              backgroundColor: "red",
              borderRadius: "10px",
              color: "white",
              padding: "10px 20px",
              border: "none",
              cursor: "pointer",
            }}
          >
            Create New Post +
          </button>
        </Link>

        <button
          style={{
            backgroundColor: "gray",
            borderRadius: "10px",
            color: "white",
            padding: "10px 20px",
            border: "none",
            cursor: "pointer",
          }}
          onClick={() => {
            handleHiding();
          }}
        >
          Edit Page
        </button>
      </div>
      {loading && <p>loading...</p>}
      {!loading && (
        <ul style={{ listStyle: "none" }}>
          {posts.map((post) => (
            <li
              key={post.id}
              style={{
                marginBottom: "20px",
                boxShadow: "0px 1px 5px rgba(0,0,0,0.1)",
                borderRadius: "5px",
                backgroundColor: "#fff",
                padding: "20px",
              }}
            >
              <input
                type="checkbox"
                checked={selectedPosts && selectedPosts.includes(post.id)}
                onChange={() => handlePostSelection(post.id)}
                hidden={hiding}
              />
              <Link style={{ textDecoration: "none" }} to={`/posts/${post.id}`}>
                {post.title}
                <p>{post.content.slice(0, 100)}...</p>
                <small>Posted By: u/matanator3320 </small>
              </Link>
            </li>
          ))}
        </ul>
      )}
      <div>
        <button
          style={{
            backgroundColor: "gray",
            borderRadius: "10px",
            color: "white",
            padding: "10px 20px",
            border: "none",
            cursor: "pointer",
          }}
          hidden={hiding}
          onClick={() => {
            handleDelete();
          }}
        >
          Delete Post
        </button>
      </div>
    </>
  );
};

export default Posts;
