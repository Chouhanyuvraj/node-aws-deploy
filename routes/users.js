var express = require("express");
var router = express.Router();
const User = require("../controllers/userController");
const auth = require("../Middleware/auth");

/* GET users listing. */
router.get("/", function (req, res, next) {
  res.send("respond with a resource");
});

router.post("/register", User.registerUser);
router.post("/login", User.loginUser);

module.exports = router;
