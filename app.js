require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const cors = require("./middleware/cors");
const mongoose = require("mongoose");
const area = require("./routes/area");
const people = require("./routes/people");

const PORT = process.env.PORT || 8080;
/** Setup app */
const app = express();

mongoose.connect("mongodb://localhost:27017/rcid", {
  useNewUrlParser: "true",
});

/** Setup global middlewares */
app.use(cors);
app.use(morgan("dev"));

/** Setup routes */
app.use(area);
app.use(people);

app.get("/", function (req, res) {
  res.send("Hack, API working");
});

app.all("*", (req, res) => {
  return res.status(404).json({ data: "Not found!" });
});

app.listen(PORT, () => {
  console.log("The server is running on port 8080");
});
