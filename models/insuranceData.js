const mongoose = require("mongoose");
const User = require("./users");

const insuranceDataSchema = mongoose.Schema({
  insurance_name: {
    type: String,
    required: true,
  },
  benefits: {
    type: String,
    required: true,
  },
  claim_amount: {
    type: String,
    required: true,
  },
  validity_date: {
    type: String,
    required: true,
  },
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
});

const InsuranceData = mongoose.model("InsuranceData", insuranceDataSchema);
module.exports = InsuranceData;
