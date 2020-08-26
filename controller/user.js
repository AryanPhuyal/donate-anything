const { changePassword } = require("./helper/auth");
const {
  userDetails,
  followUser,
  uploadProfilePicture,
} = require("./helper/user");

const { sendMail } = require("../utility/sendMail");

const User = require("../model/User");
console.log("yes");

exports.updateProfile = async (req, res) => {
  userId = req.body.userId;

  if (userId == req.user._id || req.user.role.toLowerCase() == "admin") {
    try {
      const userId = req.user._id;
      let user = await User.findById(userId);
      if (user.role.toLowerCase() == "business") {
        user.name = req.body.name;
      } else {
        user.firstName = req.body.firstName;
        user.lastName = req.body.lastName;
        user.aboutMe = req.body.aboutMe;
        user.gender = req.body.gender;
        user.workAt = req.body.workAt;
      }
      user.phoneNo = req.body.phoneNo;
      user.country = req.body.country;
      user.city = req.body.city;
      await user.save();

      res.redirect("/api/auth/me");
    } catch (err) {
      console.log(err);
      res.status(500).json({ err: "Internal server error" });
    }
  } else {
    res.status(400).json({ err: "Unauthorize" });
  }
};

exports.changePassword = (req, res) => {
  const oldPassword = req.body.oldPassword;
  const newPassword = req.body.newPassword;
  const email = req.body.email;
  if (email === req.user.email)
    changePassword(email, oldPassword, newPassword, (err, user) => {
      if (!err) {
        res.json({ success: "success" });
      } else if (err === "PasswordNotMatch") {
        res.status(400).json({ err: "Password Not Match" });
      } else if (err == "notExists")
        res.status(400).json({ err: "Email not exists" });
      else res.status(500).json({ err: "Server Error" });
    });
  else res.status(400).json({ err: "Email address is not valid" });
};

exports.me = (req, res) => {
  const userId = req.user._id;
  userDetails(userId, (err, user) => {
    if (!err) res.json(user);
    else res.status(500).json({ err: "Internal server Error" });
  });
};

exports.followUserAccount = (req, res) => {
  targetUser = req.params.userId;
  userId = req.user._id;
  const follow = req.query.follow ? req.query.params : true;
  followUser(targetUser, userId, follow, (err, succ) => {
    if (err && err == "AlreadyFollowed") {
      res.json({ err: "Already Followed" });
    } else if (err && err == "notFollowing") {
      res.json({ err: "Not following" });
    } else if (err) {
      res.status(500).json({ err: "Server Error" });
    } else {
      res.json({ success: "Successfully Followed" });
    }
  });
};

exports.profilePic = (req, res) => {
  const userId = req.body.userId;
  const pic = req.body.profile;
  uploadProfilePicture(userId, pic, (err, success) => {
    if (err && err == "notExists") {
      res.json({ err: "User not Exists" });
    } else if (err) {
      res.status(500).json({ err: "Internal Server Error" });
    } else {
      res.json({ success: "Success" });
    }
  });
};

exports.sendMail = async (req, res) => {
  const { body, subject, to } = req.body;
  try {
    await sendMail(to, subject, body);
    res.json({ success: "successfully sent mail" });
  } catch {
    res.json({ err: "Unable to send mail" });
  }
};
