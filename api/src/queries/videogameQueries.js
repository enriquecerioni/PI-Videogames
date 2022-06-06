const { API_KEY } = process.env;
const axios = require('axios');
const { Op } = require('sequelize');
const { Videogame, Genre } = require('../db');

// ENCONTRAR JUEGO POR NOMBRE <<<<<<<<
exports.findVideogame = async(name) => {
    let first_games = await axios.get(`https://api.rawg.io/api/games?search={${name}}&key=${API_KEY}`); // 20 GAMES
    let videogamesAPI = await Promise.all(first_games.data.results.map(async(game) => {
        let description_game = await axios.get(`https://api.rawg.io/api/games/${game.id}?key=${API_KEY}`) //obtenemos la descripción de cada juego
        return{
            image: game.background_image,
            name: game.name,
            genres: game.genres,
            description: description_game.data.description,
            id: game.id,
            rating: game.rating,
            relaseDate: game.released,
            platforms: game.platforms
        }
    }))

    // Juegos creados en la BD
    let videogamesDB = await Videogame.findAll({ //traemos todos los juegos de la base de datos
        where:{
            name:{
                [Op.iLike]: `%${name}%` // filtramos por el 'name' de búsqueda
            },
        },
        include:{
            model: Genre,
            attributes: ['name']
        }
    })
    
    let videogamesMatched = videogamesDB.concat(videogamesAPI);
    let first_videogames = [];
    for(let i = 0; i < 15; i++){
        first_videogames.push(videogamesMatched[i]);
    }
    if(first_videogames.length === 0) return "Juego no encontrado.";
    else return first_videogames;
}

// TRAER TODOS LOS JUEGOS (LIMIT 100) <<<<<<<<
exports.getAllVideogames = async() => {
    const games1 = await axios.get(`https://api.rawg.io/api/games?&key=${API_KEY}`);
    const games2 = await axios.get(games1.data.next);
    const games3 = await axios.get(games2.data.next);
    const games4 = await axios.get(games3.data.next);
    const games5 = await axios.get(games4.data.next);
    gamesApi = games1.data.results.concat(games2.data.results, games3.data.results, games4.data.results, games5.data.results)

    const gamesDetailAPI = await Promise.all(gamesApi.map(async game => {
        let description_game = await axios.get(`https://api.rawg.io/api/games/${game.id}?&key=${API_KEY}`);
        return {
            image: game.background_image,
            name: game.name,
            genre: game.genres,
            description: description_game.data.description,
            id: game.id,
            rating: game.rating,
            realasedDate: game.released,
            plaftorms: game.platforms
        }
    }))

    const gamesDetail = async() => {
        let gamesDB = await Videogame.findAll({
            include: {
                model: Genre,
                attributes: ['name'],
            }
        })
        return gamesDB;
    }
    const gamesDetaliDB = await gamesDetail();

    const allVideogames = gamesDetaliDB.concat(gamesDetailAPI);
    return allVideogames;
}


// ENCONTRAR JUEGO POR ID <<<<<<<<
exports.findVideogameDetail = async(id) => {
    if(Boolean(Number(id))){
        const videogameDetailAPI = await this.getVideogameDetailAPI(id);
        if(Object.keys(videogameDetailAPI).length>0) return videogameDetailAPI;
        else return `El ID: ${id} no existe.`;
    }else{
        const videogameDetailDB = await this.getVideogameDetailDB(id);
        if(Object.keys(videogameDetailDB).length>0) return videogameDetailDB;
        else return `El ID: ${id} no existe.`;
    }
}

exports.getVideogameDetailAPI = async(id) => {
    try {     
        const detail = await axios.get(`https://api.rawg.io/api/games/${id}?key=${API_KEY}`);
        return {
            id: detail.data.id,
            image: detail.data.background_image,
            name: detail.data.name,
            genres: detail.data.genres,
            description: detail.data.description,
            releaseDate: detail.data.released,
            rating: detail.data.rating,
            platforms: detail.data.platforms.map(p => p.platform.name)
    }
    } catch (error) {
        return `El ID: ${id} no existe`;
    }
}

exports.getVideogameDetailDB = async(id) => {
    try {     
        const detail = await Videogame.findOne({
            where: {
                id: id
            },
            include: {
                model: Genre,
                attributes: ['name']
            }
        })
        return detail;
    } catch (error) {
        return `El ID: ${id} no existe`;
    }
}

// CREAR UN NUEVO JUEGO <<<<<<<<
exports.createVideogameDB = async (name, image, description, releaseDate, rating, platforms, genres) => {
    let videogame = await Videogame.create({
        name,
        image,
        description,
        releaseDate,
        rating,
        platforms
    })

    genres?.forEach(async(genre) => {
        let genreFound = await Genre.findOne({
            where: {
                name: genre,
            }
        })
        videogame.addGenre(genreFound);
    });
}