import React, { useState, useEffect } from 'react';

function Recipeinfo({ match }){
    const [information, setInformation] = useState([]);
    
    useEffect(()=>{
        getRecipedata();
    }, []);

    const getRecipedata = async () =>{
        const response = await fetch(`https://api.spoonacular.com/recipes/${match.params.id}/information?apiKey=4934c99bf5024925b8c622925cde396d`);
        const infojson = await response.json();
        console.log(infojson);
        setInformation(infojson);
    }

    const ingredientslist = [];
    const ingredientslistformatting = () =>{
        if (information.extendedIngredients){
            Object.keys(information.extendedIngredients).map(function(keys, index){
                ingredientslist.push(<li>{information.extendedIngredients[index].original}</li>)
            })
        }
    }
    const recipesteps = [];
    const recipestepsformatting = () =>{
        if (information.instructions){
            if (information.analyzedInstructions){
                console.log(information.analyzedInstructions[0].steps[0])
                Object.keys(information.analyzedInstructions[0].steps).map(function(index, keys){
                    recipesteps.push(<li>{information.analyzedInstructions[0].steps[index].step}</li>);
                })
            } else{
                console.log('error')
            }
        }

    }
    return(
        <div>
            <h1>{information.title}</h1>
            <img src={information.image}/>
            <ul>
                <li>Vegetarian: {JSON.stringify(information.vegetarian)}</li>
                <li>Vegan: {JSON.stringify(information.vegan)}</li>
                <li>Gluten Free: {JSON.stringify(information.glutenFree)}</li>
                <li>Dairy Free: {JSON.stringify(information.dairyFree)}</li>
            </ul>
            <ul>
                <li>Prep Time: {JSON.stringify(information.preparationMinutes)} minutes</li>
                <li>Cook Time: {JSON.stringify(information.cookingMinutes)} minutes</li>
                <li>Servings: {JSON.stringify(information.servings)}</li>
            </ul>
            <ul>
                {ingredientslistformatting()}
                {ingredientslist}
            </ul>
            <ul>
                {recipestepsformatting()}
                {recipesteps}
            </ul>
        </div>
    );
}

export default Recipeinfo;