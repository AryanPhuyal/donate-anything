// import { where } from "../../model/User";

const User = require("../../model/User");
exports.getProfile = async (userId, cb) => {
  try {
    let user = User.findById(userId).select(
      "firstName lastName email dateOfBirth gender role accountStatus photo createdAt modifiedDate BusinessName "
    );
    cb(null, user);
  } catch (err) {
    cb(err);
  }
};
const updateProfile = () => {};

const uploadProfilePicture = () => {};

const followUser = (userId, me) => {
  User.findById(userId).then(async (user) => {});
};

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
  console.log(userId);
  User.findById(userId)
    //  .where({ deleted: false })
    .select(
      "firstName lastName email dateOfBirth gender role photo createdAt BusinessName workAt aboutMe phoneNo"
    )
    .then((users) => cb(null, users))
    .catch((err) => cb(err));
};
