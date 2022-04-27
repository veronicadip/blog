import { render } from "react-dom";
import Home from "./routes/Home";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import NewPost from "./routes/NewPost";

render(
  <BrowserRouter>
    <Routes>
      <Route path="/post/new" element={<NewPost />} />
      <Route path="/" element={<Home />} />
      <Route path="*" element={<h2>Error 404: page not found.</h2>} />
    </Routes>
  </BrowserRouter>,
  document.getElementById("root")
);
