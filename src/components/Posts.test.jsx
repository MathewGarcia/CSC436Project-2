import React from "react";
import { render } from "@testing-library/react";
import { describe, test } from "vitest";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import Posts from "./Posts";
import blogReducer from "../features/blogSlice";
import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom/extend-expect";

describe("Posts component", () => {
  test("renders the posts list", () => {
    const store = configureStore({
      reducer: { blog: blogReducer },
      preloadedState: {
        blog: {
          posts: [
            {
              id: 1,
              title: "Test title 1",
              content: "Test content 1",
            },
            {
              id: 2,
              title: "Test title 2",
              content: "Test content 2",
            },
          ],
        },
      },
    });

    const { getByText } = render(
      <Provider store={store}>
        <MemoryRouter>
          <Posts />
        </MemoryRouter>
      </Provider>
    );

    const postTitle1 = getByText("Test title 1");
    const postTitle2 = getByText("Test title 2");

    expect(postTitle1).toBeInTheDocument();
    expect(postTitle2).toBeInTheDocument();
  });
});
