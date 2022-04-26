import { Component } from "react";
import Post from "../Post/Post";

class Blog extends Component {
  state = {
    posts: [],
    isLoadingPosts: true,
    postsError: false,
  };
  componentDidMount() {
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
            .list({ blogId: this.props.blog.id })
            .then((postData) => {
              this.setState({
                posts: postData.result.items,
                isLoadingPosts: false,
              });
            })
            .catch(() => {
              this.setState({ postsError: true, isLoadingPosts: false });
            });
        });
    });
  }

  render() {
    if (this.state.isLoadingPosts) {
      return (
        <div>
          <span>Loading...</span>
        </div>
      );
    }
    if (this.props.postsError) {
      return (
        <div>
          <span>There was an error loading these posts, please try again.</span>
        </div>
      );
    }
    return (
      <div>
        <h2>{this.props.blog.name}</h2>
        {this.state.posts.map((post) => (
          <Post post={post} key={post.id} blogId={this.props.blog.id}/>
        ))}
      </div>
    );
  }
}


export default Blog;
