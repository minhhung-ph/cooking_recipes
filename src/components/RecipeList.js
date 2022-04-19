import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { projectFirestore } from '../firebase/config';
import useFetch from '../hooks/useFetch';
import useTheme from '../hooks/useTheme';
import './RecipeList.css';
const RecipeList = ({recipes}) => {
    const DeleteSingleRecipe = e => {
        e.preventDefault();
        projectFirestore.collection('recipes').doc(e.target.getAttribute('data-id')).delete();
    };
    const {theme} = useTheme();
    return(
        <div className='recipesList'>
            {recipes&&recipes.map(recipe => (
                <div key={recipe.id} className='recipeDetail' style={{backgroundColor: theme.recipeBackground}}>
                    <div className='recipeDetailContent'>
                        {recipe.id!='42CxYYvXbujhAtOfnwne'
                            &&recipe.id!='APj8gjrTwLYZO0EHMzqp'
                            &&recipe.id!='iBJuKi79Gk1uI7Q42IZv'
                            &&<span className='recipeDelete' data-id={recipe.id} onClick={DeleteSingleRecipe}>x</span>}
                        <h1>{recipe.title}</h1>
                        <h2 style={{color: theme.h2FontColor}}>{recipe.cookingTime} thực hiện</h2>
                        <h2 style={{color: theme.h2FontColor}}>Nguyên liệu: <span>{recipe.ingredients.join(', ')}</span></h2>
                        <h3 style={{color: theme.h2FontColor}}>Cách làm: <span>{recipe.method}</span></h3>
                    </div>
                    <Link to={`/recipes/${recipe.id}`} className='readmoreBtn'>Chi tiết</Link>
                </div>
            ))}
        </div>
    )
}

export default RecipeList;