import { Component } from "react";
import { Link } from "react-router-dom";

class Home extends Component {
  state = {
    isLoggedIn: false,
  };
  componentDidMount() {
    window.gapi.load("client:auth2", () => {
      window.gapi.client
        .init({
          apiKey: "AIzaSyDYXml006Hj3GNvIkiSlOk6FklzKtk054M",
          discoveryDocs: [
            "https://blogger.googleapis.com/$discovery/rest?version=v2",
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
      </div>
    );
  }
}

// blogger API key: AIzaSyDYXml006Hj3GNvIkiSlOk6FklzKtk054M
// project ID: my-blog-project-1650306479512

export default Home;
