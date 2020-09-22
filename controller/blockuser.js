const User = require("../model/User");
exports.block = async (LogInUser, toBlock, cb) => {
  try {
    cb(null);
    let user = await User.findById(LogInUser);
    let toBlockUser = await User.findById(toBlock);
    if (!toBlock) {
      cb("blocked user not found");
    } else if (toBlockUser.role == "admin") {
      cb("Admin User");
    } else if (user) {
      let blocked = user.blocked;

      if (blocked.filter((x) => x == toBlock).length == 0) {
        blocked.push(toBlock);
        user.blocked = blocked;
        await user.save();
        cb(null, "success");
      } else {
        cb("already blocked");
      }
    } else {
      cb("User not found");
    }
  } catch (err) {
    console.log("------------------------------------");
    console.log(err);
    console.log("------------------------------------");

    cb(err);
  }
};
