const { Router } = require('express');
const { getGenres } = require('../controllers/genreControllers');
const { getVideogames, getVideogame, postVideogame } = require('../controllers/videogameControllers');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');


const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

//VIDEOGAMES
router.get('/videogames', getVideogames);
router.get('/videogames/:id', getVideogame);
router.post('/videogames', postVideogame);

//GENRES
router.get('/genres', getGenres);

module.exports = router;
