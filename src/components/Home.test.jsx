import React from "react";
import { render } from "@testing-library/react";
import { describe, test } from "vitest";
import "@testing-library/jest-dom/extend-expect";
import { BrowserRouter } from "react-router-dom";
import Home from "./Home";

describe("Home component", () => {
  test("renders the navigation links", () => {
    const { getByText } = render(
      <BrowserRouter>
        <Home />
      </BrowserRouter>
    );
    const homeLink = getByText(/home/i);
    const postsLink = getByText(/posts/i);
    expect(homeLink).toBeInTheDocument();
    expect(postsLink).toBeInTheDocument();
  });
});
