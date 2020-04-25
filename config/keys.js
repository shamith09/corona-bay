require("dotenv").config();

const userName = process.env.MONGO_USERNAME;
const password = process.env.MONGO_PASSWORD;

mongoURI =
  "mongodb+srv://" +
  encodeURIComponent(userName) +
  ":" +
  encodeURIComponent(password) +
  "@corona-bay-eeumf.mongodb.net/corona-bay?retryWrites=true";

module.exports = {
  mongoAuth: mongoURI,
  secretOrKey: "secret",
};
