import { Component } from "react";
import { Link } from "react-router-dom";
import Blog from "../components/Blog/Blog"
import PostTitle from "../components/PostTitle/PostTitle"
import PostContent from "../components/PostContent/PostContent"


class Home extends Component {
  state = {
    isLoggedIn: false,
    error: false,
    isLoadingBlog: true,
    blogName: "",
    isLoadingPost: true,
    postContent: "",
    
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
                blogName: blogData.result.items.at(0).name,
                isLoadingBlog: false,
              });
            })
            .catch(() => {
              this.setState({ error: true, isLoadingBlog: false });
            });

          window.gapi.client.blogger.posts
            .list({ blogId: "8309785320197399506" })
            .then((postData) => {
              this.setState({
                postContent: postData.result.items,
                isLoadingPost: false,
              });
            })
            .catch(() => {
              this.setState({ error: true, isLoadingPost: false, });
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
        <Blog
          blogTitle={this.state.blogName}
          postContent={this.state.postContent}
          isLoadingPost={this.state.isLoadingPost}
          isLoadingBlog={this.state.isLoadingBlog}
        />
        
      </div>
    );
  }
}

// blogger API key: AIzaSyDYXml006Hj3GNvIkiSlOk6FklzKtk054M
// project ID: my-blog-project-1650306479512
// window.gapi.client.blogger.posts.list({blogId: "8309785320197399506"}).then((xx) => console.log(xx))

export default Home;
