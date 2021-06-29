const router = require("express").Router();
const User = require("../models/user");
const bcrypt = require("bcrypt");
var jwt = require("jsonwebtoken");
var expressJwt = require("express-jwt");
const { signup, signin, signout } = require("../controllers/auth");

// signup
router.post("/signup", signup);

// signin
router.post("/signin", signin);

// signout
router.get("/signout", signout);

module.exports = router;
