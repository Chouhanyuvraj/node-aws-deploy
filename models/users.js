const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    trim: true,
    lowercase: true,
    unique: true,
    validate: {
      validator: function (v) {
        return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(v);
      },
      message: "Please enter a valid email",
    },
    required: [true, "Email required"],
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ["Super Admin", "Bank Admin", "Bank User"],
    default: "Bank User",
    required: true,
  },
});

const User = mongoose.model("User", userSchema);
module.exports = User;
