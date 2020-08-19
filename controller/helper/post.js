const Thread = require("../../model/Thread");

exports.showThreads = (logInUser, cb) => {
  Thread.find({ status: true })
    .populate({ path: "user", where: { followers: logInUser } })
    .then((threads) => {
      // if (thread.user.followers.length != 0) thread.followed = true;
      cb(null, threads);
    })
    .catch((err) => cb(err, null));
};

exports.showThreadsCategory = (category, user, cb) => {
  Thread.find({ status: true, category: category })
    .populate({ path: "user", where: { followers: user } })
    .then((threads) => {
      if (thread.user.followers.length != 0) thread.followed = true;

      cb(null, threads);
    })
    .catch((err) => cb(err, null));
};

exports.showThreadsUser = (logInUser, user, cb) => {
  Thread.find({ status: true, user: user })
    .populate({ path: "user", where: { followers: logInUser } })
    .then((threads) => cb(null, threads))
    .catch((err) => cb(err, null));
};

exports.showThread = (userId, threadId, cb) => {
  Thread.findById(threadId)
    .populate({
      path: "user",
      select:
        "firstName lastName email role gender BusinessName followers dateBrought",
      where: { followers: logInUser },
    })
    .then((thread) => {
      if (thread.user.followers.length != 0) thread.followed = true;
      cb(null, thread);
    })
    .catch((err) => {
      cb(thread, null);
    });
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
    image,
    faultDescription,
    description,
    dateBrought,
    userId,
    hide,
  },
  cb
) => {
  Thread.findById(threadId).then(async (thread) => {
    if (thread) {
      if (admin || thread.user == userId) {
        thread.name = name;
        thread.image = image;
        thread.faultDescription = faultDescription;
        thread.description = description;
        thread.dateBrought = dateBrought;
        thread.hide = hide;
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
