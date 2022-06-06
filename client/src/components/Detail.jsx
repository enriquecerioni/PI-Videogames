import React, { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getVideogameDetail } from "../redux/actions";
import Loader from "./Loader";

export default function Detail(props){
    console.log(props);
    const dispatch = useDispatch();
    const {id} = useParams();

    useEffect(() => {
        dispatch(getVideogameDetail(id));
    }, [dispatch])

    const videogame = useSelector((state) => state.detail)

    return (
        <div>
            {
                videogame.hasOwnProperty("name") ?
                <div>
                    <h1>{videogame.name}</h1>
                    <img src={videogame.img ? videogame.img : videogame.image} alt="image not found" width="600px" height="600px"/>
                    <h4>Géneros: {videogame.genres.map(g => g.name + ', ')}</h4>
                    <p>{videogame.description}</p>
                    <p>Fecha de Lanzamiento: {videogame.releaseDate}</p>
                    <p>Rating: {videogame.rating}</p>
                    <p>Plataformas: {videogame.platforms.map(p => p + ', ')}</p>
                </div>
                : <Loader/>
            }
            <Link to="/home">
                <button>Volver</button>
            </Link>
        </div>
    )
}