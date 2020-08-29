import React from 'react';
import { Link } from 'react-router-dom';

const Recipe = (props) =>{
    const title = props.title;
    const image = props.image;
    const used = props.used;
    const unused = props.unused;
    const missed = props.missed;
    const id = props.id;

    return(
        <div>
            <img src={image}></img>
            <h1>{title}</h1>
            <h4>{id}</h4>
            <p>Ingredients used: {used}</p>
            <p>Ingredients unused: {unused}</p>
            <p>Ingredients you are missing: {missed}</p>
        </div>
    );
}

export default Recipe;