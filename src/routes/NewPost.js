import { useParams } from "react-router-dom";

function NewPost() {
  const params = useParams();
  const blogId = params.blogId;
  
}


// postId: 6592567046209361769
// blogId: 8309785320197399506
// window.gapi.client.blogger.posts.insert({blogId: '8309785320197399506', title: 'test', content: '<strong>test</strong>'}).then(() => {})
export default NewPost;