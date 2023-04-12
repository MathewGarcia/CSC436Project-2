import { useSelector } from "react-redux";
import React, { useState } from "react";
import { useParams, Link } from "react-router-dom";

const Post = () => {
  const { id } = useParams();
  const { posts } = useSelector((state) => state.blog);
  const post = posts.find((p) => p.id === parseInt(id));
  const [hiding, setHiding] = useState(true);

  const handleHiding = () => {
    if (!hiding) {
      setHiding(true);
    } else {
      setHiding(false);
    }
  };

  if (!post) {
    return <div>Post not found.</div>;
  }

  return (
    <div
      style={{
        backgroundColor: "#F4F5F7",
        padding: "20px",
        borderRadius: "10px",
      }}
    >
      <div>
        <Link to={"/posts"}>
          <button
            style={{
              backgroundColor: "gray",
              borderRadius: "10px",
              color: "white",
              padding: "10px 20px",
              border: "none",
              cursor: "pointer",
            }}
          >
            Go Back
          </button>
        </Link>
      </div>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <div style={{ flex: "1 1 80%" }}>
          <h1>{post.title}</h1>
          <div
            style={{
              borderBottom: "2px solid #ddd",
              paddingBottom: "10px",
            }}
          />

          <p>{post.content}</p>

          <small>Posted By: u/matanator3320</small>

          <small>
            <br /> Originally Published: &nbsp;
            {new Date(post.originally_published).toLocaleString()}
          </small>

          <small>
            <br />
            Last updated: {new Date(post.last_updated).toLocaleString()}
          </small>
        </div>
        <div style={{ flex: "1 1 20%", textAlign: "right" }}>
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
            Edit Post
          </button>
        </div>
      </div>

      <Link to={post && `/PostCreation/${post.id}`}>
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
        >
          Update Post
        </button>
      </Link>
    </div>
  );
};

export default Post;
