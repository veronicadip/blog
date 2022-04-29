import { Component } from "react";
import Comment from "../Comment/Comment";

class CommentsList extends Component {
  render() {
    if (this.props.isLoadingComments) {
      return (
        <div>
          <span>Loading...</span>
        </div>
      );
    }
    if (this.props.commentsError) {
      return (
        <div>
          <span>
            There was an error loading the comment section, please try again.
          </span>
        </div>
      );
    }
    if (this.props.postData.result.replies.totalItems === "0") {
      return <p>There aren't any comments yet.</p>;
    }
    return (
      <div>
        <p>{this.props.postData.result.replies.totalItems} comments</p>
        {this.props.postComments.result.items.map((comment) => (
          <Comment comment={comment} key={comment.id} />
        ))}
      </div>
    );
  }
}

export default CommentsList;
