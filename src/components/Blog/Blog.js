import { Component } from "react";
import PostContent from "../PostContent/PostContent"

class Blog extends Component {
    state = {
        postContent: [],
        isLoadingPost: true,
        postError: false,
    }
    componentDidMount() {
        window.gapi.load("client:auth2", () => {
            window.gapi.client
                .init({
                    apiKey: "AIzaSyDYXml006Hj3GNvIkiSlOk6FklzKtk054M",
                    discoveryDocs: [
                        "https://blogger.googleapis.com/$discovery/rest?version=v3",
                    ],
                    clientId:
                        "524350509394-02lt9mikkjuiea852kj4da9aj3ctibeq.apps.googleusercontent.com",
                    scope: "https://www.googleapis.com/auth/blogger",
                })
                .then(() => {
                    window.gapi.client.blogger.posts
                        .list({ blogId: this.props.blog.id })
                        .then((postData) => {
                            this.setState({
                                postContent: postData.result.items,
                                isLoadingPost: false,
                            });
                        })
                        .catch(() => {
                            this.setState({ postError: true, isLoadingPost: false, });
                        });
                });
        });
    }
    render() {
        if (this.props.isLoadingBlog && this.state.isLoadingPost) {
            return (
                <div>
                    <span>Loading...</span>
                </div>
            );
        }
        if (this.props.blogError) {
            return (
                <div>
                    <span>There was an error loading this blog, please try again.</span>
                </div>
            )
        }
        return (
            <div>
                <h2>{this.props.blog.name}</h2>
                {this.state.postContent.map((post) => (<PostContent post={post} key={post.id} postError={this.state.postError} />))}
            </div>
        );
    }
}

export default Blog;