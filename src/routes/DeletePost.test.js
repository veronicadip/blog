import DeletePost from "./DeletePost";
import { renderDeletePostWithRouter, mockGapi } from "../testUtils";
import { act } from "@testing-library/react";
import { screen } from "@testing-library/dom";
import userEvent from "@testing-library/user-event";

it("renders without crashing", async () => {
  await act(async () => {
    await renderDeletePostWithRouter(<DeletePost gapi={mockGapi()} />);
  });
});

it("renders a message when there's an error deleting the post", async () => {
  await act(async () => {
    await renderDeletePostWithRouter(
      <DeletePost gapi={mockGapi({ deletePost: () => new Promise.reject() })} />
    );
  });

  userEvent.click(screen.getByText(/Yes/i));
  const errorMessage = screen.getByText(
    /There was an error deleting this post, please try again./i
  );
  expect(errorMessage).toBeInTheDocument();
});

it("renders a message before deleting post", async () => {
  await act(async () => {
    await renderDeletePostWithRouter(<DeletePost gapi={mockGapi()} />);
  });

  const confirmMessage = screen.getByText(
    /Are you sure you want to delete this post/i
  );
  expect(confirmMessage).toBeInTheDocument();
});
