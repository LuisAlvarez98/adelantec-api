const express = require("express");
const bodyParser = require("body-parser");
const Area = require("../controllers/area");
const router = express.Router();
const jsonParser = bodyParser.json();

router.get("/api/area", jsonParser, Area.getAreas);
router.post("/api/area", jsonParser, Area.createArea);
router.delete("/api/area/:id", jsonParser, Area.deleteArea);

module.exports = router;
