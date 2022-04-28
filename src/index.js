import { render } from "react-dom";
import Home from "./routes/Home";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import NewPost from "./routes/NewPost";
import Post from "./routes/Post"

render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/blog/:blogId/post/new" element={<NewPost />} />
      <Route path="/blog/:blogId/post/:postId" element={<Post />} />
    </Routes>
  </BrowserRouter>,
  document.getElementById("root")
);
