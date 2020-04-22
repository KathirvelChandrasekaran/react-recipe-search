import React, { useEffect, useState } from "react";
import "./App.css";
import Recipe from "./recipe";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";

function App() {
  const APP_ID = "460ffbc3";
  const APP_KEY = "1cd902d0952d715b2c3bcf73caa94385";

  const [recipes, setRecipes] = useState([]);
  const [search, setSearch] = useState("");
  const [query, setQuery] = useState("chicken");
  useEffect(() => {
    getRecipes();
  }, [query]);

  const getRecipes = async () => {
    const response = await fetch(
      `https://api.edamam.com/search?q=${query}&app_id=${APP_ID}&app_key=${APP_KEY}`
    );
    const data = await response.json();
    console.log(data.hits);
    
    setRecipes(data.hits);
  };

  const updateSearch = (e) => {
    setSearch(e.target.value);
    // console.log(search);
  };

  const getSearch = (e) => {
    e.preventDefault();
    setQuery(search);
    setSearch("");
  };
  return (
    <div className="App">
      <Typography align="center" variant="h4" gutterBottom>
        Search the recipe
      </Typography>
      <div className="form">
        <form onSubmit={getSearch} className="form" className="search-form">
          <TextField
          id="outlined-secondary"
            type="text"
            className="search-bar"
            value={search}
            onChange={updateSearch}
            label="Search"
            variant="outlined"
          />
          <div className="search-button">
            <Button type="submit" className="search-button" variant="contained" color="secondary">
              Search
            </Button>
          </div>
        </form>
      </div>

      <div className="recipe">
        {recipes.map((recipe) => (
          <Recipe
            key={recipe.recipe.label}
            title={recipe.recipe.label}
            calories={recipe.recipe.calories}
            image={recipe.recipe.image}
            ingredients={recipe.recipe.ingredients}
          ></Recipe>
        ))}
      </div>
    </div>
  );
}

export default App;
