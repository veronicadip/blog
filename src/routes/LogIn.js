import { Component } from "react";
import { Navigate } from "react-router-dom";


class LogIn extends Component {
  state = {
    isLoggedIn: false,
  };
  async componentDidMount() {
    const { gapi } = this.props;

    gapi.onSigninChange(this.updateSigninStatus);
    this.updateSigninStatus(await gapi.isSignedIn());

  }

  updateSigninStatus = (isLoggedIn) => {
    this.setState({
      isLoggedIn: isLoggedIn,
    });
  };

  signIn = () => {
    this.props.gapi.signIn()
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