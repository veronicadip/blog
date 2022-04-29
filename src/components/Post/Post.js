import { Component } from "react";
import { excerptHtml } from "better-excerpt-html";
import { Link } from "react-router-dom";



class Post extends Component {
  state = {
    showMore: false,
  };
  showMoreOrLess = () => {
    if (this.state.showMore) {
      return "Show Less";
    }
    return "Show More";
  };
  setButton = () => {
    this.setState({ showMore: !this.state.showMore });
  };
  renderContent = () => {
    if (this.state.showMore) {
      return (
        <div dangerouslySetInnerHTML={{ __html: this.props.post.content }} />
      );
    }
    return (
      <div
        dangerouslySetInnerHTML={{
          __html: excerptHtml(this.props.post.content, 100, "..."),
        }}
      />
    );
  };
  render() {
    return (
      <div>
        <Link
          to={`/blog/${this.props.blogId}/post/${this.props.post.id}`}
          key={this.props.post.id}
        >
          <h3>{this.props.post.title}</h3>
        </Link>
        {this.renderContent()}
        <button onClick={this.setButton}>{this.showMoreOrLess()}</button>
      </div>
    );
  }
}

export default Post;
