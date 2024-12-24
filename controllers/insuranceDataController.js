const InsuranceData = require("../models/insuranceData");
const User = require("../models/users");

const createInsurance = async (req, res) => {
  try {
    const { insurance_name, benefits, claim_amount, validity_date, user_id } =
      req.body;

    const result = await InsuranceData.create({
      insurance_name,
      benefits,
      claim_amount,
      validity_date,
      user_id,
    });
    console.log("result", result);
    res.status(200).json({
      message: "Insurance created successfully",
      data: result,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error creating insurance", error: error.message });
  }
};

const getInsurance = async (req, res) => {
  try {
    console.log("req.body", req.body);
    const where = [
      {
        lookup: {
          from: "users",
          localField: "user",
          foreignField: "_id",
          as: "userData",
        },
      },
    ];

    // const result = await InsuranceData.aggregate([
    //   {
    //     $lookup: {
    //       from: "users",
    //       localField: "user",
    //       foreignField: "_id",
    //       as: "user_data",
    //     },
    //   },
    // ]);
    const result = await InsuranceData.find().populate("user_id");
    res.status(200).json({
      message: "Insurance data fetched successfully",
      data: result,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching insurance data", error: error.message });
  }
};

module.exports = { createInsurance, getInsurance };
