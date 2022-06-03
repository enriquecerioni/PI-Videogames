const { getAllVideogames,findVideogame, findVideogameDetail, createVideogameDB } = require('../queries/videogameQueries');

exports.getVideogames = async(req, res, next) => {
    const {name} = req.query;
    if(name){
        try {
            let videogames = await findVideogame(name);
            res.json(videogames)
        } catch (error) {
            next(error);
        }
    }else{
        let allVideogames = await getAllVideogames();
        res.json(allVideogames);
    }
}

exports.getVideogame = async(req, res, next) => {
    try {
        const {id} = req.params
        let videogame = await findVideogameDetail(id);
        res.json(videogame);
    } catch (error) {
        next(error);
    }
}

exports.postVideogame = async(req, res, next) => {
    try {
        const { name, image, description, releaseDate, rating, platforms, genres } = req.body;
        const videogame = await createVideogameDB(name, image, description, releaseDate, rating, platforms, genres);
        res.json(`Se creó correctamente el juego ${name}`);
    } catch (error) {
        next(error);
    }
}