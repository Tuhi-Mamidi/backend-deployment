const User = require("../model/usermodel.js");
const Message = require("../model/megmodel.js");
const Pest = require("../model/pestmodel.js");
const  Schema= require("../model/schemamodel.js");
const allData = async (req, res) => {
  try {
    const [userSum, pestSum, schemaCount, messageCount] = await Promise.all([
      User.aggregate([
        { $group: { _id: null, totalPrice: { $sum: "$price" } } }
      ]),
      Pest.aggregate([
        { $group: { _id: null, totalPrice: { $sum: "$quantity" } } }
      ]),
      Schema.countDocuments(),
      Message.countDocuments()
    ]);

    res.status(200).json({
      userTotalPrice: userSum.length > 0 ? userSum[0].totalPrice : 0,
      pestTotalPrice: pestSum.length > 0 ? pestSum[0].totalPrice : 0,
      schemaCount,
      messageCount
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { allData };