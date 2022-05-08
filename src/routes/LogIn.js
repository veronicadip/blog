import { Component } from "react";
import { Navigate } from "react-router-dom";


class LogIn extends Component {
  state = {
    isLoggedIn: false,
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

  render() {
    if (this.state.isLoggedIn) {
      return <Navigate to="/" />
    }
    return (
      <div>
        <h1>Please sign up!</h1>
        <button onClick={this.signIn}>Sign Up</button>
      </div>
    );
  }
}

export default LogIn;