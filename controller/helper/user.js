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
// const updateProfile = () => {};

exports.uploadProfilePicture = (id, imageUrl, cb) => {
  User.findById(id)
    .then(async (user) => {
      if (user) {
        user.profile = imageUrl;
        await user.save();
        cb(null, "success");
      } else {
        cb("notExists");
      }
    })
    .catch((err) => cb(err));
};

// const followUser = (userId, me) => {
//   User.findById(userId).then(async (user) => {});
// };

exports.listUsers = (cb) => {
  User.find()
    .where({ deleted: false })
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
      "firstName lastName email dateOfBirth gender role photo createdAt name workAt aboutMe phoneNo city country followers"
    )
    .then((users) => cb(null, users))
    .catch((err) => cb(err));
};

exports.followUser = (targetUser, user, cb) => {
  User.findById(targetUser, { followers: user })
    .then(async (u) => {
      console.log(u);
      if (u.followers.length != 0) {
        cb("AlreadyFollowed");
      } else {
        u.followers.push(user);
        await u.save();
        cb(null, "success");
      }
    })
    .catch((err) => {
      console.log(err);
      cb(err);
    });
};
