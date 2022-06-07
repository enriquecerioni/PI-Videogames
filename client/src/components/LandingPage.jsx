import React from "react";
import { Link } from "react-router-dom";

export default function LandingPage(){
    return(
        <div>
            <h1>Bienvenidos a Henry VideoGames</h1>
            <Link to="/home">
                <button class="button">Ingresar</button>
            </Link>
        </div>
    )
}