var express = require("express");
var cors = require("cors");
var bodyParser = require("body-parser");

var app = express();
app.use(cors());
app.use(bodyParser.json());

var JWT = "xxx.yyy.zzz";
var id = 102;

contractors = [
  {
    id: "1",
    name: "Piotr",
    taxpayerIdentificationNumber: "123213123123",
    town: "Karkow",
    street: "warynskiego 12",
    postalCode: "00-631"
  },
  {
    id: "2",
    name: "Tomek",
    taxpayerIdentificationNumber: "123213123123",
    town: "Warszawa",
    street: "warynskiego 12",
    postalCode: "00-631"
  },
  {
    id: "3",
    name: "Daniel",
    taxpayerIdentificationNumber: "123213123123",
    town: "Warszawa",
    street: "warynskiego 12",
    postalCode: "00-631"
  },
  {
    id: "4",
    name: "Marek",
    taxpayerIdentificationNumber: "123213123123",
    town: "Warszawa",
    street: "warynskiego 12",
    postalCode: "00-631"
  },
  {
    id: "5",
    name: "Arek",
    taxpayerIdentificationNumber: "123213123123",
    town: "Warszawa",
    street: "warynskiego 12",
    postalCode: "00-631"
  },
  {
    id: "6",
    name: "Jarek",
    taxpayerIdentificationNumber: "123213123123",
    town: "Warszawa",
    street: "warynskiego 12",
    postalCode: "00-631"
  },
  {
    id: "7",
    name: "Jacek",
    taxpayerIdentificationNumber: "123213123123",
    town: "Warszawa",
    street: "warynskiego 12",
    postalCode: "00-631"
  }
];

contractors = [];

app.get("/", function(req, res) {
  res.status(401).send("not authorized");
});

app.post("/register", function(req, res) {
  res.send({ token: JWT });
});

app.post("/login", function(req, res) {
  if (req.body.username === "root" && req.body.password === "password") {
    res.send({ token: JWT });
  } else {
    res
      .status(400)
      .send(
        `WRONG CREDENTIALS, username: ${req.body.username}, password: ${req.body.password}`
      );
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

app.get("/contractor-list", function(req, res) {
  if (!req.headers.authorization) {
    res.status(401).send("UNAUTHORIZED ACCESS TO SPECIAL");
  } else {
    const token = req.headers.authorization.split(" ")[1];
    if (token !== JWT) {
      res.status(401).send("UNAUTHORIZED ACCESS TO SPECIAL");
    }
  }
  res.send(contractors);
});

app.post("/upsert-contractor", function(req, res) {
  if (!req.headers.authorization) {
    res.status(401).send("UNAUTHORIZED ACCESS TO SPECIAL");
  } else {
    const token = req.headers.authorization.split(" ")[1];
    if (token !== JWT) {
      res.status(401).send("UNAUTHORIZED ACCESS TO SPECIAL");
    }
  }
  if (req.body.id && req.body.id !== "") {
    res.send(req.body);
  } else {
    req.body.id = (++id).toString();
    res.send(req.body);
  }
});

app.post("/remove-contractor", function(req, res) {
  if (!req.headers.authorization) {
    res.status(401).send("UNAUTHORIZED ACCESS TO SPECIAL");
  } else {
    const token = req.headers.authorization.split(" ")[1];
    if (token !== JWT) {
      res.status(401).send("UNAUTHORIZED ACCESS TO SPECIAL");
    }
  }
  res.send(req.body);
});

app.listen(1234);
