import { useState, useRef, useEffect } from 'react';
import './Create.css';
import useFetch from '../../hooks/useFetch';
import { projectFirestore, timestamp } from '../../firebase/config';
import useAuth from '../../hooks/useAuth';
function Create(){
    const [recipeData, setRecipeData] = useState({title:'',ingredients:[],method:'',cookingTime:0});
    const [data, setData] = useState(null);
    const [err, setErr] = useState(null);
    const [loading, setLoading] = useState(false);
    const ingredient = useRef();
    const formReset = useRef();
    const {user} = useAuth();
    const toast = document.querySelector('.createNotification'),
                  toastProgress = document.querySelector('.createNotification .progressBar');
    const updateData = (e,title) => {
        e.preventDefault();
        if(title==='ingredients') {
            if(!recipeData.ingredients.includes(e.target.previousElementSibling.value)) {
                setRecipeData({...recipeData, ingredients:[...recipeData.ingredients, e.target.previousElementSibling.value]});
            }
            ingredient.current.value = '';
            ingredient.current.focus();
        } else if(title === 'cookingTime') {
            setRecipeData({...recipeData, cookingTime: `${e.target.value} phút`});
        } else {
            setRecipeData({...recipeData, [title]:e.target.value});
        }
    }
    const submitHandler = async (e) => {
        e.preventDefault();
        const createAt = timestamp.fromDate(new Date());
        const uid = user.uid;
        try {
            setLoading(true);
            await projectFirestore.collection('recipes').add({...recipeData, createAt, uid});
            setLoading(false);
            setData('success');
        } catch (error) {
            setErr('Lỗi, hãy thử lại');
            setLoading(false);
        }
    }
    useEffect(()=>{
        if(data) {
            toast.classList.add('active');
            toastProgress.classList.add('active');
            setTimeout(()=>{
                toast.classList.remove('active');
                toastProgress.classList.remove('active');
                setData(null);
            },2000);
        };
        return(()=>{setLoading(false)});
    },[data])
    useEffect(()=>{
        const recipeCreateBtn = document.querySelector('.navbar a.recipeCreateBtn');
        recipeCreateBtn.style.visibility = 'hidden';
        return (() => {
            recipeCreateBtn.style.visibility = 'visible'
        });
    },[])
    const deleteToast = (e) => {
        e.preventDefault();
        e.target.parentNode.classList.remove('active');
        e.target.nexElementSibling.classList.remove('active');
        setData(null);
    }
    return (
        <>
            {loading && <div className='loading'><div><span></span><span></span><span></span><span></span></div>Loading...</div>}
            {!loading&&<div className='recipeCreate'>
                <h1>Tạo công thức</h1>
                <form onSubmit = {submitHandler} className="recipeForm">
                    <label>
                        <span>Tên món:</span>
                        <input type="text" onChange={(e)=>updateData(e,"title")} required/>
                    </label>
                    <label>
                        <span>Nguyên liệu:</span>
                        <input type="text" ref={ingredient}/>
                        <button onClick={(e)=>updateData(e,"ingredients")}>add</button>
                    </label>
                    <div>nguyên liệu hiện tại: {recipeData.ingredients.join(', ')}</div>
                    <label>
                        <span>Thời gian thực hiện (phút):</span>
                        <input type="number" onChange={(e)=>updateData(e,"cookingTime")} required/>
                    </label>
                    <label>
                        <span>Cách làm:</span>
                        <textarea name="" id="" cols="30" rows="10" onChange={(e)=>updateData(e,"method")} required/>
                    </label>
                    <input type="submit" value="Tạo" />
                </form>
                <div className='createNotification'>
                    Thành công
                    <span className='toastRemove' onClick={deleteToast}>x</span>
                    <div className='progressBar'></div>
                </div>
            </div>}
        </>
    )
}

export default Create;