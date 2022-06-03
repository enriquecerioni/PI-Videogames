import axios from "axios";

export const GET_ALL_VIDEOGAMES = "GET_ALL_VIDEOGAMES";
export const GET_ALL_GENRES = "GET_ALL_GENRES";
export const FILTER_BY_GENRE = "FILTER_BY_GENRE";
export const FILTER_GAMES_CREATED = "FILTER_GAMES_CREATED";
export const ORDER_BY_NAME = "ORDER_BY_NAME";
export const ORDER_BY_RATING = "ORDER_BY_RATING";
export const GET_VIDEOGAME_BY_NAME = "GET_VIDEOGAME_BY_NAME";

export function getVideogames(){
    return async function (dispatch){
        const obj = await axios.get("http://localhost:3001/videogames");
        return dispatch({
            type: GET_ALL_VIDEOGAMES,
            payload: obj.data
        })
    }
}

export function getGenres(){
    return async function (dispatch){
        const genres = await axios.get("http://localhost:3001/genres");
        return dispatch({
            type: GET_ALL_GENRES,
            payload: genres.data
        })
    }
}

export function getVideogameByName(name){
    return async function(dispatch){
        try {
            const videogamesByName= await axios.get(`http://localhost:3001/videogames?name=${name}`);
            return dispatch({
                type: GET_VIDEOGAME_BY_NAME,
                payload: videogamesByName.data
            })
        } catch (error) {
            console.log(error);
        }
        
    }
}

export function postVideogame(payload){
    return async function (dispatch){
        const videogame = await axios.post("http://localhost:3001/videogames", payload);
        return videogame;
    }
}

export function filterVideogamesByGenre(payload){
    return {
        type: FILTER_BY_GENRE,
        payload // genero recibido por el select
    }
}

export function filterVideogamesCreated(payload){
    return {
        type: FILTER_GAMES_CREATED,
        payload
    }
}

export function orderByName(payload){
    return {
        type: ORDER_BY_NAME,
        payload
    }
}

export function orderByRating(payload){
    return {
        type: ORDER_BY_RATING,
        payload
    }
}