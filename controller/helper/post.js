const Thread = require("../../model/Thread");

exports.showThreads = (user, parameter, cb) => {
  Thread.find({ ...parameter, status: true })
    .populate({ path: "user" })
    .then((threads) => {
      threads = threads.map((thread) => {
        const followers = thread.user.followers;
        let newThread = {
          _id: thread._id,
          name: thread.name,
          faultDescription: thread.faultDescription,
          description: thread.description,
          createdDate: thread.createdDate,
          category: thread.category,

          user: {
            followed: false,
            image: thread.image,
            _id: thread.user._id,
            email: thread.user.email,
            phoneNo: thread.user.phoneNo,
            city: thread.user.city,
            country: thread.user.country,
            role: thread.user.role,
            aboutMe: thread.user.aboutMe,
            workAt: thread.user.workAt,
            name: thread.user.name,
          },
          hide: thread.hide,
        };
        if (thread.user.role == "business") {
          // newThread.user["user"] = thread.user.name;
        } else {
          newThread.user.firstName = thread.user.firstName;
          newThread.user.lastName = thread.user.lastName;
          newThread.user.gender = thread.user.gender;
        }
        for (i in followers) {
          if (followers[i] == user) {
            newThread.user["followed"] = true;
            break;
          }
        }
        delete newThread["followers"];
        return newThread;
      });

      // if (thread.user.followers.length != 0) thread.followed = true;
      cb(null, threads);
    })
    .catch((err) => {
      cb(err, null);
    });
};

exports.showThreadDetails = (threadId, cb) => {
  Thread.findById(threadId)
    .populate("user")
    .then((thread) => {
      cb(null, thread);
    })
    .catch((err) => cb(err));
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
