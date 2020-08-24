import React, { useState, useEffect } from 'react';
import Recipe from './components/Recipe.js';
//https://api.spoonacular.com/recipes/findByIngredients?ingredients=apple&number=2&apiKey=4934c99bf5024925b8c622925cde396d
//https://api.edamam.com/search?q=chicken&app_id=3eafab7e&app_key=6e13a47adb095d9a26957361406fd9d9

function App() {
  //variables
  const [form, setForm] = useState("");
  const [header, setHeader] = useState("");
  const [recipes, setRecipes] = useState([]);
  const lists = [];         
 
  //updating the search values
  const updateSearch = e =>{
    setForm(e.target.value);
    console.log(form);
  }
  //updating the final search value
  const updateHeader = e =>{
    e.preventDefault();
    setHeader(form);
    console.log(header);
  }
  //calling the recipes from the api
  useEffect(()=>{
    getRecipes();
  }, [])

  const getRecipes = async () =>{
    const response = await fetch(`https://api.spoonacular.com/recipes/findByIngredients?ingredients=chicken&number=6&apiKey=4934c99bf5024925b8c622925cde396d`);
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
      lists.push(<Recipe title={recipes[key].title} image={recipes[key].image} 
        used = {usedingredient.map(function(key, index){const container = []; container.push(usedingredient[index].name + ', '); return container})}
        unused = {unusedingredient.map(function(key, index){const container2 = []; container2.push(unusedingredient[index].name + ', '); return container2})}
        missed = {missedingredient.map(function(key, index){const container3 = []; container3.push(missedingredient[index].name + ', '); return container3})}
      />)
    }  
  )}

  return (
    <div className="App">
      <h1>Results for {header}</h1>
      <form className="searchForm" onSubmit={updateHeader}>
        <input className="searchField" type='text' value={form} onChange={updateSearch}></input>
        <button className="submitButton" type='submit'>Search</button>
      </form>
      <div>
        {formatting()}
        {lists}
      </div>
    </div>
  );
}

export default App;
