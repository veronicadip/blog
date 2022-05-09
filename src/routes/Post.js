import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import CommentsList from "../components/CommentsList/CommentsList";
import { Link } from "react-router-dom";

function Post({ gapi }) {
  const params = useParams();
  const blogId = params.blogId;
  const postId = params.postId;
  const [postData, setPostData] = useState({});
  const [postComments, setPostComments] = useState({});
  const [isLoadingComments, setIsLoadingComments] = useState(true);
  const [commentsError, setCommentsError] = useState(false);
  const [isLoadingPost, setIsLoadingPost] = useState(true);
  const [postError, setPostError] = useState(false);


  const fetchPostData = async () => {
    try {
      const postData = await gapi.getPost(postId, blogId);
      setPostData(postData);
      setIsLoadingPost(false);
    } catch (error) {
      setPostError(true);
      setIsLoadingPost(false);
    }
  }

  const fetchCommentsData = async () => {
    try {
      const postComments = await gapi.getPostComments(blogId, postId);
      return (
        setPostComments(postComments),
        setIsLoadingComments(false)
      )
    } catch (error) {
      return (
        setCommentsError(true),
        setIsLoadingComments(false)
      )
    }
  }

  useEffect(() => {
      fetchPostData();
      fetchCommentsData()
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
