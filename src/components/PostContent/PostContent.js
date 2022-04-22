import { Component } from "react";
import { excerptHtml } from 'better-excerpt-html'


class PostContent extends Component {
  renderContent = () => {
    if (this.props.showMore) {
      return <div dangerouslySetInnerHTML={{ __html: this.props.content }} />
    }
    return <div dangerouslySetInnerHTML={{ __html: excerptHtml(this.props.content, 100, "...") }} />
  }
  render() {
    if (this.props.isLoading) {
      return (
        <div>
          <span>Loading...</span>
        </div>
      );
    }
    return (
      this.renderContent()
    );
  }
}

export default PostContent;