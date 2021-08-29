const AreaModel = require("../models/area");

exports.createArea = async (req, res) => {
  const values = req.body;
  const newArea = new AreaModel(values);
  try {
    await newArea.save();
  } catch (e) {
    res.statusMessage = "Error registering new area";
    return res.status(400).end();
  }
  return res.status(200).json(newArea);
};

exports.deleteArea = async (req, res) => {
  let { id } = req.params;
  try {
    await AreaModel.deleteOne({ _id: id });

    return res.json({ message: "Area deleted" });
  } catch (e) {
    return res.status(500).send(e);
  }
};

exports.getAreas = async (req, res) => {
  try {
    const areas = await AreaModel.find();
    return res.status(200).json(areas);
  } catch (e) {
    return res.status(404).json({ message: "No areas found." });
  }
};
