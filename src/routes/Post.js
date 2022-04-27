import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";


function Post() {
  const params = useParams();
  const blogId = params.blogId;
  const postId = params.postId;
  const [postData, setPostData] = useState([]);
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
            .list({ blogId: blogId })
            .then((data) => {
              setPostData(data.result.items.find((obj) => obj.id === postId));
              setIsLoadingPost(false);
            })
            .catch(setPostError(true), setIsLoadingPost(false));
        });
    });
  });

  const renderPostTest = () => {
    if (isLoadingPost) {
      return (
        <div>
          <span>Loading...</span>
        </div>
      )
    }
    if (postError) {
      return (
        <div>
          <span>There was an error loading this post, please try again.</span>
        </div>
      )
    }
    return (
      <div>
        <h2>{postData.title}</h2>
        <div dangerouslySetInnerHTML={{ __html: postData.content }} />
      </div>
    );
  }
  return renderPostTest()
  
}

// window.gapi.client.blogger.posts.list({ blogId: "8309785320197399506" }).then((xx) => console.log(xx))
/* 
*/
export default Post;
