import { Component } from "react";
import PostContent from "../PostContent/PostContent"

class Blog extends Component {
    render() {
        if (this.props.isLoadingBlog && this.props.isLoadingPost) {
            return (
                <div>
                    <span>Loading...</span>
                </div>
            );
        }
        return (
            <div>
                <h2>{this.props.blog.name}</h2>
                {this.props.postContent.map((post) => (<PostContent post={post} key={post.id}/>))}
            </div>
        );
    }
}

export default Blog;