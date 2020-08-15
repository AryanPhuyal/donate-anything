const Thread = require("../../model/Thread");

exports.showAllThread = (cb) => {
  Thread.find({ status: true })
    .populate("user")
    .then((threads) => cb(null, threads))
    .catch((err) => cb(err, null));
};

exports.showAllThreadCategory = (category, cb) => {
  Thread.find({ status: true, category: category })
    .populate("user")
    .then((threads) => cb(null, threads))
    .catch((err) => cb(err, null));
};

exports.showAllThreadUser = (user, cb) => {
  Thread.find({ status: true, user: user })
    .populate("user")
    .then((threads) => cb(null, threads))
    .catch((err) => cb(err, null));
};

exports.showAThread = (userId, threadId, cb) => {
  Thread.findById(threadId)
    .populate({
      path: "user",
      select:
        "firstName lastName email role gender BusinessName followers dateBrought",
    })
    .then((thread) => {
      cb(null, thread);
    })
    .catch((err) => {
      cb(thread, null);
    });
};

checkUserFollowThread = (userId, threadOwnerId, cb) => {
  User.findById(threadOwnerId);
};

exports.createThread = (
  {
    name,
    imageUrl,
    faultDescription,
    description,
    dateBrought,
    category,
    user,
  },
  cb
) => {
  const thread = new Thread({
    name,
    dateBrought,
    faultDescription,
    description,
    createdDate: Date.now(),
    category,
    image: imageUrl,
    user,
  });
  thread
    .save()
    .then(async (thread) => {
      cb(null, thread);
    })
    .catch((err) => {
      cb(err, null);
    });
};

exports.updateThread = (
  {
    admin,
    threadId,
    name,
    imageUrl,
    faultDescription,
    description,
    dateBrought,
    userId,
  },
  cb
) => {
  Thread.findById(threadId).then(async (thread) => {
    if (thread) {
      if (admin || thread.user == userId) {
        thread.name = name;
        thread.imageUrl = imageUrl;
        thread.faultDescription = faultDescription;
        thread.description = description;
        thread.dateBrought = dateBrought;
        await thread.save();
        cb(null, thread);
        return;
      }
      cb("UnAuthorize");
      return;
    }
    cb("notFound");
  });
};

exports.deleteThread = (threadId, role, userId, cb) => {
  Thread.findById(threadId)
    .then(async (thread) => {
      {
        if (thread.user == userId || role.toLowerCase() == "admin") {
          thread.status = false;
          await thread.save();
          cb(null, "success");
        } else {
          // status 403
          cb("noPermission", null);
        }
      }
    })
    .catch((err) => cb(err, null));
};

exports.deleteAllUserThread = (user, cb) => {
  Thread.updateMany({ user: user }, { status: false })
    .then((thread) => cb(null))
    .catch((err) => cb(err));
};
