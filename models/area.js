const mongoose = require("mongoose");

const area = mongoose.Schema({
  areaId: String,
  name: String,
  description: String,
  currentCapacity: Number,
  maxCapacity: Number,
  image: String,
});

const AreaModel = mongoose.model("AreaModel", area);
module.exports = AreaModel;
