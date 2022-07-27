import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { parse } from "marked";

function NewPost({ gapi }) {
  const params = useParams();
  const blogId = params.blogId;
  const [blogData, setBlogData] = useState("");
  const [postTitle, setPostTitle] = useState("");
  const [postContent, setPostContent] = useState("");
  const [isLoadingPosting, setIsLoadingPosting] = useState(false);
  const [errorPosting, setErrorPosting] = useState(false);
  const [isLoadingData, setIsLoadingData] = useState(true);
  const [dataError, setDataError] = useState(false);

  const setTitle = (event) => {
    setPostTitle(event.currentTarget.value);
  };

  const setContent = (event) => {
    setPostContent(parse(event.currentTarget.value));
  };

  const fetchBlogData = async () => {
    try {
      const blogData = await gapi.getBlogData(blogId);
      setBlogData(blogData.result);
      setIsLoadingData(false);
    } catch (error) {
      setDataError(true);
      setIsLoadingData(false);
    }
  };

  const submitPostHandler = async () => {
    try {
      setIsLoadingPosting(true);
      await gapi.addPost(blogId, postTitle, postContent);
    } catch (error) {
      setErrorPosting(true);
    }
    setIsLoadingPosting(false);
  };

  useEffect(() => {
    fetchBlogData();
  }, []);

  if (isLoadingPosting || isLoadingData) {
    return (
      <div>
        <span>Loading...</span>
      </div>
    );
  }
  if (errorPosting) {
    return (
      <div>
        <span>There was an error making this post, please try again.</span>
      </div>
    );
  }
  if (dataError) {
    return (
      <div>
        <span>There was an error loading this page, please try again.</span>
      </div>
    );
  }
  return (
    <div>
      <p>Add a new post on {blogData.name}</p>
      <form>
        <input
          className="add-title"
          id="add-title"
          type="text"
          placeholder="Title"
          onChange={setTitle}
        />
        <div>
          <textarea className="add-content" id="add-content" cols="80" rows="30" onChange={setContent}></textarea>
        </div>
        <button type="button" onClick={submitPostHandler}>Publish</button>
      </form>
    </div>
  );
}

export default NewPost;
