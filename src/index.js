import { render } from "react-dom";
import Home from "./routes/Home";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import NewPost from "./routes/NewPost";
import Post from "./routes/Post";
import LogIn from "./routes/LogIn";
import DeletePost from "./routes/DeletePost";
import gapi from "./lib/gapi";

render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Home gapi={gapi} />} />
      <Route path="/blog/:blogId/post/new" element={<NewPost />} />
      <Route path="/blog/:blogId/post/:postId" element={<Post />} />
      <Route path="*" element={<h2>Error 404: page not found.</h2>} />
      <Route path="/logIn" element={<LogIn gapi={gapi}/>} />
      <Route
        path="/blog/:blogId/post/:postId/delete"
        element={<DeletePost gapi={gapi} />}
      />
    </Routes>
  </BrowserRouter>,
  document.getElementById("root")
);
