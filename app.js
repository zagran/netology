'use strict';

class Pokemon {
    constructor(name, level) {
        this.name = name;
        this.level = level;
    }

    show() {
        console.log(`Pokemon ${this.name} (${this.level}lvl)`);
    }

    valueOf() {
        return this.level;
    }
}

class PokemonList extends Array {

    add(name, level) {
        this.push(new Pokemon(name, level));
    }

    show() {
        console.log(`Total pokemons in list: ${this.length}`);
        this.forEach(
            (item, i, arr) => item.show()
        );
    }

    delete(name, level) {
        let count = this.length;
        this.forEach(
            (item, i, arr) => {
                if (item.level == level && item.name == name) {
                    this.splice(i, 1);
                }
            }
        );
        console.log(`Pokemons delete: ${count - this.length}`)
    }

    max() {
        let maxLevel = Math.max.apply(Math, this.map(pokemon => pokemon.valueOf()));
        var maxLevelPokemon = this.find(pokemon => pokemon.valueOf() == maxLevel);

        console.log(maxLevelPokemon);

    }
}

const pokemons = [
    {name: 'pokemon1', level: 1},
    {name: 'pokemon2', level: 2},
    {name: 'pokemon3', level: 3},
    {name: 'pokemon4', level: 4},
    {name: 'pokemon5', level: 5},
    {name: 'pokemon6', level: 6},
    {name: 'pokemon7', level: 7},
    {name: 'pokemon8', level: 8},
    {name: 'pokemon9', level: 9},
    {name: 'pokemon10', level: 10},
    {name: 'pokemon11', level: 11},
    {name: 'pokemon12', level: 12},
    {name: 'pokemon13', level: 13},
    {name: 'pokemon14', level: 14},
    {name: 'pokemon15', level: 15},
    {name: 'pokemon16', level: 16},
    {name: 'pokemon17', level: 17},
    {name: 'pokemon18', level: 18},
    {name: 'pokemon19', level: 19},
    {name: 'pokemon0', level: 20},
];

const objects = pokemons.map(
    o => new Pokemon(o.name, o.level)
);

const lost = new PokemonList(...objects.slice());
const found = new PokemonList(...objects.slice(7, 10));

lost.show();
found.show();

lost.delete('pokemon18', 18)
found.add('pokemon18', 18);

found.show();
found.max();

