'use strict';

const del = require('del');
const recursive = require('recursive-readdir');
const fs = require('fs');
const conf = {encoding: 'utf8'};
const PokemonList = require('./pokemons/list').PokemonList;
const Pokemon = require('./pokemons/list').Pokemon;

function getPokemonRandomLocations(count) {
    let arr = ['01', '02', '04', '05', '06', '07', '08', '09', '10'];
    let i = arr.length;
    while (i-- > count) {
        let index = Math.floor((i + 1) * Math.random());
        arr.splice(index, 1);
    }
    return arr;
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

function getDirName(i) {
    let s = "0" + i;
    return s.substr(s.length - 2);
}

function hide(dir = './fields', allPokemons) {
    if (allPokemons.length > 3) {
        allPokemons = allPokemons.slice(0, 3);
    }
    let pokemonLocations = getPokemonRandomLocations(allPokemons.length);
    //firstly remove all from dir(with dir)
    return del([dir + '/**']).then(paths => {
        let createDirs = [];
        //create main directory
        createDirs.push(new Promise((resolve, reject) => {
            fs.mkdir(dir, (err) => {
                if (err) reject(err);
                resolve();
            });
        }));
        //create pokemon directories (01/02...)
        for (let i = 1; i <= 10; i++) {
            let pokemonDir = getDirName(i);

            createDirs.push(new Promise((resolve, reject) => {
                fs.mkdir(dir + '/' + pokemonDir, (err) => {
                    if (err) reject(err);
                    resolve();
                });
            }));
        }
        // create dirs -> hide pokemons
        return Promise.all(createDirs)
            .then(() => {
                return hidePokemon(dir + '/' + pokemonLocations[0] + '/pokemon.txt', allPokemons[0].name, allPokemons[0].level)
            }).then(() => {
                return hidePokemon(dir + '/' + pokemonLocations[1] + '/pokemon.txt', allPokemons[1].name, allPokemons[1].level)
            }).then(() => {
                return hidePokemon(dir + '/' + pokemonLocations[2] + '/pokemon.txt', allPokemons[2].name, allPokemons[2].level)
            });

    });


}

function searchPokemon(file) {
    return new Promise((resolve, reject) => {
        fs.readFile(file, conf, (err, pokemon) => {
            if (err) resolve(); //that means no pokemon inside
            resolve(pokemon ? new Pokemon(pokemon.split('|')[0], pokemon.split('|')[1]) : '');
        });
    })
}

function seek(dir = './fields') {

    var search = [];

    for (let i = 1; i <= 10; i++) {
        let pokemonDir = getDirName(i);
        search.push(searchPokemon(dir + '/' + pokemonDir + '/pokemon.txt'));
    }

    return Promise.all(search).then((data) => {
        var found = new PokemonList();
        data.map((item) => item ? found.add(item) : '')
        console.log(found);
        return found;
    })
}

console.log(getPokemonRandomLocations(3));

module.exports = {
    hide: hide,
    seek: seek
};
