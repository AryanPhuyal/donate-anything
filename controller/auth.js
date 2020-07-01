const { comparePassword, createUser } = require("../utility/authencation");
const jwt = require("jsonwebtoken");
const { validationResult } = require("express-validator");
const keys = require("../config/keys");
exports.login = (req, res) => {
  const errors = validationResult(req);

  if (errors.isEmpty()) {
    const email = req.body.email;
    const password = req.body.password;
    comparePassword(email, password, (err, user) => {
      if (err) {
        console.log(err);
        if (err === "notExists") {
          res.json({
            err: "User with this email dosen't exists",
          });
        } else {
          res.status(500).json({ err: "Server Error" });
        }
      } else {
        if (user) {
          jwt.sign(
            {
              _id: user._id,
              firstName: user.firstName,
              lastName: user.lastName,
              email: user.email,
              phoneNumber: user.phoneNumber,
              gender: user.gender,
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

  if (errors.isEmpty()) {
    const userDetails = {
      lastName: req.body.lastName,
      firstName: req.body.firstName,
      email: req.body.email,
      password: req.body.password,
      role: req.body.role,
      dateOfBirth: req.body.dateOfBirth,
      phoneNo: req.body.phoneNo,
      gender: req.body.gender,
      country: req.body.country,
      city: req.body.city,
      photo: req.body.photo,
    };
    createUser(userDetails, (err, user) => {
      if (user) {
        res.json({ success: "Successfully created user" });
      } else if (err === "exists") {
        res.status(300).json({
          err: [
            {
              msg: "Email alrady exists",
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
