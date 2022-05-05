import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function DeletePost({ gapi }) {
  const params = useParams();
  const blogId = params.blogId;
  const postId = params.postId;
  const [isDeleted, setIsDeleted] = useState(false);
  const [error, setError] = useState(false);

  const deletePostHandler = async () => {
    try {
      await gapi.deletePost(blogId, postId);
      setIsDeleted(true);
    } catch (error) {
      setError(true);
    }
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
          No, go back{" "}
        </Link>
      </div>
    </div>
  );
}

export default DeletePost;
