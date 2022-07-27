import NewPost from "./NewPost";
import { mockGapi, renderNewPostWithRouter } from "../testUtils";
import { act } from "@testing-library/react";
import { screen } from "@testing-library/dom";
import userEvent from "@testing-library/user-event";

it("renders without crashing", async () => {
  await act(async () => {
    await renderNewPostWithRouter(<NewPost gapi={mockGapi()} />);
  });
});

it("renders a message if there's an error fetching the data", async () => {
  await act(async () => {
    await renderNewPostWithRouter(
      <NewPost gapi={mockGapi({ getBlogData: () => Promise.reject() })} />
    );
  });

  const dataErrorMessage = screen.getByText(
    /There was an error loading this page, please try again./i
  );
  expect(dataErrorMessage).toBeInTheDocument();
});

it("renders a message if there's an error posting", async () => {
  await act(async () => {
    await renderNewPostWithRouter(
      <NewPost gapi={mockGapi({ addPost: () => Promise.reject() })} />
    );
  });

  userEvent.click(screen.getByText(/Publish/i));
  const postingErrorMessage = screen.getByText(
    /There was an error making this post, please try again./i
  );
  expect(postingErrorMessage).toBeInTheDocument();
});
