import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

function NewPost() {
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
    setPostTitle(event.currentTarget.value)
  }

  const setContent = (event) => {
    setPostContent(event.currentTarget.value)
  }


  const submitPostHandler = () => {
    window.gapi.client.blogger.posts.insert({ blogId: blogId, title: postTitle, content: postContent }).then(() => {
      setIsLoadingPosting(true);
    })
      .catch(() => {
        setErrorPosting(true);
      })
  }

  useEffect(() => {

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
          window.gapi.client.blogger.blogs.get({ blogId: blogId })
            .then((response) => {
              setBlogData(response.result);
              setIsLoadingData(false);
            })
        })
        .catch(() => {
          setDataError(true);
          setIsLoadingData(false);
        })
    });
  }, []);

  if (isLoadingPosting) {
    return (
      <div>
        <span>Posting...</span>
      </div>
    )
  }
  if (isLoadingData) {
    return (
      <div>
        <span>Loading...</span>
      </div>
    )
  }
  if (errorPosting) {
    return (
      <div>
        <span>There was an error making this post, please try again.</span>
      </div>
    )
  }
  if (dataError) {
    return (
      <div>
        <span>There was an error loading this page, please try again.</span>
      </div>
    )
  }
  return (
    <div>
      <p>Add a new post on {blogData.name}</p>
      <form>
        <input className="add-title" id="add-title" type="text" placeholder="Title" onChange={setTitle} />
        <input className="add-content" id="add-content" type="text" onChange={setContent} />
        <button onClick={submitPostHandler}>Publish</button>
      </form>
    </div>
  )
}

export default NewPost;