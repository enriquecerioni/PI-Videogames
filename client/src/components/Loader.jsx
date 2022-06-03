import React from "react";
import loader from '../assets/loader.gif';

export default function Loader(){
    return (
        <span>
            <img src={loader} alt="loader not found" />
        </span>
    )
}