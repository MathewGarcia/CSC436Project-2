import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

//fetch the post and set the data
export const fetchPosts = createAsyncThunk("blog/fetchPosts", async () => {
  const response = await axios.get("http://localhost:3001/v1/api/posts");
  return response.data;
});

//create the post and set the data.
export const createPost = createAsyncThunk("blog/createPost", async (post) => {
  const response = await axios.post("http://localhost:3001/v1/api/posts", post);
  return response.data;
});

//update the post and return the data
export const updatePost = createAsyncThunk("blog/updatePost", async (post) => {
  const response = await axios.patch(
    `http://localhost:3001/v1/api/posts/${post.id}`,
    post
  );
  return response.data;
});

//delete the post and return the id deleted
export const deletePost = createAsyncThunk("blog/deletePost", async (id) => {
  await axios.delete(`http://localhost:3001/v1/api/posts/${id}`);
  return id;
});

export const blogSlice = createSlice({
  name: "blog",
  initialState: {
    posts: [],
    status: "idle",
    error: null,
    selectedPosts: [],
  },
  reducers: {
    togglePostsSelection: (state, action) => {
      const { selectedPosts } = state;
      const postId = action.payload;
      const isSelected = state.selectedPosts.includes(postId);

      if (isSelected) {
        state.selectedPosts = state.selectedPosts.filter((id) => id !== postId);
      } else {
        state.selectedPosts.push(postId);
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPosts.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.posts = action.payload;
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(createPost.fulfilled, (state, action) => {
        state.posts.push(action.payload);
      })
      .addCase(updatePost.fulfilled, (state, action) => {
        const { id, title, content } = action.payload;
        const existingPost = state.posts.find((post) => post.id === id);
        if (existingPost) {
          existingPost.title = title;
          existingPost.content = content;
        }
      })
      .addCase(deletePost.fulfilled, (state, action) => {
        const id = action.payload;
        const index = state.posts.findIndex((post) => post.id === id);
        if (index !== -1) {
          state.posts.splice(index, 1);
        }
      })
      .addCase("blog/togglePostsSelection", (state, action) => {
        const postId = action.payload;
        const index = state.selectedPosts.indexOf(postId);
        if (index === -1) {
          state.selectedPosts.push(postId);
        } else {
          state.selectedPosts.splice(index, 1);
        }
      });
  },
});

export const { togglePostsSelection } = blogSlice.actions;

export default blogSlice.reducer;
