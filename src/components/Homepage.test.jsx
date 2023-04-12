import { render } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";

import { describe, test } from "vitest";
import Homepage from "./Homepage";

describe("Homepage", () => {
  test("renders the correct content", () => {
    const { getByText } = render(<Homepage />);
    const content = getByText(
      "It's 2008, you are a back end developer for Reddit. You moderate what people can post, what they can see, accounts, etc. This is the backend, no  one even knows you're online. Now snoop and if anyone breaks any rules, delete their post, edit their post - cant ban yet - , or create posts! Go to the \"Post\" section in the nav bar to see the current posts.."
    );
    expect(content).toBeInTheDocument();
  });
});
