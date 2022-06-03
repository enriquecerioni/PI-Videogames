const axios = require('axios');
const { Genre } = require('../db');
const { API_KEY } = process.env;

exports.getGenresDB = async () => {
    const genresAPI = await axios.get(`https://api.rawg.io/api/genres?key=${API_KEY}`);

    const typeGenre = genresAPI.data.results.map(genre => genre.name);
    typeGenre.map(t => {
        Genre.findOrCreate({
            where: {name: t},
        })
    })
    return typeGenre;
}