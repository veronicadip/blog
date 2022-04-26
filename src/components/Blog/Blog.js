import { Component } from "react";
import Post from "../Post/Post";

class Blog extends Component {
  state = {
    post: [],
    isLoadingPost: true,
    postError: false,
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
                post: postData.result.items,
                isLoadingPost: false,
              });
            })
            .catch(() => {
              this.setState({ postError: true, isLoadingPost: false });
            });
        });
    });
  }

  render() {
    if (this.state.isLoadingPost) {
      return (
        <div>
          <span>Loading...</span>
        </div>
      );
    }
    if (this.props.postError) {
      return (
        <div>
          <span>There was an error loading these posts, please try again.</span>
        </div>
      );
    }
    return (
      <div>
        <h2>{this.props.blog.name}</h2>
        {this.state.post.map((post) => (
          <Post post={post} key={post.id} />
        ))}
      </div>
    );
  }
}

export default Blog;
