const { changePassword } = require("./helper/auth");
const resetPassword = (req, res) => {};

const updateProfile = (req, res) => {};

const changePassword = (req, res) => {
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

const verifyAccount = (req, res) => {};
