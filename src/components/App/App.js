import { Link } from "react-router-dom";

import './App.css';

function App() {
  return (
    <div className="App">
      <Link to="/">All posts</Link> |{" "}
      <Link to="/post/new">Add a new post</Link>
    </div>
  );
}

export default App;
