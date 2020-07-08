// admin controller
// only admin can acess this controller

const { deleteUser, resetPassword } = require("./helper/admin");
exports.deleteUser = (req, res) => deleteUser(req.params.userId);
exports.resetPassword = (req, res) => resetPassword(req.params.userId);
