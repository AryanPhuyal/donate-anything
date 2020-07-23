const {
  createThread,
  showAllThread,
  showAllThreadUser,
  deleteThread,
  showAThread,
  showAllThreadCategory,
} = require("./helper/thread");
const { validationResult } = require("express-validator");
const { query } = require("express");

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
    let imageUrl;
    if (req.file) {
      imageUrl = "/uploads/" + req.file.filename;
    }
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
        userId,
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
// exports.deleteThread(req, res) {}
// export function editThread(req, res) {}
