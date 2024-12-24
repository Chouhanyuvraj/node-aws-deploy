var createError = require("http-errors");
var express = require("express");
// var path = require("path");
const mongoose = require("mongoose");

var insuranceRouter = require("./routes/insurance");
var usersRouter = require("./routes/users");

var app = express();

const dbConnection = () => {
  try {
    mongoose.connect("mongodb://localhost:27017/insurance-data");
    console.log("mongodb is  connected succesfully");
  } catch (error) {
    console.log(error.message);
  }
};

dbConnection();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
// app.use(express.static(path.join(__dirname, 'public')));

app.use("/", (req, res) => {
  res.json({
    message: "hello from ubuntu 22.04",
  });
});
app.use("/insurance", insuranceRouter);
app.use("/user", usersRouter);

app.use(function (req, res, next) {
  next(createError(404));
});

module.exports = app;
