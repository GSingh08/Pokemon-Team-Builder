const pgp = require('pg-promise')({});

const connectionURL = 'postgres://localhost:5432/pokemonproject4';
// const connection = pgp(connectionURL);
const db = pgp(connectionURL);

module.exports = db;
