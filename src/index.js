import { render } from "react-dom";
import Home from "./routes/Home";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import NewPost from "./routes/NewPost";

const rootElement = document.getElementById("root");
render(
  <BrowserRouter>
    <Routes>
      <Route path="/post/new" element={<NewPost />} />
      <Route path="/" element={<Home />} />
      <Route path="*" element={<index> <h2>Error 404: page not found.</h2> </index>} />
    </Routes>
  </BrowserRouter>,
  rootElement
);
