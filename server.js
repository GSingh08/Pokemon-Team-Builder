const express = require("express");
const app = express();
const PORT = 3000;
const bodyParser = require("body-parser");
const methodOverride = require("method-override");
const fetch = require("node-fetch");
const models = require("./models/team");
const getTeams = models.getTeams;
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
app.use("/client", express.static("client"));

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
// app.get("/pokemon/:id", (request, response) => {
//   const id = request.params.id;
//   const getPokemon = fetch(`https://pokeapi.co/api/v2/pokemon/${id}`).then(
//     response => {
//       return response.json();
//     }
//   );
//   Promise.all([getPokemon, getTeams()])
//     .then(allResponses => {
//       const teamNames = allResponses[1][0];
//       const pokemon = allResponses[0];
//       response.render("pokemon", { teams: teamNames, pokemonData: pokemon });
//     })
//     .catch(error => {
//       console.log("are we hitting an error that we dont know about???", error);
//     });
// });

app.get("/", (request, response) => {
  response.render("index");
});

app.get("/team", (request, response) => {
  getTeams().then(allData => {
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

app.post("/team", urlencodedParser, (request, response) => {
  const newTeam = request.body;
  createTeam(newTeam).then(data => {
    console.log(data);
    response.redirect("/team");
  });
});
//get this working-DONE!
app.get("/team/:id", (request, response) => {
  const id = parseInt(request.params.id);
  findTeamById(id).then(singleData => {
    response.render("show", { singleData: singleData });
  });
});

// in your edit endpoint, list all pokemon with add button. with form that goes to app.post /team/:id/pokemon

// create seperate endpoint to add one pokemon to existing teams
//app.post "/team/:id/pokemon/"
//in the team page list the pokemon that are in that specific team

//Original EDIT PAGE
// app.get("/team/:id/edit", (request, response) => {
//   const id = parseInt(request.params.id);
//   findTeamById(id).then(singleData => {
//     response.render("edit", { singleData: singleData });
//   });
// });

app.get("/team/:id/edit", (request, response) => {
  const id = request.params.id;
  const getPokemon = fetch(`https://pokeapi.co/api/v2/pokemon/`).then(
    response => {
      return response.json();
    }
  );
  Promise.all([getPokemon, findTeamById(id)])
    .then(allResponses => {
      console.log(allResponses);
      const teamNames = allResponses[1][0];
      console.log(teamNames);
      const pokemon = allResponses[0].results;
      console.log("THis is pokemon", pokemon);
      response.render("edit", { teams: teamNames, pokemonData: pokemon });
    })
    .catch(error => {
      console.log("are we hitting an error that we dont know about???", error);
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
