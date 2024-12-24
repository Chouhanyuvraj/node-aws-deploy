var express = require("express");
var router = express.Router();
const Insurance = require("../controllers/insuranceDataController");
const Auth = require("../Middleware/auth");

router.post("/create", Auth.auth, Insurance.createInsurance);

router.get(
  "/getInsurance",
  Auth.adminAuth(["Super Admin"]),
  Insurance.getInsurance
);

module.exports = router;
