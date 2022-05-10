import React, { Component } from "react";
import Home from "./Home";
import { renderHomeWithRouter, mockGapi, hardcodedBlogs } from "../testUtils";
import { act, render } from "@testing-library/react";
import { screen } from "@testing-library/dom";

it("renders without crashing", async () => {
  await act(async () => {
    await renderHomeWithRouter(<Home gapi={mockGapi()} />);
  });
});

it("renders a message when the user doesn't have any blogs", async () => {
  await act(async () => {
    await renderHomeWithRouter(<Home gapi={mockGapi()} />);
  });

  const emtpyMessage = screen.getByText(/There aren't any blogs yet/i);
  expect(emtpyMessage).toBeInTheDocument();
});

it("renders a message when the blogs are loading", async () => {
  await act(async () => {
    await renderHomeWithRouter(
      <Home
        gapi={mockGapi({
          getUserBlogs: () => new Promise(() => {}),
        })}
      />
    );
  });

  const loadingMessage = screen.getByText(/Loading.../i);
  expect(loadingMessage).toBeInTheDocument();
});

it("renders a message when there's an error fetching the blogs", async () => {
  await act(async () => {
    await renderHomeWithRouter(
      <Home gapi={mockGapi({ getUserBlogs: () => new Promise.reject() })} />
    );
  });

  const errorMessage = screen.getByText(
    /There was an error loading these blogs, please try again./i
  );
  expect(errorMessage).toBeInTheDocument();
});

it("renders the fetched blogs", async () => {
  await act(async () => {
    await renderHomeWithRouter(
      <Home
        gapi={mockGapi({
          getUserBlogs: () => Promise.resolve(hardcodedBlogs()),
        })}
      />
    );
  });

  const blogs = screen.getByText(/blog name test 1/i);
  expect(blogs).toBeInTheDocument();
});
