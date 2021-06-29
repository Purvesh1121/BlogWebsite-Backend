const User = require("../models/user");
const bcrypt = require("bcrypt");
var jwt = require("jsonwebtoken");
var expressJwt = require("express-jwt");

// TODO: To remove case sensitivity of email.

exports.signup = (req, res) => {
  bcrypt.hash(req.body.password, 10, (err, hash) => {
    if (err) {
      console.log(err);
    } else {
      req.body.password = hash;
      req.body.email.toLowerCase();

      const newUser = new User(req.body);
      newUser.save((err, savedUser) => {
        if (err) {
          return res.status(400).json({
            error: "Error saving user in DB or use already registered.",
          });
        }
        return res.json(savedUser);
      });
    }
  });
};

exports.signin = (req, res) => {
  User.findOne({ email: req.body.email.toLowerCase() }, (err, foundUser) => {
    if (err || !foundUser) {
      return res.status(400).json({
        error: "User Not found",
      });
    }

    bcrypt.compare(req.body.password, foundUser.password, (err, result) => {
      if (result) {
        // create token
        const token = jwt.sign({ _id: foundUser._id }, process.env.SECRET);

        // put token in cookir
        res.cookie("token", token, { expire: new Date() + 9999 });

        // send response to frontend
        const { _id, name, email, lastname } = foundUser;
        res.json({ token, user: { _id, name, lastname, email } });
      } else {
        return res.status(400).json({
          error: "email and password do not match",
        });
      }
    });
  });
};

exports.signout = (req, res) => {
  res.clearCookie("token");
  res.json({
    message: "User signout successfully",
  });
};

//protected routes
exports.isSignedIn = expressJwt({
  secret: process.env.SECRET,
  algorithms: ["HS256"],
  requestProperty: "auth",
});

//custom middlewares
exports.isAuthenticated = (req, res, next) => {
  let checker = req.profile && req.auth && req.profile._id == req.auth._id;
  if (!checker) {
    return res.status(403).json({
      error: "ACCESS DENIED",
    });
  }
  next();
  // console.log("req.profile", req.profile);
  // console.log("Checker",checker);
};
