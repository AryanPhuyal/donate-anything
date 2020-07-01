const User = require("../model/User");
const bcript = require("bcryptjs");

exports.checkUserExists = (email, cb) => {
  User.find({ email: email })
    .then((data) => {
      if (data.length == 0) {
        cb(null, "success");
      } else cb("exists", null);
    })
    .catch((err) => cb(err, null));
};

exports.findUser = (email, cb) => {
  User.findOne({ email: email })
    .then((data) => {
      if (data) {
        cb(null, data);
      } else cb("Not exists", null);
    })
    .catch((err) => cb(err, null));
};

exports.createUser = (
  {
    lastName,
    firstName,
    email,
    password,
    role,
    dateOfBirth,
    phoneNo,
    gender,
    country,
    city,
    photo,
  },
  cb
) => {
  this.checkUserExists(email, async (err, data) => {
    if (data) {
      bcript.hash(password, 12, async (err, hashedPassword) => {
        if (!err) {
          let user = User({
            firstName,
            lastName,
            email,
            password: hashedPassword,
            role,
            dateOfBirth,
            phoneNo,
            gender,
            country,
            city,
            photo,
            createdAt: Date.now(),
          });
          await user.save();
          cb(null, "success");
        } else {
          cb(err, null);
        }
      });
    } else {
      cb(err, null);
    }
  });
};

exports.changePassword = ({ email, password, newPassword }, cb) => {
  findUser(email, (err, user) => {
    if (user) {
      console.log(user);
      bcript.compare(password, user.password, (err, result) => {
        if (result) {
          bcript.hash(password, 12, async (err, hashedPassword) => {
            if (hashedPassword) {
              user.password = hashedPassword;
              await user.save();
              cb(null, "success");
            } else {
              cb(err, null);
            }
          });
        } else {
          cb(err, result);
        }
      });
      cb(err, null);
    }
  });
};

exports.comparePassword = (email, password, cb) => {
  this.findUser(email, (err, user) => {
    if (err) {
      return cb(err, null);
    }
    if (user) {
      bcript.compare(password, user.password, (err, match) => {
        if (!err) {
          if (match) {
            cb(null, user);
          } else {
            cb(null, null);
          }
        } else cb(err, null);
      });
    } else cb("notExists", null);
  });
};
