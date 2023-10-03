import { render, screen } from "@testing-library/react";
import App from "./App";
import React from "react";

test("renders LMS app", () => {
  render(<App />);
  const linkElement = screen.getByText(/Courses/i);
  expect(linkElement).toBeInTheDocument();
});
