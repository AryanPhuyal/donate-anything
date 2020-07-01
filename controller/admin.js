// admin controller
// only admin can acess this controller

const { deleteUser, resetPassword } = require("./helper/admin");
const _deleteUser = (req, res) => deleteUser(req.params.userId);
const _resetPassword = (req, res) => resetPassword(req.params.userId);

export { _deleteUser as deleteUser };
export { _resetPassword as resetPassword };
