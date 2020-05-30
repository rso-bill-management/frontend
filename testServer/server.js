var express = require("express");
var cors = require("cors");
var bodyParser = require("body-parser");

var app = express();
app.use(cors());
app.use(bodyParser.json());

var JWT = "xxx.yyy.zzz";

app.get("/", function(req, res) {
  res.send(401, "not authorized");
});

app.post("/register", function(req, res) {
  res.send({ token: JWT });
});

app.post("/login", function(req, res) {
  if (req.body.username === "root" && req.body.password === "password") {
    res.send({ token: JWT });
  } else {
    res.send(400, "WRONG CREDENTIALS");
  }
});

app.get("/events", function(req, res) {
  res.send("Welcome events");
});

app.get("/special", function(req, res) {
  if (!req.headers.authorization) {
    res.status(401).send("UNAUTHORIZED ACCESS TO SPECIAL");
  } else {
    const token = req.headers.authorization.split(" ")[1];
    if (token !== JWT) {
      res.status(401).send("UNAUTHORIZED ACCESS TO SPECIAL");
    }
  }
  res.send("Welcome special");
});

app.listen(1234);
