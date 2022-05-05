import React from "react";
import Home from "./Home";
import { renderWithRouter, mockGapi } from "../testUtils";
import { act } from "@testing-library/react";
import { screen } from "@testing-library/dom";

class MockGapi {
  load() {
    return Promise.resolve()
  }

  onSigninChange() {

  }

  isSignedIn() {
    return true
  }
}

it("renders without crashing", async () => {
  await act(async () => {
    mockGapi();

    await renderWithRouter(<Home />);
  });
});

it("renders a message when the user doesn't have any blogs", async () => {
  await act(async () => {
    mockGapi({ blogItems: [] });
    await renderWithRouter(<Home />);
  });

  const emtpyMessage = screen.getByText(/There aren't any blogs yet/i);
  expect(emtpyMessage).toBeInTheDocument();
});

it("renders a message when the blogs are loading", async () => {
  await act(async () => {
    mockGapi({ isLoading: true });
    await renderWithRouter(<Home />);
  });

  const loadingMessage = screen.getByText(/Loading.../i);
  expect(loadingMessage).toBeInTheDocument();

});
