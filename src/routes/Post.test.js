import Post from "./Post";
import {
  renderPostWithRouter,
  mockGapi,
  renderHomeWithRouter,
} from "../testUtils";
import { act } from "react-dom/test-utils";
import { screen } from "@testing-library/react";

it("renders without crashing", async () => {
  await act(async () => {
    await renderPostWithRouter(<Post gapi={mockGapi()} />);
  });
});

it("renders a message when the post is loading", async () => {
  await act(async () => {
    await renderHomeWithRouter(
      <Post gapi={mockGapi({ getPost: () => new Promise(() => {}) })} />
    );
  });

  const loadingMessage = screen.getByText(/Loading.../i);
  expect(loadingMessage).toBeInTheDocument();
});

it("renders a message when there's an error fetching the post data", async () => {
  await act(async () => {
    await renderPostWithRouter(
      <Post gapi={mockGapi({ getPost: () => new Promise.reject() })} />
    );
  });

  const errorMessage = screen.getByText(
    /There was an error loading this post, please try again./i
  );
  expect(errorMessage).toBeInTheDocument();
});

it("renders the fetched post", async () => {
  await act(async () => {
    await renderPostWithRouter(<Post gapi={mockGapi()} />);
  });

  const post = screen.getByText(/this is a post 87878 !!!/i);
  expect(post).toBeInTheDocument();
});
