// Create a model for pokemon
// delete, create
const db = require('./connection');

const Pokemon = {};

Pokemon.createPokemon = data => db.one(
  'INSERT INTO pokemon_teams(team_id, pokemon_id) VALUES($1,$2) RETURNING id',
  [data.team_id, data.pokemon_id],
);

Pokemon.getTeam = id => db.any('SELECT * FROM pokemon_teams WHERE team_id = $1', [id]);

Pokemon.deleteTeam = (teamId, pokemonId) => db.result(
  'DELETE FROM pokemon_teams WHERE team_id =$1 AND pokemon_id = $2',
  [teamId, pokemonId],
);

module.exports = Pokemon;
