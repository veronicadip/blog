import { Component } from "react";

class Comment extends Component {
  renderCommentDate = () => {
    const commentDate = new Date(this.props.comment.published);
    return commentDate.toLocaleString();
  };
  render() {
    return (
      <div>
        <img
          src={this.props.comment.author.image.url}
          alt="profile picture of the author of this comment"
        />
        <span>
          <b>{this.props.comment.author.displayName}</b>
        </span>
        <span>{this.renderCommentDate()}</span>
        <p>{this.props.comment.content}</p>
      </div>
    );
  }
}

export default Comment;
