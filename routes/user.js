const router = require("express").Router();
const { isSignedIn, isAuthenticated } = require("../controllers/auth");
const {
  getUserById,
  getUser,
  updateUser,
  deleteUser,
} = require("../controllers/user");

router.param("userId", getUserById);

// read
router.get("/user/:userId", isSignedIn, isAuthenticated, getUser);

// UPDATE
// TODO: to change the request to patch
router.put("/user/:userId", isSignedIn, isAuthenticated, updateUser);

// delete
router.delete("/user/:userId", isSignedIn, isAuthenticated, deleteUser);


module.exports = router;
