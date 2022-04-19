import { useState, useRef, useEffect } from 'react';
import useFetch from '../../hooks/useFetch';
import { projectFirestore } from '../../firebase/config';
import useUpdate from '../../hooks/useUpdate';
import {UpdateProvider} from '../../context/UpdateContext';
import './Update.css';
function Update(){
    const [recipeData, setRecipeData] = useState({title:'',ingredients:[],method:'',cookingTime:0}),
        [updateState, setUpdateState] = useState(null),
        [loading, setLoading] = useState(false),
        [err, setErr] = useState(false),
        ingredient = useRef(),
        formReset = useRef(),
        {dataUpdate} = useUpdate();

    const updateData = (e,title) => {
        e.preventDefault();
        if(title==='ingredients') {
            if(!recipeData.ingredients.includes(e.target.previousElementSibling.value)) {
                setRecipeData({...recipeData, ingredients:[...recipeData.ingredients, e.target.previousElementSibling.value]});
            }
            ingredient.current.value = '';
            ingredient.current.focus();
        } else if(title === 'cookingTime') {
            const cookingTime = e.target.value.split(' ');
            if(cookingTime.length>1){
                setRecipeData({...recipeData, cookingTime: `${cookingTime[0]} phút`});
            }
        } else {
            setRecipeData({...recipeData, [title]:e.target.value});
        }
    }

    const submitHandler = async (e) => {
        e.preventDefault();
        try {
            setLoading(true);
            await projectFirestore.collection('recipes').doc(recipeData.id).update({...recipeData});
            setUpdateState('Thành công');
            setLoading(false);
        } catch (error) {
            setUpdateState('Lỗi, hãy thử lại');
        }
    }
    useEffect(()=>{
        setRecipeData(dataUpdate);
        const recipeCreateBtn = document.querySelector('.navbar a.recipeCreateBtn');
        recipeCreateBtn.style.visibility = 'hidden';
        return (() => {
                recipeCreateBtn.style.visibility = 'visible'
            });
    },[]);
    useEffect(()=>{
        const toast = document.querySelector('.createNotification'),
            toastProgress = document.querySelector('.createNotification .progressBar');
        if(updateState) {
            toast.classList.add('active');
            toastProgress.classList.add('active');
            setTimeout(()=>{
                toast.classList.remove('active');
                toastProgress.classList.remove('active');
                setUpdateState(null);
            },2000);
        }
        return(()=>{
            toast.classList.remove('active');
            toastProgress.classList.remove('active');
        })
    },[updateState])

    const deleteToast = (e) => {
        e.preventDefault();
        e.target.parentNode.classList.remove('active');
        e.target.nexElementSibling.classList.remove('active');
        setUpdateState(null);
    }

    const deleteIngredient = (e) => {
        console.log(e.target.parentNode.getAttribute('name'));
        const newIngredients = recipeData.ingredients.filter(ingredient => ingredient!=e.target.parentNode.getAttribute('name'));
        setRecipeData(prev => {
            return {...prev, ingredients:[...newIngredients]};
        });
    }
    console.log(dataUpdate);
    return (
            <>
                {loading && <div className='loading'><div><span></span><span></span><span></span><span></span></div>Loading...</div>}
                <div className='recipeCreate'>
                    {!recipeData && <div className='err'>could not fetch data</div>}
                    {recipeData &&
                    <>
                        <h1>Chỉnh sửa công thức</h1>
                        <form onSubmit = {submitHandler} className="recipeForm" ref={formReset}>
                            <label>
                                <span>Tên công thức:</span>
                                <input type="text" onChange={(e)=>updateData(e,"title")} value={recipeData.title} required/>
                            </label>
                            <label>
                                <span>Nguyên liệu:</span>
                                <input type="text" ref={ingredient}/>
                                <button onClick={(e)=>updateData(e,"ingredients")}>add</button>
                            </label>
                            <div className='recipeUpdateList'>
                                nguyên liệu hiện tại:
                                <ul>
                                    {recipeData.ingredients.map(
                                        ingredient => <li key={ingredient} name={ingredient}>{ingredient} <span onClick={deleteIngredient}>x</span></li>
                                    )}
                                </ul>
                            </div>
                            <label>
                                <span>Thời gian thực hiện (phút):</span>
                                <input type="text" onChange={(e)=>updateData(e,"cookingTime")} value={recipeData.cookingTime} required/>
                            </label>
                            <label>
                                <span>Cách làm:</span>
                                <textarea name="" id="" cols="30" rows="10" onChange={(e)=>updateData(e,"method")} value={recipeData.method} required/>
                            </label>
                            <input type="submit" value="Cập nhật"/>
                        </form>
                        <div className='createNotification'>
                            {updateState}
                            <span className='toastRemove' onClick={deleteToast}>x</span>
                            <div className='progressBar'></div>
                        </div>
                    </>}
                </div>
            </>
    )
}

export default Update;