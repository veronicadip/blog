import { Component } from "react";

class PostTitle extends Component {
    render() {
      if (this.props.isLoading) {
        return (
          <div>
            <span>Loading...</span>
          </div>
        )
      }
      return (
        <div>
          <h3>{this.props.title}</h3>
        </div>
      )
    }
  }

  export default PostTitle;