import { BrowserRouter } from "react-router-dom";
import { render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

export const renderWithRouter = async (component, { route = "/" } = {}) => {
  window.history.pushState({}, "Test page", route);
  return render(component, { wrapper: BrowserRouter });
};

//[
// {
//     id: "1234567890",
//     name: "blog name test 1",
//   },
//   {
//     id: "123123123123",
//     name: "second blog",
//   },
// ]

export const mockGapi = (values) => {
  const { isSignedIn, blogItems } = Object.assign({
    isSignedIn: true,
    blogItems: [],
  }, values);

  window.gapi = {
    load: (_, fn) => {
      fn();
    },
    client: {
      init: () => Promise.resolve(),
      blogger: {
        blogs: {
          listByUser: () =>
            Promise.resolve({
              result: {
                items: blogItems,
              },
            }),
        },
      },
    },
    auth2: {
      getAuthInstance: () => ({
        isSignedIn: { get: () => isSignedIn, listen: () => {} },
      }),
    },
  };
};
