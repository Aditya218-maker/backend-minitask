require('dotenv').config()
const app = require("./src/app");
const mongoose = require("mongoose");
const connectToDB = require("./src/config/databse")

// function connectToDB() {
//   mongoose
//     .connect(
//       "mongodb+srv://Aditya1:Title143@cluster0.9dbzsu5.mongodb.net/day-6",
//       //mongodb+srv is a protocol(like http) made by Mongo DB 
//       //.9dbzsu5 is the cluster id
//       //Aditya1 is the name of the credential
//     )
//     .then(() => {
//       console.log("connected to databse!");
//     });
// }
//bas ab is code ko jo ki DB se connect krti use yaha nhi database.js file me likho kyuki yjha already boht kuch baad me likhna hai
//par call yha pe hi krna hi isliye database.js se export krke yaha require karo: const connectToDB = require("./src/config/databse")

connectToDB();

app.listen(3000, () => {
  console.log("server is runnin");
});
