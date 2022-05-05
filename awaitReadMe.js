await window.gapi.client.init({
  apiKey: "AIzaSyDYXml006Hj3GNvIkiSlOk6FklzKtk054M",
  discoveryDocs: [
    "https://blogger.googleapis.com/$discovery/rest?version=v3",
  ],
  clientId:
    "524350509394-02lt9mikkjuiea852kj4da9aj3ctibeq.apps.googleusercontent.com",
  scope: "https://www.googleapis.com/auth/blogger",
})



window.gapi.auth2.getAuthInstance().isSignedIn.listen(this.updateSigninStatus);

this.updateSigninStatus(
    window.gapi.auth2.getAuthInstance().isSignedIn.get()
);

try {
    throw new Error()
} catch (error) {
    console.log('error')
}


try {
    const blogData = await window.gapi.client.blogger.blogs.listByUser({ userId: "self" })
    this.setState({
        blogs: blogData.result.items,
        isLoadingBlogs: false,
    });
} catch (error) {
    this.setState({ blogsError: true, isLoadingBlogs: false });
}