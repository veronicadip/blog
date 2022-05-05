import { Component } from "react";
import Post from "../Post/Post";
import { Link } from "react-router-dom";

class Blog extends Component {
  state = {
    posts: [],
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
              });
            })
            .catch(() => {
              this.setState({ postsError: true });
            });
        });
    });
  }

  render() {
    if (this.props.postsError) {
      return (
        <div>
          <span>There was an error loading these posts, please try again.</span>
        </div>
      );
    }
    return (
      <div className="blog">
        <h2 className="blogTitle">{this.props.blog.name}</h2>
        {this.state.posts.map((post) => (
          <Post post={post} key={post.id} blogId={this.props.blog.id} />
        ))}
        <div className="addPost">
          <Link to={`/blog/${this.props.blog.id}/post/new`}>
            Add a new post
          </Link>
        </div>
      </div>
    );
  }
}

export default Blog;
