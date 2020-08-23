import React, { useState, useEffect } from 'react';
import Recipe from './components/Recipe.js';
//https://api.spoonacular.com/recipes/findByIngredients?ingredients=apple&number=2&apiKey=4934c99bf5024925b8c622925cde396d
//https://api.edamam.com/search?q=chicken&app_id=3eafab7e&app_key=6e13a47adb095d9a26957361406fd9d9

function App() {
  //variables
  const [form, setForm] = useState("");
  const [header, setHeader] = useState("");
  const [recipes, setRecipes] = useState(0);
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
    const response = await fetch(`https://api.spoonacular.com/recipes/findByIngredients?ingredients=chicken&number=5&apiKey=4934c99bf5024925b8c622925cde396d`);
    const recipedata = await response.json();
    console.log(recipedata);
    setRecipes(recipedata);
  }
    const formatting = () =>{
    Object.keys(recipes).map(function(key, index)
    {
        lists.push(<Recipe title={recipes[key].title} image={recipes[key].image} />)
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
