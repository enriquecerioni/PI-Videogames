import React from "react";

export default function Paginate({VideogamesPerPage, allVideogames, paginate}){
    const pageNumbers = [];

    for(let i = 1; i <= Math.ceil(allVideogames/VideogamesPerPage); i++){
        pageNumbers.push(i);
    }

    return (
        <nav>
            <ul>
                { pageNumbers && pageNumbers.map(number => (
                    <li key={number}>
                        <a onClick={() => paginate(number)}>{number}</a>
                    </li>
                    ))}
            </ul>
        </nav>
    )
}