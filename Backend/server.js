require('dotenv').config()
const app = require("./src/app");
const mongoose = require("mongoose");
const connectToDB = require("./src/config/databse")

connectToDB();

app.listen(3000, () => {
  console.log("server is runnin");
});
