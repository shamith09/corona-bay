const express = require("express");
const cors = require("cors");
const path = require("path");
const passport = require("passport");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const fileUpload = require('express-fileupload');
const users = require("./routes/api/users");
const detection = require("./routes/api/detection");

const app = express();

// File uploading
app.use(fileUpload())

// CORS middleware
app.use(cors());

// Bodyparser middleware
app.use(
  bodyParser.urlencoded({
    extended: false,
  })
);
app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, "client/build")));

const db = require("./config/keys").mongoAuth;

// Connect to MongoDB
mongoose
  .connect(db, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("MongoDB Connected..."))
  .catch((err) => console.log(err));

// Passport middleware
app.use(passport.initialize());

// Passport config
require("./config/passport")(passport);

app.use(express.static(path.resolve(__dirname, "client", "public")));

// Routes
app.use("/api/users", users);
app.use("/api", detection);




// Catch routes and route to web page
app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}...`));
