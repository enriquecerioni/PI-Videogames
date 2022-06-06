import { GET_ALL_VIDEOGAMES, GET_ALL_GENRES, FILTER_BY_GENRE, FILTER_GAMES_CREATED, ORDER_BY_NAME, ORDER_BY_RATING, GET_VIDEOGAME_BY_NAME, GET_VIDEOGAME_BY_ID } from "../actions"

const initialState = {
    videogames: [],
    allVideogames: [],
    genres: [],
    detail: {}
}

function rootReducer(state = initialState, action) {
    switch (action.type) {
        case GET_ALL_VIDEOGAMES:
            return {
                ...state,
                videogames: action.payload,
                allVideogames: action.payload,
                detail: {}
            }
        case GET_ALL_GENRES:
            return {
                ...state,
                genres: action.payload
            }
        case GET_VIDEOGAME_BY_NAME:
            return {
                ...state,
                videogames: action.payload
            }
        case GET_VIDEOGAME_BY_ID:
            return {
                ...state,
                detail: action.payload
            }
        case FILTER_BY_GENRE:
            const allVideogames = state.allVideogames;
            const genreFiltered = action.payload === 'All' ? allVideogames : allVideogames.filter(
                g => {
                    for (let i = 0; i < g.genre.length; i++) {
                        if (g.genre[i].name === action.payload) {
                            return g
                        }
                    }
                }
            )
            return {
                ...state,
                videogames: genreFiltered
            }
        case FILTER_GAMES_CREATED:
            const games = action.payload === 'created' ? state.allVideogames.filter(g => g.mine) : state.allVideogames.filter(g => !g.mine);
            return {
                ...state,
                videogames: action.payload === 'All' ? state.allVideogames : games
            }
        case ORDER_BY_NAME:
            let gamesSorted = action.payload === 'asc' ?
                state.videogames.sort(function (a, b) {
                    if (a.name > b.name) {
                        return 1;
                    }
                    if (b.name > a.name) {
                        return -1;
                    }
                    return 0;
                }) : state.videogames.sort(function (a, b) {
                    if (a.name > b.name) {
                        return -1;
                    }
                    if (b.name > a.name) {
                        return 1;
                    }
                    return 0;
                })
            return {
                ...state,
                videogames: gamesSorted
            }
        case ORDER_BY_RATING:
            let gamesSortedByRating = action.payload === 'rating-asc' ?
                state.videogames.sort(function (a, b) {
                    if (a.rating > b.rating) {
                        return 1;
                    }
                    if (b.rating > a.rating) {
                        return -1;
                    }
                    return 0;
                }) : state.videogames.sort(function (a, b) {
                    if (a.rating > b.rating) {
                        return -1;
                    }
                    if (b.rating > a.rating) {
                        return 1;
                    }
                    return 0;
                })
            return {
                ...state,
                videogames: gamesSortedByRating
            }
        default:
            return state;
    }

}

export default rootReducer;