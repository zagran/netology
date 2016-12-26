'use strict';

const fs = require('fs');

const Pokemon = require('./pokemons/list').Pokemon;
const PokemonList = require('./pokemons/list').PokemonList;
const pokemons = JSON.parse(fs.readFileSync('./data/pokemons.json', 'utf8'));
const pokemonGo = require('./hidenseek');

const objects = pokemons.map(
    o => new Pokemon(o.name, o.level)
);

const allPokemons = new PokemonList(...objects.slice(1, 10));

var args = process.argv.slice(2);

if (args && args[0] == 'hide') {
    pokemonGo.hide(args[1], allPokemons);

} else if (args && args[0] == 'seek') {
    pokemonGo.seek(args[1]);
}
else {
    pokemonGo.hide('./fields2', allPokemons)
        .then(() => {
            pokemonGo.seek('./fields2');
        });
}
