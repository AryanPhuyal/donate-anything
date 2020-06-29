const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const path = require("path");
const mongoose = require("mongoose");
const keys = require("./config/keys");

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
    app.listen(keys.PORT || 3000, () =>
      console.log("listining to the port 3000")
    );
  })
  .catch((err) => console.log(err));

//   routes
const auth = require("./route/auth");
app.use("/api/auth", auth);
