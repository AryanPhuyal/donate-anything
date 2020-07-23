const User = require("../../model/User");
const { comparePassword } = require("../../utility/authencation");
const bcript = require("bcryptjs");

exports.changePassword = (email, currentPassword, newPassword, cb) => {
  comparePassword(email, currentPassword, (err, user) => {
    if (!err && !user) {
      cb("PasswordNotMatch");
    } else if (err) {
      cb(err);
    } else {
      bcript.hash(newPassword, 12, async (err, hashedPassword) => {
        if (!err) {
          user.password = hashedPassword;
          await user.save();
          cb(null, user);
        } else {
          cb(err);
        }
      });
    }
  });
};

exports.deleteUser = (userId, cb) => {
  User.findById(userId)
    .then(async (user) => {
      if (user) {
        user.deleted = true;
        await user.save();
        cb(null, "success");
      } else {
        cb("notExists");
      }
    })
    .catch((err) => cb(err));
};

exports.listUser = (cb) => {
  User.find({ deleted: false })
    .select("firstName lastName email photo BusinessName")
    .then((user) => cb(null, user))
    .catch((err) => cb(err));
};

exports.detailsOfUser = (cb, userId) => {
  User.findById({ deleted: false }).select(
    "firstName lastName email photo BusinessName dateOfBirth gender accountStatus role createdAt"
  );
};
