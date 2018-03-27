const express = require('express');

const app = express();
const PORT = 3000;
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const fetch = require('node-fetch');
const models = require('./models/team');
const Pokemon = require('./models/pokemon');
const Team = require('./models/team');

app.set('view engine', 'ejs');
// const bcrypt = require("bcrypt");
// const salt = "$2a$10$XrWKByqfUPo/iJyTzMaXq.";
const urlencodedParser = bodyParser.urlencoded({ extended: false });
app.use(bodyParser.json());
app.use(methodOverride('_method'));
app.use('/client', express.static('client'));

const get = url => fetch(url).then(response => response.json());

app.get('/pokemon/', (request, response) => {
  fetch('https://pokeapi.co/api/v2/pokemon/?limit=100')
    .then(apiResponse => apiResponse.json())
    .then((json) => {
      response.render('index', { allData: json.results });
    });
});
// THIS GETS 1 POKEMON PER PAGE
// app.get("/pokemon/:id", (request, response) => {
//   const id = request.params.id;
//   fetch(`https://pokeapi.co/api/v2/pokemon/${id}`)
//     .then(apiResponse => apiResponse.json())
//     .then(json => {
//       response.render("pokemon", { allData: json });
//     });
// });
app.get('/pokemon/:id', (request, response) => {
  const id = request.params.id;
  const getPokemon = fetch(`https://pokeapi.co/api/v2/pokemon/${id}`).then(response => response.json());
  Promise.all([getPokemon, Team.getTeams()])
    .then((allResponses) => {
      const teamNames = allResponses[1];
      // console.log(teamNames);
      const pokemon = allResponses[0];
      response.render('pokemon', { teams: teamNames, pokemonData: pokemon });
    })
    .catch((error) => {
      console.log('are we hitting an error that we dont know about???', error);
    });
});

// app.get("/", (request, response) => {
//   response.render("index");
// });

app.get('/team', (request, response) => {
  Team.getTeams().then((allData) => {
    response.render('team', { allData });
  });

  // team().then(allData => {
  // response.json(allData);
  // });
});

app.get('/team', (request, response) => {
  response.render('create');
});

app.get('/team/create', (request, response) => {
  response.render('create');
});

app.post('/team', urlencodedParser, (request, response) => {
  const newTeam = request.body;
  Team.createTeam(newTeam).then((data) => {
    // console.log(data);
    response.redirect('/team');
  });
});

// create seperate endpoint to add one pokemon to existing teams
// app.post "/team/:id/pokemon/"
// in the team page list the pokemon that are in that specific team

app.post('/team/addPokemon', urlencodedParser, (request, response) => {
  const newPokemon = request.body;
  console.log(newPokemon);

  // console.log(newPokemon);
  Pokemon.createPokemon(newPokemon)
    .then((singleData) => {
      response.redirect('/team');
    })
    .catch((error) => {
      console.log('add poke error', error);
    });
});

// get this working-DONE!
// This path shows each seperate team.
app.get('/team/:id', (request, response) => {
  const id = parseInt(request.params.id);
  Pokemon.getTeam(id).then((teamData) => {
    response.render('show', { teamData });
  });
});

// in your edit endpoint, list all pokemon with add button. with form that goes to app.post /team/:id/pokemon

// Original EDIT PAGE
app.get('/team/:id/edit', (request, response) => {
  const id = parseInt(request.params.id);
  Team.findTeamById(id).then((singleData) => {
    response.render('edit', { singleData });
  });
});

app.post('/team/:id', urlencodedParser, (request, response) => {
  const id = parseInt(request.params.id);
  const userInput = request.body;
  Team.editTeam(id, userInput);
  response.redirect('/team');
});

// This deletes the team
app.delete('/team/:id', (request, response) => {
  const id = parseInt(request.params.id);
  // const userInput = request.body;
  Team.deleteTeam(id);
  response.redirect('/team');
});

// This deletes the pokemon from the team page
app.delete('/team/:teamid/pokemon/:pokemonid', (request, response) => {
  const teamId = request.params.teamid;
  const pokemonId = request.params.pokemonid;
  Pokemon.deleteTeam(teamId, pokemonId);
  response.redirect('/team');
});

app.listen(PORT, () => {
  console.log(`Port is listening on ${PORT} `);
});
