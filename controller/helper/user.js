// import { where } from "../../model/User";

const User = require("../../model/User");
const updateProfile = () => {};

const uploadProfilePicture = () => {};

const followUser = () => {};

const showFollowedUser = () => {};

const showFollowingUser = () => {};

const showCatagories = () => {};
const resetPassword = () => {};

exports.listUsers = (cb) => {
  User.find()
    //  .where({ deleted: false })
    .select(
      "firstName lastName email dateOfBirth gender role photo createdAt BusinessName"
    )
    .then((users) => cb(null, users))
    .catch((err) => cb(err));
};

exports.userDetails = (userId, cb) => {
  User.findById(userId)
    .where({ deleted: false })
    .select(
      "firstName lastName email dateOfBirth gender role photo createdAt BusinessName"
    )
    .then((users) => cb(null, users))
    .catch((err) => cb(err));
};
