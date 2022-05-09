class Gapi {
  isLoaded = false;

  load() {
    if (this.isLoaded) {
      return Promise.resolve();
    }

    return new Promise((resolve, reject) => {
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
          .then(resolve)
          .catch(reject);
      });
    });
  }

  async onSigninChange(listener) {
    await this.load()
    window.gapi.auth2.getAuthInstance().isSignedIn.listen(listener);
  }

  async isSignedIn() {
    await this.load()
    return window.gapi.auth2.getAuthInstance().isSignedIn.get();
  }
  async signIn() {
    await this.load()
    window.gapi.auth2.getAuthInstance().signIn();
  }

  async signOut() {
    await this.load()
    window.gapi.auth2.getAuthInstance().signOut();
  }

  async getUserBlogs(userId) {
    await this.load();
    return window.gapi.client.blogger.blogs.listByUser({ userId });
  }

  async getBlogData(blogId) {
    await this.load();
    return window.gapi.client.blogger.blogs.get({
      blogId,
    });
  }

  async getBlogPosts(blogId) {
    await this.load();
    return window.gapi.client.blogger.posts.list({ blogId });
  }

  async getPost(postId, blogId) {
    await this.load();
    return window.gapi.client.blogger.posts.get({ 
      postId,
      blogId,
     });
  }

  async deletePost(blogId, postId) {
    await this.load();
    return window.gapi.client.blogger.posts.delete({
      blogId,
      postId,
    });
  }

  async addPost(blogId, postTitle, postContent) {
    await this.load();
    return window.gapi.client.blogger.posts.insert({
      blogId,
      title: postTitle,
      content: postContent,
    });
  }

  async getPostComments(blogId, postId) {
    await this.load();
    return window.gapi.client.blogger.comments.list({
      blogId,
      postId,
    });
  }

}


// singleton pattern
const gapi = new Gapi();
export default gapi;
