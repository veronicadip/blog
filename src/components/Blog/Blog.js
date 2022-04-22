import { Component } from "react";

class Blog extends Component {
    render() {
        if (this.props.isLoading) {
            return (
                <div>
                    <span>Loading...</span>
                </div>
            );
        }
        return (
            <div>
                <h2>{this.props.title}</h2>
            </div>
        );
    }
}

export default Blog;