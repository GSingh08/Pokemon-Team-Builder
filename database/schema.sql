CREATE DATABASE pokemonproject4;
\c pokemonproject4

DROP TABLE IF EXISTS team;
DROP TABLE IF EXISTS pokemon_teams;

CREATE TABLE team(
  id BIGSERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL
);

CREATE TABLE pokemon_teams(
  id BIGSERIAL PRIMARY KEY,
  team_id INTEGER REFERENCES team(id),
  pokemon_id VARCHAR(255)
);
