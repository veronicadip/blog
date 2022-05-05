import { Component } from "react";
import Post from "../Post/Post";
import { Link } from "react-router-dom";

class Blog extends Component {
  state = {
    posts: [],
    isLoadingPosts: true,
    postsError: false,
  };

  async componentDidMount() {
    try {
      const postData = await this.props.gapi.getBlogPosts(this.props.blog.id);
      this.setState({
        posts: postData.result.items,
        isLoadingPosts: false,
      });
    } catch (error) {
      this.setState({ postsError: true, isLoadingPosts: false });
    }
  }

  render() {
    if (this.state.isLoadingPosts) {
      return (
        <div>
          <span>Loading...</span>
        </div>
      );
    }
    if (this.props.postsError) {
      return (
        <div>
          <span>There was an error loading these posts, please try again.</span>
        </div>
      );
    }
    return (
      <div>
        <h2>{this.props.blog.name}</h2>
        {this.state.posts.map((post) => (
          <Post post={post} key={post.id} blogId={this.props.blog.id} />
        ))}
        <Link to={`/blog/${this.props.blog.id}/post/new`}>Add a new post</Link>
      </div>
    );
  }
}

export default Blog;
