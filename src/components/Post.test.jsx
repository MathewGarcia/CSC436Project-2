import { Provider } from "react-redux";
import { render } from "@testing-library/react";
import { describe, test } from "vitest";
import Post from "./Post";
import { configureStore } from "@reduxjs/toolkit";
import "@testing-library/jest-dom/extend-expect";
import blogReducer from "../features/blogSlice";

describe("Post component", () => {
  test("testing when post is not found", () => {
    const store = configureStore({
      reducer: { blog: blogReducer },
      preloadedState: {
        blog: {
          posts: [],
        },
      },
    });
    const { getByText } = render(
      <Provider store={store}>
        <Post match={{ params: { id: 1 } }} />
      </Provider>
    );
    const noPost = getByText("Post not found.");
    expect(noPost).toBeInTheDocument();
  });

  test("testing when we post the content", () => {
    const store = configureStore({
      reducer: { blog: blogReducer },
      preloadedState: {
        blog: {
          posts: [{ id: 1, title: "Hi", content: "Hey" }],
        },
      },
    });
    const { getByText } = render(
      <Provider store={store}>
        <Post match={{ params: { id: 1 } }} />
      </Provider>
    );
    const postTitle = getByText("Hi");
    const postContent = getByText("Hey");
    expect(postTitle).toBeInTheDocument();
    expect(postContent).toBeInTheDocument();
  });
});
