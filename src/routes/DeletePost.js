import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function DeletePost() {
  const params = useParams();
  const blogId = params.blogId;
  const postId = params.postId;
  const [isDeleted, setIsDeleted] = useState(false);
  const [error, setError] = useState(false);

  const deletePostHandler = () => {
    window.gapi.load("client:auth2", () => {
      window.gapi.client
        .init({
          apiKey: "AIzaSyDYXml006Hj3GNvIkiSlOk6FklzKtk054M",
          discoveryDocs: [
            "https://blogger.googleapis.com/$discovery/rest?version=v3",
          ],
          clientId:
            "524350509394-02lt9mikkjuiea852kj4da9aj3ctibeq.apps.googleusercontent.com",
          scope: "https://www.googleapis.com/auth/blogger",
        })
        .then(() => {
          window.gapi.client.blogger.posts
            .delete({ blogId: blogId, postId: postId })
            .then(() => {
              setIsDeleted(true);
            })
            .catch(() => {
              setError(true);
            });
        });
    });
  };
  if (isDeleted) {
    return (
      <div>
        <h2>Post deleted.</h2>
        <Link to={`/`}>Go back home</Link>
      </div>
    );
  }
  if (error) {
    return (
      <div>
        <span>There was an error deleting this post, please try again.</span>
      </div>
    );
  }
  return (
    <div>
      <h2>Are you sure you want to delete this post?</h2>
      <div>
        <button onClick={deletePostHandler}>Yes</button>
        <Link to={`/blog/${blogId}/post/${postId}`} key={postId}>
          <button>No, go back</button>{" "}
        </Link>
      </div>
    </div>
  );
}

export default DeletePost;
