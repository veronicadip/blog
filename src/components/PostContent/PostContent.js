import { Component } from "react";

class PostContent extends Component {
    render() {
      if (this.props.isLoading) {
        return (
          <div>
            <span>Loading...</span>
          </div>
        );
      }
      return (
        <div dangerouslySetInnerHTML={{ __html: this.props.content }} />
      );
    }
  }

export default PostContent;