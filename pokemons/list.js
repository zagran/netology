'use strict';

class Pokemon {
    constructor(name, level) {
        this.name = name;
        this.level = level;
    }

    show() {
        console.log(`Pokemon ${this.name} (${this.level}lvl)`);
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

    get() {
        return this;
    }
}

module.exports = {
    PokemonList: PokemonList,
    Pokemon: Pokemon
};
