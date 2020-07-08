const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const path = require("path");
const mongoose = require("mongoose");
const keys = require("./config/keys");
const Thread = require("./model/Thread");
app.use(bodyParser.json());
var cors = require("cors");
app.use(cors({ origin: true, credentials: true }));
app.use(express.static(path.join(__dirname, "public")));
const jwtToken = require("./middleware/jwt-token");

mongoose
  .connect(keys.DATABASE, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then((data) => {
    console.log("connected to database");
    app.listen(process.env.PORT || 3000, () =>
      console.log("listining to the port 3000")
    );
  })
  .catch((err) => console.log(err));

//   routes
const auth = require("./route/auth");
app.use("/api/auth", auth);

// admin routes
const adminRoute = require("./route/admin");
const isAdmin = require("./middleware/isAdmin");
app.use("/api/admin", jwtToken, adminRoute);

app.use("/", (req, res) => {
  res.send("Page not found");
});
