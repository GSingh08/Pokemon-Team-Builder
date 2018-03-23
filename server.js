const express = require("express");
const app = express();
const PORT = 3000;
const bodyParser = require("body-parser");
const fetch = require("node-fetch");
const model = require("./database/index");
app.set("view engine", "ejs");
// const bcrypt = require("bcrypt");
// const salt = "$2a$10$XrWKByqfUPo/iJyTzMaXq.";
// app.use(body.Parser.urlencoded({ extended: false }));
// app.use(bodyParser.json());
// app.use(methodOverride("method"));
// app.use("/assets", express.static("./client/"));

let get = url => {
  return fetch(url).then(response => response.json());
};

app.get("/", (request, response) => {
  response.json("https://pokeapi.co/api/v2/pokemon/");
});

app.listen(PORT, () => {
  console.log(`Port is listening on ${PORT} `);
});
