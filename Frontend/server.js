const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();
app.use(cors());
app.use(bodyParser.json());

// MongoDB connection
mongoose.connect("mongodb://127.0.0.1:27017/registerdb")
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(err));

// Schema
const UserSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String
});

const User = mongoose.model("User", UserSchema);

// POST API
app.post("/register", async (req, res) => {
  const user = new User(req.body);
  await user.save();
  res.send({ message: "User Registered Successfully" });
});

app.listen(3000, () => {
  console.log("Server running on port 3000");
});