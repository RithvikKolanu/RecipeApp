import React, { useState, useEffect } from 'react';
import Recipe from './Recipe';
import { Link } from 'react-router-dom';

function Home() {
    //variables
    const [search, setSearch] = useState("");
    const [result, setResult] = useState("");
    const [recipes, setRecipes] = useState([]);
    const lists = [];         
    const [quantity, setQuantity] = useState(6);

    //updating the search values
    const updateSearch = e =>{
        setSearch(e.target.value);
        console.log(search);
    }
    //updating the final search value
    const updateResult = e =>{
        e.preventDefault();
        setResult(search);
        console.log(result);
    }

    //calling the recipe function everytime the search query is updated
    useEffect(()=>{
        getRecipes();
    }, [result, quantity])

    //calling recipe data from api
    const getRecipes = async () =>{
        const response = await fetch(`https://api.spoonacular.com/recipes/findByIngredients?ingredients=${result}&number=${quantity}&ranking=2&apiKey=4934c99bf5024925b8c622925cde396d`);
        const recipedata = await response.json();
        console.log(recipedata);
        setRecipes(recipedata);
    }
    //formatting the data into recipe component
    const formatting = () =>{
        Object.keys(recipes).map(function(key, index)
        {
            const usedingredient = recipes[key].usedIngredients
            const unusedingredient = recipes[key].unusedIngredients
            const missedingredient = recipes[key].missedIngredients
            lists.push(
                <Link to={`/recipe/${recipes[key].id}`}>
                    <Recipe 
                    id={recipes[key].id}
                    title={recipes[key].title} 
                    image={recipes[key].image} 
                    used = {usedingredient.map(function(key, index){const container = []; container.push(usedingredient[index].name + ', '); return container})}
                    unused = {unusedingredient.map(function(key, index){const container2 = []; container2.push(unusedingredient[index].name + ', '); return container2})}
                    missed = {missedingredient.map(function(key, index){const container3 = []; container3.push(missedingredient[index].name + ', '); return container3})}
                    />
                </Link>
            )
        }  
    )}

    const changeQuantity = e =>{
    e.preventDefault(); 
    setQuantity(quantity + 6)
    }

    formatting();

    return (
    <div className="App">
        <h1>Results for {result}</h1>
        <form className="searchForm" onSubmit={updateResult}>
            <input className="searchField" type='text' value={search} onChange={updateSearch}></input>
            <button className="submitButton" type='submit'>Search</button>
        </form>
        <div>
            {lists}
        </div>
        <form className = "loadmoreform" onSubmit={changeQuantity}>
            <button className="loadmore" type="submit">Load more</button>
        </form>
    </div>
    );
}

export default Home;
