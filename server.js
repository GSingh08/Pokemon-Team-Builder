const express = require("express");
const app = express();
const PORT = 3000;
const bodyParser = require("body-parser");
const methodOverride = require("method-override");
const fetch = require("node-fetch");
const models = require("./models/team");
const team = models.team;
const createTeam = models.createTeam;
const findTeamById = models.findTeamById;
const editTeam = models.editTeam;
const deleteTeam = models.deleteTeam;

app.set("view engine", "ejs");
// const bcrypt = require("bcrypt");
// const salt = "$2a$10$XrWKByqfUPo/iJyTzMaXq.";
const urlencodedParser = bodyParser.urlencoded({ extended: false });
app.use(bodyParser.json());
app.use(methodOverride("_method"));
app.use("/client", express.static("./client/"));

let get = url => {
  return fetch(url).then(response => response.json());
};

app.get("/pokemon/", (request, response) => {
  fetch("https://pokeapi.co/api/v2/pokemon/?limit=100")
    .then(apiResponse => apiResponse.json())
    .then(json => {
      response.render("index", { allData: json.results });
    });
});

app.get("/pokemon/:id", (request, response) => {
  const id = request.params.id;
  fetch(`https://pokeapi.co/api/v2/pokemon/${id}`)
    .then(apiResponse => apiResponse.json())
    .then(json => {
      response.render("pokemon", { allData: json });
    });
});

// app.get("/", (request, response) => {
//   response.render("index");
// });

app.get("/team", (request, response) => {
  team().then(allData => {
    response.render("team", { allData: allData });
  });

  // team().then(allData => {
  // response.json(allData);
  // });
});

app.get("/team", (request, response) => {
  response.render("create");
});

app.get("/team/create", (request, response) => {
  response.render("create");
});

app.post("/team/", urlencodedParser, (request, response) => {
  const newTeam = request.body;
  createTeam(newTeam).then(data => {
    console.log(data);
    response.redirect("/team");
  });
});

app.get("/team/:id", (request, response) => {
  const id = parseInt(request.params.id);
  findTeamById(id).then(singleData => {
    response.render("show", { singleData: singleData });
  });
});

app.get("/team/:id/edit", (request, response) => {
  const id = parseInt(request.params.id);
  findTeamById(id).then(singleData => {
    response.render("edit", { singleData: singleData });
  });
});

app.post("/team/:id", urlencodedParser, (request, response) => {
  const id = parseInt(request.params.id);
  const userInput = request.body;
  editTeam(id, userInput);
  response.redirect("/team");
});

app.delete("/team/:id", (request, response) => {
  const id = parseInt(request.params.id);
  // const userInput = request.body;
  deleteTeam(id);
  response.redirect("/team");
});

app.listen(PORT, () => {
  console.log(`Port is listening on ${PORT} `);
});
