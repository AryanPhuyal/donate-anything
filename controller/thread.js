const {
  createThread,
  showAllThread,
  showAllThreadUser,
  deleteThread,
  showAThread,
  showAllThreadCategory,
  updateThread,
} = require("./helper/thread");
const { validationResult } = require("express-validator");

// all user cam add thread
// name
// image
// date brought
// date
// fault description
// description
exports.addThread = (req, res) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    const name = req.body.name;

    const imageUrl = req.body.image;
    const dateBrought = req.body.DateBrought;
    const faultDescription = req.body.faultDescription;
    const description = req.body.description;
    const userId = req.user._id;
    const category = req.body.category;
    createThread(
      {
        name,
        imageUrl,
        faultDescription,
        description,
        dateBrought,
        category,
        user: userId,
      },
      (err, thread) => {
        if (!err) {
          res.json({ success: thread });
        } else {
          res.json({ err: err });
        }
      }
    );
  } else {
    res.status(400).json(errors);
  }
};
exports.updateThread = (req, res) => {
  updateThread(
    {
      admin: req.user.role.toLowerCase() == "admin" ? true : false,
      threadId: req.params.id,
      name: req.body.name,
      imageUrl: req.body.image,
      faultDescription: req.body.faultDescription,
      description: req.body.description,
      userId: req.user._id,
    },
    (err, data) => {
      if (err && err == "UnAuthorize") {
        res.status(400).json({ err: "Unauthorized access" });
        return;
      }
      if (err && err == "notFound") {
        res.status(400).json({ err: "Thread Not found" });
      } else {
        res.json(data);
      }
    }
  );
};
// all thread
exports.showAllThread = (req, res) => {
  if (req.query.category) {
    showAllThreadCategory(req.query.category, (err, threads) => {
      if (err) {
        res.status(500).json({ err: "Server Error" });
      } else res.json(threads);
    });
  } else
    showAllThread((err, threads) => {
      if (err) {
        res.status(500).json({ err: "Server Error" });
      } else res.json(threads);
    });
};
// send userId as parameter
// require user id
exports.showUserThread = (req, res) => {
  const userId = req.params.userId;
  showAllThreadUser(userId, (err, threads) => {
    if (err) {
      res.status(500).json({ err: "Server Error" });
    } else {
      res.json(threads);
    }
  });
};
// send threadId as paramenter in URL
// require thread id
exports.showOneThread = (req, res) => {
  const threadId = req.params.threadId;
  showAThread(threadId, (err, thread) => {
    if (err) {
      res.status(500).json({ err: "Server Error" });
    } else {
      res.json(thread);
    }
  });
};

// show loggedIn user Thread
exports.showOwnThread = (req, res) => {
  const user = req.user._id;
  showAllThreadUser(user, (err, threads) => {
    if (!err) res.json(threads);
    else res.status(500).json({ err: "Server error" });
  });
};
//
exports.deleteThread = (req, res) => {
  const threadId = req.params.threadId;
  const role = req.user.role;
  deleteThread(threadId, role, req.user._id, (err) => {
    if (!err) {
      res.json({ success: "Success" });
    } else {
      if (err && err == "noPermission") {
        res.status(400).json({ err: "Un Authorized" });
        return;
      }
      res.status(500).json({ err: "internal server Error" });
    }
  });
};
// export function editThread(req, res) {}
