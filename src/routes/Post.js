import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Comment from "../components/Comment/Comment";

function Post() {
  const params = useParams();
  const blogId = params.blogId;
  const postId = params.postId;
  const [postData, setPostData] = useState({});
  const [postComments, setPostComments] = useState({});
  const [isLoadingComments, setIsLoadingComments] = useState(true);
  const [commentsError, setCommentsError] = useState(false);
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
              setPostData(response);
              setIsLoadingPost(false);
            })
            .catch(() => {
              setPostError(true);
              setIsLoadingPost(false);
            });
        })
        .then(() => {
          window.gapi.client
            .request({
              path: `https://www.googleapis.com/blogger/v3/blogs/${blogId}/posts/${postId}/comments?key=AIzaSyDYXml006Hj3GNvIkiSlOk6FklzKtk054M`,
            })
            .then((response) => {
              setPostComments(response);
              setIsLoadingComments(false);
            })
            .catch(() => {
              setCommentsError(true);
              setIsLoadingComments(false);
            });
        });
    });
  }, []);

  const renderNumberOfComments = () => {
    if (postData.result.replies.totalItems === "0") {
      return <p>There aren't any comments yet.</p>;
    }
    return <p>{postData.result.replies.totalItems} comments</p>;
  };

  const renderComments = () => {
    if (postData.result.replies.totalItems !== "0") {
      if (isLoadingComments) {
        return (
          <div>
            <span>Loading...</span>
          </div>
        );
      }
      if (commentsError) {
        return (
          <div>
            <span>
              There was an error loading the comment section, please try again.
            </span>
          </div>
        );
      }
      return postComments.result.items.map((comment) => (
        <Comment comment={comment} key={comment.id} />
      ));
    }
  };

  const renderPublishedDate = () => {
    const publishedDate = new Date(postData.result.published);
    return publishedDate.toLocaleString();
  };

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
      <img
        src={postData.result.author.image.url}
        alt="profile picture of the author of this post"
      />
      <span>{postData.result.author.displayName}</span>
      <h1>{postData.result.title}</h1>
      <p>Published: {renderPublishedDate()}</p>
      <div dangerouslySetInnerHTML={{ __html: postData.result.content }} />
      {renderNumberOfComments()}
      {renderComments()}
    </div>
  );
}

export default Post;
