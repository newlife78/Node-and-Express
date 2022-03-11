var express = require("express");
var app = express();

let absolutePathHtml = __dirname + "/views/index.html";
let absolutePathCss = __dirname + "/public";

app.use("/public", express.static(absolutePathCss));

// app.get("/", (req, res) => {
//   res.send("Hello Express");
// });

app.get("/", (req, res) => {
  res.sendFile(absolutePathHtml);
});

console.log("Hello Node and Express!");

module.exports = app;
