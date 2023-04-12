import { render } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import { describe, test } from "vitest";
import Footer from "./Footer";

describe("Footer", () => {
  test("renders the correct content", () => {
    const { getByText } = render(<Homepage />);
    const content = getByText(
      "Mathew Garcia Project-2™ 2023 All Rights Reserved."
    );
    expect(content).toBeInTheDocument();
  });
});
