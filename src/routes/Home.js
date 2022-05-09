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
  async componentDidMount() {
    const { gapi } = this.props;

    gapi.onSigninChange(this.updateSigninStatus);
    this.updateSigninStatus(gapi.isSignedIn());

    try {
      const blogData = await gapi.getUserBlogs("self");
      this.setState({
        blogs: blogData.result.items,
        isLoadingBlogs: false,
      });
    } catch (error) {
      this.setState({ blogsError: true, isLoadingBlogs: false });
    }
  }

  updateSigninStatus = (isLoggedIn) => {
    this.setState({
      isLoggedIn: isLoggedIn,
    });
  };

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
    if (this.state.blogs.length === 0) {
      return (
        <div>
          <span>There aren't any blogs yet.</span>
        </div>
      );
    }
    return this.state.blogs.map((blog) => (
      <Blog blog={blog} key={blog.id} gapi={this.props.gapi} />
    ));
  }

  render() {
    if (this.state.isLoggedIn === false) {
      return (
        <div>
          <span>To visit this page you need to be logged.</span>
          <Link to="/logIn">Log In</Link>
        </div>
      );
    }
    return (
      <div className="home">
        <Link to="/">All posts</Link> |{" "}
        {!this.state.isLoggedIn && (
          <button onClick={this.props.gapi.signIn}>Sign In</button>
        )}
        {this.state.isLoggedIn && (
          <button onClick={this.props.gapi.signOut}>Sign Out</button>
        )}
        {this.renderBlogs()}
      </div>
    );
  }
}

// blogger API key: AIzaSyDYXml006Hj3GNvIkiSlOk6FklzKtk054M
// project ID: my-blog-project-1650306479512

export default Home;