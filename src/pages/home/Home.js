import './Home.css';
import RecipeList from '../../components/RecipeList';
import {useState, useEffect} from 'react';
import {projectFirestore} from '../../firebase/config';
import useAuth from '../../hooks/useAuth';
function Home() {
    const [data, setData] = useState(null);
    const [successLoad, setsuccessLoad] = useState(false);
    const [err, setErr] = useState(null);
    const {user} = useAuth();
    useEffect(()=>{
        const unsub = projectFirestore.collection('recipes').orderBy('createAt','asc').onSnapshot(snapshot => {
                        if(snapshot.empty) {
                            setErr('No recipes to load!');
                            setsuccessLoad(false);
                        } else {
                            const results = [];
                            snapshot.docs.forEach(doc => {
                                results.push({id: doc.id, ...doc.data()});
                            })
                            setData(results);
                            setsuccessLoad(true);
                        }
                    }, err => {
                        setErr(err.message);
                        setsuccessLoad(false);
                    });
                    return () => unsub();
    },[]);
    return (
        <>
        {!successLoad && <div className='loading'><div><span></span><span></span><span></span><span></span></div>Loading...</div>}
        <div className='main'>
            {err && <div>Không thể tải dữ liệu</div>}
            {data && <RecipeList recipes={data}/>}
        </div>
        </>
    )
}

export default Home;