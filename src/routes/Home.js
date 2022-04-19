import { Component } from "react";
import { Link } from "react-router-dom";

class Home extends Component {
    state = {
        isLoggedIn: false
    }
  componentDidMount() {
    window.gapi.load("client:auth2", () => {
      window.gapi.client
        .init({
          apiKey: "AIzaSyDYXml006Hj3GNvIkiSlOk6FklzKtk054M",
          discoveryDocs: [
            "https://www.googleapis.com/discovery/v1/apis/translate/v2/rest",
          ],
          clientId: "my-blog-project-1650306479512",
          scope: ["https://www.googleapis.com/auth/blogger"],
        })
        .then(() => {
          window.gapi.auth2.getAuthInstance().isSignedIn.listen(this.updateSigninStatus);
          this.updateSigninStatus(window.gapi.auth2.getAuthInstance().isSignedIn.get());

        });
    });
  }

  updateSigninStatus = (isLoggedIn) => {
      this.setState({
          isLoggedIn: isLoggedIn
      })
  }

  render() {
    return (
      <div className="home">
        <Link to="/">All posts</Link> |{" "}
        <Link to="/post/new">Add a new post</Link>
        user is logged in: {this.state.isLoggedIn}
      </div>
    );
  }
}

// blogger API key: AIzaSyDYXml006Hj3GNvIkiSlOk6FklzKtk054M
// client ID: my-blog-project-1650306479512

export default Home;
