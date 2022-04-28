import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function Post() {
  const params = useParams();
  const blogId = params.blogId;
  const postId = params.postId;
  const [postData, setPostData] = useState({});
  const [isLoadingPost, setIsLoadingPost] = useState(true);
  const [postError, setPostError] = useState(false);

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
          window.gapi.client
            .request({
              path: `https://www.googleapis.com/blogger/v3/blogs/${blogId}/posts/${postId}?key=AIzaSyDYXml006Hj3GNvIkiSlOk6FklzKtk054M`,
            })
            .then((response) => {
              console.log(response);
              setPostData(response);
              setIsLoadingPost(false);
            })
            .catch(() => {
              setPostError(true);
              setIsLoadingPost(false);
            });
        });
    });
  }, []);

  const renderComments = () => {
      if (postData.result.replies.totalItems === "0") {
          return <p>There aren't any comments yet.</p>
      }
      return <p>{postData.result.replies.totalItems} comments</p>
  }

  const renderPublishedDate = () => {
      const publishedDate = new Date(postData.result.published)
      return publishedDate.toLocaleString()
  }

  

  if (isLoadingPost) {
    return (
      <div>
        <span>Loading...</span>
      </div>
    );
  }
  if (postError) {
    return (
      <div>
        <span>There was an error loading this post, please try again.</span>
      </div>
    );
  }
  return (
    <div>
        <div className="postAuthor">
      <img src={postData.result.author.image.url} alt="profile picture of the author of this post"/>
      <span>{postData.result.author.displayName}</span>
      </div>
      <h1>{postData.result.title}</h1>
      <p>Published: {renderPublishedDate()}</p>
      <div dangerouslySetInnerHTML={{ __html: postData.result.content }} />
      {renderComments()}
    </div>
  );
}

// window.gapi.client.blogger.posts.list({ blogId: "8309785320197399506" }).then((xx) => console.log(xx))
/*
 */
export default Post;
