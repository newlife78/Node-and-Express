var express = require("express");
var app = express();
var bodyParser = require("body-parser");
require("dotenv").config();

app.use("/public", express.static(__dirname + "/public"));

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/views/index.html");
});

app.get("/json", (req, res) => {
  res.json({
    message:
      process.env.MESSAGE_STYLE === "uppercase" ? "HELLO JSON" : "Hello json",
  });
});

//Chain middleware to create a time server
app.get(
  "/now",
  (req, res, next) => {
    req.time = new Date().toString();
    next();
  },
  (req, res) => {
    res.json({ time: req.time });
  }
);

//GET route parameters input from the client using an echo server
app.get("/:word/echo", (req, res) => {
  res.json({ echo: req.params.word });
});

//GET query parameter input from the client
app.get("/name", (req, res) => {
  res.json({ name: req.query.first + " " + req.query.last });
});

//Get Data from POST Requests
app.use(bodyParser.urlencoded({ extended: false }));

app.post("/name", (req, res) => {
  res.json({ name: req.body.first + " " + req.body.last });
});

module.exports = app;
