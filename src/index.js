import { render } from "react-dom";
import App from "./components/App/App";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import NewPost from "./routes/new-post";

const rootElement = document.getElementById("root");
render(
  <BrowserRouter>
    <Routes>
      <Route path="/post/new" element={<NewPost />} />
      <Route path="/" element={<App />} />
    </Routes>
  </BrowserRouter>,
  rootElement
);
