const Thread = require("../../model/Thread");

export function showAllThread(cb) {
  Thread.find({ status: true })
    .populate("user")
    .then((threads) => cb(null, threads))
    .catch((err) => cb(err, null));
}

export function showAllThreadUser(user, cb) {
  Thread.find({ status: true, user: user })
    .populate("user")
    .then((threads) => cb(null, threads))
    .catch((err) => cb(err, null));
}

export function showAThread(threadId, cb) {
  Thread.findById(threadId)
    .then((thread) => {
      cb(null, thread);
    })
    .catch((err) => {
      cb(thread, null);
    });
}

exports.createThread = ({
  name,
  image,
  faultDescription,
  description,
  dateBrought,
  category,
  user,
  cb,
}) => {
  const thread = new Thread({
    name,
    dateBrought,
    faultDescription,
    description,
    createdDate: Date.now(),
    category,
    image,
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

const updateThread = ({
  name,
  image,
  faultDescription,
  description,
  userId,
  threadId,
}) => {};

export function deleteThread(threadId, userId, cb) {
  Thread.findById(threadId)
    .then(async (thread) => {
      {
        if (thread.userId === userId) {
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
}