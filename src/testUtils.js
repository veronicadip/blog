import { BrowserRouter } from "react-router-dom";
import { render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

export const renderHomeWithRouter = async (component, { route = "/" } = {}) => {
  window.history.pushState({}, "Test page", route);
  return render(component, { wrapper: BrowserRouter });
};

export const renderPostWithRouter = async (
  component,
  { route = "/blog/:blogId/post/:postId" } = {}
) => {
  window.history.pushState({}, "Test page", route);
  return render(component, { wrapper: BrowserRouter });
};

export const renderDeletePostWithRouter = async (
  component,
  { route = "/blog/:blogId/post/:postId/delete" } = {}
) => {
  window.history.pushState({}, "Test page", route);
  return render(component, { wrapper: BrowserRouter });
};

export const renderNewPostWithRouter = async (
  component,
  { route = "/blog/:blogId/post/new" } = {}
) => {
  window.history.pushState({}, "Test page", route);
  return render(component, { wrapper: BrowserRouter });
};

export const mockGapi = (values) => {
  return Object.assign(
    {
      load() {
        return Promise.resolve();
      },

      onSigninChange() {},

      isSignedIn() {
        return true;
      },

      getUserBlogs() {
        return Promise.resolve({ result: { items: [] } });
      },

      getPost() {
        return Promise.resolve({
          result: {
            author: {
              displayName: "Fulano",
              image: {
                url: "http://www.blogger.com/img/blogger_logo_round_35.png",
              },
            },
            published: "17-05-2012",
            title: "this is a post 87878 !!!",
            content: "puki",
          },
        });
      },

      deletePost() {
        return Promise.resolve();
      },

      getBlogData() {
        return Promise.resolve({
          result: {
            name: "new post name",
          },
        });
      },

      addPost() {
        return Promise.resolve();
      },
    },
    values
  );
};

export const hardcodedBlogs = () => {
  const blogData = {
    result: {
      items: [
        {
          id: "1234567890",
          name: "blog name test 1",
        },
        {
          id: "123123123123",
          name: "second blog",
        },
      ],
    },
  };
  return blogData;
};
