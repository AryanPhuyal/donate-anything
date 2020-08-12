const { comparePassword, createUser } = require("../utility/authencation");
const jwt = require("jsonwebtoken");
const { validationResult } = require("express-validator");
const keys = require("../config/keys");
const { deleteUser, listUser } = require("./helper/auth");

exports.login = (req, res) => {
  const errors = validationResult(req);
  console.log(errors);

  if (errors.isEmpty()) {
    const email = req.body.email;
    const password = req.body.password;
    comparePassword(email, password, (err, user) => {
      if (err) {
        if (err === "notExists") {
          res.json({
            err: "User with this email dosen't exists",
          });
        } else {
          console.log(err);
          res.status(500).json({ err: "Server Error" });
        }
      } else {
        if (user) {
          console.log(user.verified);
          if (user.verified === false) {
            res.status(400).json({ err: "Your account is not verified" });
          } else
            jwt.sign(
              {
                _id: user._id,
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email,
                phoneNumber: user.phoneNumber,
                gender: user.gender,
                role: user.role,
                photo: user.photo,
                role: user.role,
              },
              keys.JWT,
              (err, token) => {
                if (!err) {
                  return res.json({
                    _id: user._id,
                    firstName: user.firstName,
                    lastName: user.lastName,
                    email: user.email,
                    phoneNumber: user.phoneNumber,
                    gender: user.gender,
                    photo: user.photo,
                    role: user.role,
                    token: token,
                  });
                }
                return res.status(500).json({ err: "Something went wrong" });
              }
            );
        } else {
          res.json({ err: "Email or password is not correct" });
        }
      }
    });
  } else {
    res.status(300).json({ err: errors.array() });
  }
};

exports.signup = (req, res) => {
  const errors = validationResult(req);
  console.log(errors);

  if (errors.isEmpty()) {
    const userDetails = {
      email: req.body.email,
      password: req.body.password,
      role: req.body.role,
      dateOfBirth: req.body.dateOfBirth,
      phoneNo: req.body.phoneNo,
      country: req.body.country,
      city: req.body.city,
      photo: req.body.photo,
    };
    if (req.body.role == "business") {
      userDetails.name = req.body.name;
    } else {
      userDetails.gender = req.body.gender;
      userDetails.lastName = req.body.lastName;
      userDetails.firstName = req.body.firstName;
    }
    createUser(userDetails, (err, user) => {
      if (user) {
        res.json({ success: "Successfully created user" });
      } else if (err === "exists") {
        res.status(300).json({
          err: [
            {
              msg: "Email already exists",
              param: "email",
            },
          ],
        });
      } else {
        res.status(500).json({ err: "Internal Server error" });
      }
    });
  } else {
    res.status(300).json({ err: errors.array() });
  }
};

exports.deleteUser = (req, res) => {
  const requestedUser = req.user;
  const userId = req.params.userId;
  if (
    requestedUser.role.toLowerCase() == "admin" ||
    requestedUser._id == userId
  ) {
    deleteUser(userId, (err, succ) => {
      if (err && err == "notExists") {
        res.status(400).json({ err: "User Not exists" });
      } else if (err) {
        res.status(500).json({ err: "Internal Server error" });
      } else {
        res.json({ success: "Success" });
      }
    });
  } else {
    res.status(403).json({ err: "unauthorize" });
  }
};

exports.getUser = (req, res) => {
  listUser((err, user) => {
    if (!err) res.json(user);
    else res.status(500).json({ err: "internal server error" });
  });
};
