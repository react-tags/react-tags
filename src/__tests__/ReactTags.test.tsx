import { render, screen } from "@testing-library/react";
import ReactTags from "../ReactTags";

describe("React Tags", () => {
  it("should render react tags", () => {
    render(<ReactTags placeholder="place" />);

    expect(screen.getByText(/react tags/i)).toBeInTheDocument();
  });
});