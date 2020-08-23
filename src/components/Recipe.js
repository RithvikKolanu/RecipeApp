import React from 'react';

const Recipe = (props) =>{
    const title = props.title;
    const image = props.image;
    const used = props.used;
    const unused = props.unused;
    return(
        <div>
            <img src={image}></img>
            <h1>{title}</h1>
        </div>
    );
}

export default Recipe;