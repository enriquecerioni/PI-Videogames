import React from "react";

export default function Card({name, image, genre}){
    // const genres = genre.map(g =><p>{g.name}</p>);
    return (
        <div>
            <img src={image} alt="img not found" width="250px" height="250px"/>
            <h3>{name}</h3>
            <p>| {genre.map(g => g.name + ' | ')}</p>
        </div>
    )
}