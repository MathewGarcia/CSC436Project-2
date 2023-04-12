import { Provider } from "react-redux";
import { render, fireEvent, getByLabelText } from "@testing-library/react";
import { describe, test } from "vitest";
import { MemoryRouter } from "react-router-dom"; // import MemoryRouter
import PostCreation from "./PostCreation";
import { configureStore } from "@reduxjs/toolkit";
import "@testing-library/jest-dom/extend-expect";
import blogReducer from "../features/blogSlice";

describe("testing that text boxes and stuff pop up ", () => {
  test("testing texts boxes", () => {
    const store = configureStore({
      reducer: { blog: blogReducer },
    });
    const { getByLabelText } = render(
      <Provider store={store}>
        <MemoryRouter>
          <PostCreation />
        </MemoryRouter>
      </Provider>
    );

    const titleInput = getByLabelText("Title:");
    const contentInput = getByLabelText("Body:");

    fireEvent.change(titleInput, { target: { value: "Test title" } });
    fireEvent.change(contentInput, { target: { value: "Test content" } });

    expect(titleInput.value).toBe("Test title");
    expect(contentInput.value).toBe("Test content");
  });
});
