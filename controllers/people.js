const AreaModel = require("../models/area");
const PeopleModel = require("../models/people");

exports.createRegister = async (req, res) => {
  const values = req.body;
  values.date = new Date();
  const newPeople = new PeopleModel(values);
  try {
    const area = await AreaModel.findOne({ _id: values.area });

    let count = area.currentCapacity + 1;
    if (count > area.maxCapacity) {
      res.statusMessage = "Max capacity exceeded";
      return res.status(400).end();
    }
    await AreaModel.updateOne({ _id: values.area }, { currentCapacity: count });
    await newPeople.save();
  } catch (e) {
    res.statusMessage = "Error registering new register";
    return res.status(400).end();
  }
  return res.status(200).json(newPeople);
};

exports.deleteRegister = async (req, res) => {
  let { id } = req.params;
  try {
    const people = await PeopleModel.findOne({ _id: id });
    let peopleArea = people.area;

    const area = await AreaModel.findOne({ _id: peopleArea });

    let count = area.currentCapacity - 1;
    await AreaModel.updateOne({ _id: area }, { currentCapacity: count });

    await PeopleModel.deleteOne({ _id: id });

    return res.json({ message: "Register deleted" });
  } catch (e) {
    return res.status(500).send(e);
  }
};

exports.getRegisters = async (req, res) => {
  try {
    const peoples = await PeopleModel.find();
    return res.status(200).json(peoples);
  } catch (e) {
    return res.status(404).json({ message: "No register found." });
  }
};

exports.getRegistersByArea = async (req, res) => {
  let { areaId } = req.params;
  try {
    const registers = await PeopleModel.find({ area: areaId });
    return res.status(200).json(registers);
  } catch (e) {
    return res.status(404).json({ message: "No registers found." });
  }
};
