const Post = require("../models/post");

exports.getPostById = (req, res, next, id) => {
  console.log("PostID", id);
  Post.findById(id)
    .populate("author", "name")
    .exec((err, post) => {
      if (err) {
        return res.status(400).json({
          error: "No such post in DB",
        });
      }
      req.post = post;
      console.log("Post", req.post);
      next();
    });
};

exports.createPost = (req, res) => {
  req.body.author = req.profile._id;
  const newPost = new Post(req.body);
  newPost.save((err, post) => {
    if (err) {
      return res.status(400).json({
        error: "Error creating post",
      });
    }
    return res.json(post);
  });
};

exports.getPost = (req, res) => {
  return res.json(req.post);
};

exports.updatePost = (req, res) => {
  Post.findByIdAndUpdate(
    { _id: req.post._id },
    { $set: req.body },
    { new: true, useFindAndModify: false },
    (err, post) => {
      if (err) {
        return res.status(400).json({
          error: "You cannot update post",
        });
      }
      res.json(post);
    }
  );
};

exports.deletePost = (req, res) => {
  Post.findByIdAndDelete({ _id: req.post.id }, (err, post) => {
    if (err) {
      return res.status(400).json({
        error: "Unable to delete post",
      });
    }
    res.json(post);
  });
};

exports.getAllPosts = (req, res) => {
  Post.find({})
    .populate("author", "name")
    .exec((err, posts) => {
      if (err) {
        return res.status(400).json({
          error: "Error occured while fetching all the posts from DB",
        });
      }
      res.json(posts);
    });
};

exports.getAllUserPosts = (req, res) => {
  Post.find({author: req.profile._id}).exec((err, posts) => {
    if(err){
      return res.status(400).jsom({
        error: "No posts created by user"
      })
    }
    return res.json(posts);
  })
}