import { Component } from "react";
import { Link } from "react-router-dom";
import Blog from "../components/Blog/Blog";

class Home extends Component {
  state = {
    isLoggedIn: false,
    blogsError: false,
    isLoadingBlogs: true,
    blogs: [],
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
          window.gapi.auth2
            .getAuthInstance()
            .isSignedIn.listen(this.updateSigninStatus);

          this.updateSigninStatus(
            window.gapi.auth2.getAuthInstance().isSignedIn.get()
          );
          window.gapi.client.blogger.blogs
            .listByUser({ userId: "self" })
            .then((blogData) => {
              this.setState({
                blogs: blogData.result.items,
                isLoadingBlogs: false,
              });
            })
            .catch(() => {
              this.setState({ blogsError: true, isLoadingBlogs: false });
            });
        });
    });
  }

  updateSigninStatus = (isLoggedIn) => {
    this.setState({
      isLoggedIn: isLoggedIn,
    });
  };

  signIn() {
    window.gapi.auth2.getAuthInstance().signIn();
  }

  signOut() {
    window.gapi.auth2.getAuthInstance().signOut();
  }

  renderBlogs() {
    if (this.state.isLoadingBlogs) {
      return (
        <div>
          <span>Loading...</span>
        </div>
      );
    }
    if (this.state.blogsError) {
      return (
        <div>
          <span>There was an error loading these blogs, please try again.</span>
        </div>
      );
    }
    return this.state.blogs.map((blog) => <Blog blog={blog} key={blog.id} />);
  }

  render() {
    return (
      <div className="home">
        <Link to="/">All posts</Link> |{" "}
        <Link to="/post/new">Add a new post</Link>
        {!this.state.isLoggedIn && (
          <button onClick={this.signIn}>Sign In</button>
        )}
        {this.state.isLoggedIn && (
          <button onClick={this.signOut}>Sign Out</button>
        )}
        {this.renderBlogs()}
      </div>
    );
  }
}

// blogger API key: AIzaSyDYXml006Hj3GNvIkiSlOk6FklzKtk054M
// project ID: my-blog-project-1650306479512

export default Home;
