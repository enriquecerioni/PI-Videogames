import React, { useEffect, useState } from "react";
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from "react-redux";
import { getGenres, postVideogame } from "../redux/actions";

function validateForm(input){
        let errors = {};
        if(!input.name){
            errors.name = "Ingresar un nombre para el Juego."
        }

        return errors;
}


export default function CreateGame(){
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const genres = useSelector((state) => state.genres);

    // Form Validate
    const [errors, setErrors] = useState({})

    const[input, setInput] = useState({
        name:"",
        description:"",
        releaseDate:"",
        rating: 0,
        platforms:[],
        genres:[]
    })

    function handleChange(e){
        setInput({
            ...input,
            [e.target.name]: e.target.value
        })
        setErrors(validateForm({
            ...input,
            [e.target.name]: e.target.value
        }));

        console.log(input)
    }

    function handleCheck(e){
        if(e.target.checked){
            setInput({
                ...input,
                platforms:[...input.platforms, e.target.value]
            })
        }
    }

    function handleSelect(e){
        setInput({
            ...input,
            genres: [...input.genres, e.target.value]
        })
    }

    function handleEmptySelect(e){
        setInput({
            ...input,
            genres: []
        })
    }

    function handleDelete(e){
        setInput({
            ...input,
            genres: input.genres.filter(genre => genre !== e)
        })
    }

    function handleSubmit(e){
        e.preventDefault();
        dispatch(postVideogame(input));
        alert("Videogame Created Succefull !!")
        setInput({
            name:"",
            description:"",
            releaseDate:"",
            rating: 0,
            platforms:[],
            genres:[]
        })
        navigate('/home');
    }

    useEffect(() => {
        dispatch(getGenres())
    }, [])

    return (
        <div>
            <Link to="/home">Volver</Link>
            <h1>Creá tu videojuego</h1>
            <form onSubmit={e => handleSubmit(e)}>
                <div>
                    <label>Name:</label>
                    <input type="text" value={input.name} name="name" onChange={e => handleChange(e)}/>
                    {
                        errors.name && (
                            <p>{errors.name}</p>
                        )
                    }
                </div>
                <div>
                    <label>Description:</label>
                    <input type="text" value={input.description} name="description" onChange={e => handleChange(e)}/>
                </div>
                <div>
                    <label>Released Date:</label>
                    <input type="date" value={input.releaseDate} name="releaseDate" onChange={e => handleChange(e)}/>
                </div>
                <div>
                    <label>Rating:</label>
                    <input type="number" value={input.rating} name="rating" onChange={e => handleChange(e)}/>
                </div>
                <div>
                    <label>Imagen:</label>
                    <input type="text" value={input.image} name="image" onChange={e => handleChange(e)}/>
                </div>
                <div>
                    <label>Platforms:</label>
                    <label>PC
                        <input type="checkbox" name="PC" value="PC" onChange={e => handleCheck(e)}/>
                    </label>
                    <label>PS4
                        <input type="checkbox" name="PS4" value="PS4" onChange={e => handleCheck(e)}/>
                    </label>
                    <label>XBOX ONE
                        <input type="checkbox" name="XBOX ONE" value="XBOX ONE" onChange={e => handleCheck(e)}/>
                    </label>
                </div>
                <div>
                    <label>Genres:</label>
                    <select onChange={e => handleSelect(e)}>
                        {
                            genres.map(g => {
                                return (
                                    <option value={g}>{g}</option>
                                )
                            })
                        }
                    </select>
                    <button type="button" onClick={e => handleEmptySelect(e)}>Empty Genres</button>
                    
                </div>
                {
                input.genres.map(g => 
                            <div>
                                <p>{g}</p>
                                <button type="button" onClick={() => handleDelete(g)}>x</button>
                            </div>
                        )
                }

                <button type="submit">CREAR</button>
            </form>
            
        </div>
    )
}
