import React from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { createPost, updatePost } from "../features/blogSlice";

const PostCreation = () => {
  const dispatch = useDispatch();

  const nav = useNavigate();

  const { id } = useParams();

  const post = useSelector((state) =>
    state.blog.posts.find((p) => p.id === parseInt(id))
  );

  const [postData, setPostData] = useState({
    title: post && post.title ? post.title : "",
    content: post && post.content ? post.content : "",
  });

  const updatePostData = (event) => {
    setPostData({
      ...postData,
      [event.target.name]: event.target.value,
    });
  };

  const submitPost = (event) => {
    event.preventDefault();

    if (post) {
      dispatch(updatePost({ id: post.id, ...postData }));
      nav(`/posts/${post.id}`);
    } else {
      dispatch(createPost(postData));
    }

    setPostData({
      title: "",
      content: "",
    });
  };

  return (
    <>
      <div>
        {post && (
          <>
            <div>
              <h1>Updating Post</h1>
              <form onSubmit={submitPost}>
                <div>
                  <label htmlFor="titleInput">Title:</label>
                  <input
                    type="text"
                    id="titleInput"
                    name="title"
                    value={postData.title}
                    style={{ width: "50%" }}
                    onChange={updatePostData}
                  />
                  <div>
                    <label htmlFor="bodyInput">Body:</label>
                  </div>
                  <textarea
                    id="bodyInput"
                    name="content"
                    value={postData.content}
                    style={{ width: "50%", height: "100px" }}
                    onChange={updatePostData}
                  ></textarea>
                </div>
                <button
                  style={{
                    backgroundColor: "gray",
                    borderRadius: "10px",
                    color: "white",
                    padding: "10px 20px",
                    border: "none",
                    cursor: "pointer",
                  }}
                  type="submit"
                >
                  Update
                </button>
              </form>
            </div>
          </>
        )}
      </div>

      {!post && (
        <>
          <div>
            <form onSubmit={submitPost}>
              <label htmlFor="titleInput">Title:</label>
              <input
                type="text"
                id="titleInput"
                name="title"
                value={postData.title}
                style={{ width: "50%" }}
                onChange={updatePostData}
              />

              <label htmlFor="bodyInput">Body:</label>

              <textarea
                id="bodyInput"
                name="content"
                value={postData.content}
                style={{ width: "50%", height: "100px" }}
                onChange={updatePostData}
              ></textarea>

              <button type="submit">Submit</button>
            </form>
          </div>
        </>
      )}
    </>
  );
};

export default PostCreation;
