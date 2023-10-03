import React from "react";
import { render } from "@testing-library/react";
import CreateCourse from "../../../pages/CreateFormCourse/createCourse";

test("renders CreateCourse component without errors", () => {
  render(<CreateCourse />);
});

test("displays the correct content", () => {
  const { getByText } = render(<CreateCourse />);

  const sessionTitle = getByText(/Session 1/i);
  expect(sessionTitle).toBeInTheDocument();

  const description = getByText(/Description/i);
  expect(description).toBeInTheDocument();
});
