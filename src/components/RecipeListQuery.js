import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import useFetch from '../hooks/useFetch';
import './RecipeList.css';
const RecipeListQuery = ({data}) => {
    if(data.length===0) {
        return <div className='error'>No recipes found...</div>
    }
    return(
        <div className='recipesList'>
            {data&&Object.keys(data).length!==0&&data.map(recipe => (
                <div key={recipe.id} className='recipeDetail'>
                    {console.log('render')}
                    <h1>{recipe.title}</h1>
                    <h2>{recipe.cookingTime} to make</h2>
                    <h2>Ingredients: <span>{recipe.ingredients.join(', ')}</span></h2>
                    <h3>Method: <span>{recipe.method}</span></h3>
                    <Link to={`/recipes/${recipe.id}`} className='readmoreBtn'>Read more</Link>
                </div>
            ))}
        </div>
    )
}

export default RecipeListQuery;