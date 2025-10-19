const mongoose = require("mongoose");

const MarketPriceSchema = new mongoose.Schema({
  commodity: String,
  comm:String,
  maxPrice: String,
  avgPrice: String,
  minPrice: String,
  date:String
});

module.exports = mongoose.model("MarketPrice", MarketPriceSchema);

