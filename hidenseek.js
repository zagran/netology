'use strict';

const del = require('del');
const recursive = require('recursive-readdir');
const fs = require('fs');
const path = require('path');
const conf = {encoding: 'utf8'};
const PokemonList = require('./pokemons/list').PokemonList;

function getPokemonRandomLocations(count) {
    let arr = ['01', '02', '04', '05', '06', '07', '08', '09', '10'];
    let shuffled = arr.slice(0), i = arr.length, min = i - count, temp, index;
    while (i-- > min) {
        index = Math.floor((i + 1) * Math.random());
        temp = shuffled[index];
        shuffled[index] = shuffled[i];
        shuffled[i] = temp;
    }
    return shuffled.slice(min);
}

function hidePokemon(file, name, level) {
    return new Promise((resolve, reject) => {
        fs.writeFile(file, name + '|' + level, (err) => {
            if (err) throw reject(err);
            console.log(`Pokemon ${name} with ${level} level now in ${file}`);
            resolve();
        });
    })
}

function hide(dir = './fields', allPokemons) {
    return new Promise((resolve, reject) => {
        if (allPokemons.length > 3) {
            allPokemons = allPokemons.slice(0, 3);
        }
        let pokemonLocations = getPokemonRandomLocations(allPokemons.length);
        del([dir + '/**']).then(paths => {
            fs.mkdir(dir, (err) => {
                if (err) throw err;
                let count = 0;
                for (let i = 1; i <= 10; i++) {
                    let s = "0" + i;
                    let pokemonDir = s.substr(s.length - 2);
                    var createDirs = [];
                    createDirs.push(new Promise((resolve, reject) => {
                        fs.mkdir(dir + '/' + pokemonDir, (err) => {
                            if (err) throw err;
                            resolve();
                        });
                    }));
                }
                return Promise.all(createDirs)
                    .then(() => {
                        return hidePokemon(dir + '/' + pokemonLocations[0] + '/pokemon.txt', allPokemons[0].name, allPokemons[0].level)
                            .then(() => {
                                return hidePokemon(dir + '/' + pokemonLocations[1] + '/pokemon.txt', allPokemons[1].name, allPokemons[1].level)

                            })
                            .then(() => {
                                return hidePokemon(dir + '/' + pokemonLocations[2] + '/pokemon.txt', allPokemons[2].name, allPokemons[2].level)
                            })
                            .then(() => {
                                resolve();
                            });
                    })


            });
        });
    })

}

function searchPokemon(file) {
    return new Promise((resolve, reject) => {
        fs.readFile(file, conf, (err, pokemon) => {

            if (err) resolve(); //that means no pokemon inside
            resolve(pokemon);
        });
    })
}

function seek(dir = './fields') {
    return new Promise((resolve, reject) => {

        var search = [];

        for (let i = 1; i <= 10; i++) {
            let s = "0" + i;
            let pokemonDir = s.substr(s.length - 2);

            search.push(searchPokemon(dir + '/' + pokemonDir + '/pokemon.txt'));
        }

        return Promise.all(search).then((data) => {
            var found = new PokemonList();
            data.forEach((item) => {
                if (item) {
                    found.add(item.split('|')[0], item.split('|')[1]);
                }
            })
            console.log(found);
            resolve(found);
        })
    })
}

module.exports = {
    hide: hide,
    seek: seek
};
