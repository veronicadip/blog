import { Component } from "react";
import { excerptHtml } from 'better-excerpt-html'


class PostContent extends Component {
  state = {
    showMore: false,
  }
  showMoreOrLess = () => {
    if (this.state.showMore) {
      return "Show Less"
    }
    return "Show More"
  }
  setButton = () => {
    this.setState({ showMore: !this.state.showMore })
  }
  renderContent = () => {
    if (this.state.showMore) {
      return <div dangerouslySetInnerHTML={{ __html: this.props.post.content }} />
    }
    return <div dangerouslySetInnerHTML={{ __html: excerptHtml(this.props.post.content, 100, "...") }} />
  }
  render() {
    if (this.props.isLoading) {
      return (
        <div>
          <span>Loading...</span>
        </div>
      );
    }
    if (this.props.postError) {
      return (
        <div>
          <span>There was an error loading these posts, please try again.</span>
        </div>
      )
    }
    return (
      <div>
        <h3>{this.props.post.title}</h3>
        {this.renderContent()}
        <button onClick={this.setButton}>{this.showMoreOrLess()}</button>
      </div>
    );
  }
}

export default PostContent;