const pgp = require("pg-promise")({});
const connectionURL = "postgres://localhost:5432/";
const connection = pgp(connectionURL);

module.export = connection;
