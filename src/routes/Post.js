import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import CommentsList from "../components/CommentsList/CommentsList";
import { Link } from "react-router-dom";

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
          window.gapi.client.blogger.posts
            .get({ postId: postId, blogId: blogId })
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
          window.gapi.client.blogger.comments
            .list({
              blogId: blogId,
              postId: postId,
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
      <CommentsList
        postData={postData}
        postComments={postComments}
        isLoadingComments={isLoadingComments}
        commentsError={commentsError}
      />
      <Link
        to={`/blog/${blogId}/post/${postId}/delete`}
        key={postId}
      >
        Delete Post
        </Link>

    </div>
  );
}

export default Post;
