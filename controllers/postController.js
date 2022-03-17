const Post = require("../models/postModel");
const PostUser = require("../models/postUserModel");

class PostController {
  async getAllPostsView(req, res) {
    const data = await Post.readAll();
    return res.render("posts", {
      posts: data,
      hasPosts: data.length > 0,
    });
  }

  async getPostsView(req, res) {
    //const data = await Post.readAll();
    const data = await PostUser.getPostWithUsername();
    return res.render("posts", {
      posts: data,
      hasPosts: data.length > 0,
    });
  }

  async getSearchPostsView(req, res) {
    //console.log(req.query.search)
    const data = await PostUser.getPostByUsername(req.query.search);
    // console.log(data);
    return res.render("posts", {
      posts: data,
      hasPosts: data.length > 0,
    });
  }

  async newPost(req, res) {
    const idUser = req.params.idUser
    console.log(idUser)
    const newPost = new Post(req.body, idUser);
    const data = await newPost.addPost();
    return res.redirect("/principal")
  }
}

module.exports = PostController;