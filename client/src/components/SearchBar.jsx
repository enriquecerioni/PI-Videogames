import { useState } from "react";
import { useDispatch } from "react-redux";
import { getVideogameByName } from "../redux/actions";

export default function SearchBar({setCurrentPage}){
    const dispatch = useDispatch();
    const [name, setName] = useState('');

    function handleInput(e){
        e.preventDefault();
        setName(e.target.value);
    }

    function handleSubmit(e){
        e.preventDefault();
        dispatch(getVideogameByName(name));
        setName('');
        setCurrentPage(1);
    }

    return (
        <div>
            <form onSubmit={e => handleSubmit(e)}>
                <input type="text" placeholder="Search Videogame..." value={name} onChange={e => handleInput(e)}/>
                <button type="submit">Search</button>
            </form>
        </div>
    )
}