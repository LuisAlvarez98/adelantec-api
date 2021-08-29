const mongoose = require("mongoose");

const people = mongoose.Schema({
  rcid: String,
  date: Date,
  area: {
    type: "ObjectId",
    ref: "Area",
    required: true,
  },
});

const PeopleModel = mongoose.model("PeopleModel", people);
module.exports = PeopleModel;
