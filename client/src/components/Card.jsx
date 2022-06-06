import React from "react";
import styles from "./Card.module.css";

export default function Card({name, image, genre}){
    // const genres = genre.map(g =><p>{g.name}</p>);
    return (
        <div className={styles.card}>
            <img src={image} alt="img not found" className={styles.image}/>
            <h3>{name}</h3>
            <p>| {genre.map(g => g.name + ' | ')}</p>
        </div>
    )
}