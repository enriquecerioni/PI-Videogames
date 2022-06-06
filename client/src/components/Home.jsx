import React, { Fragment } from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { filterVideogamesByGenre, filterVideogamesCreated, getGenres, getVideogames, orderByName, orderByRating } from "../redux/actions";
import { Link } from "react-router-dom";
import Card from "./Card";
import Paginate from "./Paginate";
import SearchBar from "./SearchBar";
import Loader from "./Loader";
import styles from "./Home.module.css";

export default function Home() {
    const dispatch = useDispatch();
    const allGames = useSelector((state) => state.videogames);
    const allGenres = useSelector((state) => state.genres);

    // Ordenamiento
    const [orden, setOrden] = useState('');
    // Paginado
    const [currentPage, setCurrentPage] = useState(1); // pagina inicial
    const [VideogamesPerPage, setVideogamesPerPage] = useState(15);// cantidad de videojuegos por pagina
    const indexLastVideogame = currentPage * VideogamesPerPage; // inicialmente será igual a 15
    const indexFirstVideogame = indexLastVideogame - VideogamesPerPage;// inicialmente será 0
    const currentVideogames = allGames.slice(indexFirstVideogame, indexLastVideogame);
    const videogamesShow = currentVideogames.map(g => 
                <Link to={"/home/" + g.id}>
                    <Card name={g.name} image={g.image} genre={g.genre} id={g.id} key={g.id}/>
                </Link>
    )
    // Loader
    const [loading, setLoading] = useState(true);

    const paginate = (pageNumber) => {
        setCurrentPage(pageNumber);
    }

    useEffect(async () => {
        await dispatch(getVideogames())
        setLoading(false);
    }, [])

    useEffect(() => {
        dispatch(getGenres())
    }, [])

    function handleClick(e) {
        e.preventDefault();
        dispatch(getVideogames());
    }

    function handleFilterGenre(e) {
        e.preventDefault();
        dispatch(filterVideogamesByGenre(e.target.value))
        setCurrentPage(1);
    }

    function handleFilterCreated(e) {
        e.preventDefault();
        dispatch(filterVideogamesCreated(e.target.value))
    }

    function handleSort(e) {
        e.preventDefault();
        dispatch(orderByName(e.target.value));
        setCurrentPage(1);
        setOrden(`Ordenado ${e.target.value}`)
    }

    function handleSortRating(e) {
        e.preventDefault();
        dispatch(orderByRating(e.target.value));
        setCurrentPage(1);
        setOrden(`Ordenado ${e.target.value}`)
    }

    return (
        <div>
            <Link to="/videogame">Crear Juego</Link>
            <h1>HENRY GAMES</h1>
            <button onClick={e => { handleClick(e) }}>
                Recargar Todos los Juegos
            </button>
            <div>
                <select onChange={e => handleSort(e)}>
                    <option>Order By Name</option>
                    <option value="asc">ASC</option>
                    <option value="desc">DESC</option>
                </select>

                <select onChange={e => handleSortRating(e)}>
                    <option>Order By Rating</option>
                    <option value="rating-asc">ASC</option>
                    <option value="rating-desc">DESC</option>
                </select>

                <select onChange={e => handleFilterCreated(e)}>
                    <option>Filter By</option>
                    <option value="All">All</option>
                    <option value="created">Created</option>
                    <option value="api">Existing</option>
                </select>

                <select onChange={e => handleFilterGenre(e)}>
                    <option>Filter By Genre</option>
                    <option value="All">All</option>
                    {
                        allGenres && allGenres.map(genre => {
                            return (
                                <option value={genre}>{genre}</option>
                            )
                        })
                    }
                </select>

                <Paginate
                    VideogamesPerPage={VideogamesPerPage}
                    allVideogames={allGames.length}
                    paginate={paginate}
                />

                <SearchBar setCurrentPage={setCurrentPage}/>
                {
                    loading ? (
                        <Loader />
                    ) : (
                        <div className={styles.cards}>
                            {videogamesShow}
                        </div>
                    
                    )
                }
            </div>
        </div>
    )
}