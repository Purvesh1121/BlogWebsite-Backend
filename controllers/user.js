const User = require("../models/user");

exports.getUserById = (req, res, next, id) => {
  console.log(id);
  User.findById(id).exec((err, user) => {
    if (err || !user) {
      return res.status(400).json({
        error: "No user was found in DB",
      });
    }
    req.profile = user;
    console.log("req.profile", req.profile);
    next();
  });
};

exports.getUser = (req, res) => {
  req.profile.password = undefined;
  return res.json(req.profile);
};

exports.updateUser = (req, res) => {
  User.findByIdAndUpdate(
    { _id: req.profile._id },
    { $set: req.body },
    { new: true, useFindAndModify: false },
    (err, user) => {
      if (err) {
        return res.status(400).json({
          error: "You are not authorized to update this user",
        });
      }
      user.password = undefined;
      res.json(user);
    }
  );
};

exports.deleteUser = (req, res) => {
  User.findByIdAndDelete({ _id: req.profile.id }, (err, user) => {
    if (err || !user) {
      return res.status(400).json({
        error: "No such user found in DB",
      });
    }
    user.password = undefined;
    res.json(user);
  });
};

