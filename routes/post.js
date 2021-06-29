const express = require("express");
const { isSignedIn, isAuthenticated } = require("../controllers/auth");
const {
  getPostById,
  createPost,
  getPost,
  updatePost,
  deletePost,
  getAllPosts,
  getAllUserPosts
} = require("../controllers/post");
const { getUserById } = require("../controllers/user");
const router = express.Router();

router.param("userId", getUserById);
router.param("postId", getPostById);

// CREATE
router.post("/post/:userId", isSignedIn, isAuthenticated, createPost);

// READ
router.get("/post/:postId", getPost);
router.get("/posts/:userId", getAllUserPosts);

// UPDATE
router.put("/post/:postId/:userId", isSignedIn, isAuthenticated, updatePost);

// DELETE
router.delete("/post/:postId/:userId", isSignedIn, isAuthenticated, deletePost);

// LISTING
router.get("/posts", getAllPosts);

module.exports = router;
