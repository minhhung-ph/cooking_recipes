import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { projectFirestore } from '../../firebase/config';
import useFetch from '../../hooks/useFetch';
import useTheme from '../../hooks/useTheme';
import useUpdate from '../../hooks/useUpdate';
import './Recipe.css';

function Recipe() {
    const {id} = useParams();
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [err, setErr] = useState(null);
    const {getUpdateData} = useUpdate();
    const {theme} = useTheme();
    const navigate = useNavigate();
    const updateData = () => {
        getUpdateData(data, id);
        navigate(`/update/${id}`);
    };
    useEffect(() => {
        if(id==='') {
            setErr('could not fetch data')
        } else {
            projectFirestore.collection('recipes').doc(id).get().then(doc => {
                if(doc.exists) {
                    const tempData = doc.data();
                    getUpdateData(tempData);
                    setData(tempData);
                    setLoading(false);
                } else {
                    setErr('could not fetch data');
                }
            })
        }
    },[]);
    return(
        <>
            {loading && <div className='loading'><div><span></span><span></span><span></span><span></span></div>Loading...</div>}
            <div className='recipe'>
                {err && <h1 className='error'>{err}</h1> }
                {data && (
                    <>
                        <h1>{data.title}</h1>
                        <h2>{data.cookingTime} thực hiện</h2>
                        <p>
                            {data.ingredients.join(', ')}
                        </p>
                        <p>{data.method}</p>
                        {id!='42CxYYvXbujhAtOfnwne'&&id!='APj8gjrTwLYZO0EHMzqp'&&id!='iBJuKi79Gk1uI7Q42IZv'&&<button className='updateBtn' onClick={updateData}>chỉnh sửa</button>}
                        {(id=='42CxYYvXbujhAtOfnwne'||id=='APj8gjrTwLYZO0EHMzqp'||id=='iBJuKi79Gk1uI7Q42IZv')&&<button className='updateBtn'>tạo công thức mới để dùng chức năng chỉnh sửa </button>}
                    </>
                )
                }
            </div>
        </>
    )
}

export default Recipe;