const pgp = require("pg-promise")({});
const connectionURL = "postgres://localhost:5432/pokemonproject4";
// const connection = pgp(connectionURL);
const db = pgp(connectionURL);

const getTeams = () => {
  return db.any("SELECT * FROM team ORDER BY id ASC");
};

const findTeamById = id => {
  return db.one("SELECT * FROM team WHERE id = $1", [id]);
};

const createTeam = data => {
  return db.one("INSERT INTO team(name) VALUES($1) RETURNING id", [data.name]);
};

const editTeam = (id, userInput) => {
  return db.none("UPDATE team SET name = $1 WHERE id = $2", [
    userInput.name,
    id
  ]);
};

const deleteTeam = id => {
  return db.result("DELETE FROM team WHERE id = $1", [id]);
};

module.exports = {
  getTeams: getTeams,
  findTeamById: findTeamById,
  createTeam: createTeam,
  editTeam: editTeam,
  deleteTeam: deleteTeam
};
