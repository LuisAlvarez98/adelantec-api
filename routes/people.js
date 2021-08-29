const express = require("express");
const bodyParser = require("body-parser");
const People = require("../controllers/people");
const router = express.Router();
const jsonParser = bodyParser.json();

router.get("/api/people", jsonParser, People.getRegisters);
router.post("/api/people", jsonParser, People.createRegister);
router.delete("/api/people/:id", jsonParser, People.deleteRegister);
router.get("/api/people/area/:areaId", jsonParser, People.getRegistersByArea);

module.exports = router;
