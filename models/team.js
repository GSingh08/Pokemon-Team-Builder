const db = require('./connection');

const Team = {};

Team.getTeams = () => db.any('SELECT * FROM team ORDER BY id ASC');

Team.findTeamById = id => db.one('SELECT * FROM team WHERE id = $1', [id]);

Team.createTeam = data => db.one('INSERT INTO team(name) VALUES($1) RETURNING id', [data.name]);

Team.editTeam = (id, userInput) => db.none('UPDATE team SET name = $1 WHERE id = $2', [
  userInput.name,
  id,
]);

Team.deleteTeam = id => db.result('DELETE FROM team WHERE id = $1', [id]);

module.exports = Team;
