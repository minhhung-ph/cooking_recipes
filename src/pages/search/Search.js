import { useLocation } from 'react-router-dom';
import useFetch from '../../hooks/useFetch';
import RecipeListQuery from '../../components/RecipeListQuery';
import { projectFirestore } from '../../firebase/config';
import { useEffect, useState } from 'react';
import RecipeList from '../../components/RecipeList';
import './Search.css';

function Search() {
    const [err,setErr] = useState(null);
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const queryString = useLocation().search;
    const query = new URLSearchParams(queryString).get('q');
    useEffect(() => {
        projectFirestore.collection('recipes').orderBy('createAt','asc').get().then(
            snapshot => {
                if(snapshot.empty)  {
                    setErr('could not fetch');
                    setLoading(false);
                } else {
                    const results = [];
                    snapshot.docs.forEach(
                        doc => {
                            const tempData = doc.data();
                            if(tempData.title.toLowerCase().includes(query)) {
                                results.push({id: doc.id, ...tempData});
                            };
                        }
                    );
                    if(results.length==0) {
                        setErr('Không tìm thấy công thức, hãy tìm công thức khác');
                        setLoading(false);
                        setData(null);
                    } else {
                        setData(results);
                        setErr(null);
                        setLoading(false);
                    }
                }
            }
        ).catch(err => {
            setErr('Không thể tải dữ liệu');
            setLoading(false);
        })
    },[query]);
    return(
        <>
            {loading && <div className='loading'><div><span></span><span></span><span></span><span></span></div>Loading...</div>}
            <div className='searchPage'>
                {err && <div>{err}</div>}
                {data && <RecipeList recipes={data}/>}
            </div>
        </>
    )
}

export default Search;