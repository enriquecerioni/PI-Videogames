const { getGenresDB } = require('../queries/genreQueries');

exports.getGenres = async(req, res, next) => {
    try {
        let genres = await getGenresDB();
            res.json(genres);
    } catch (error) {
        next(error);
    }
}