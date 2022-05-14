import './Home.css';
import RecipeList from '../../components/RecipeList';
import {useState, useEffect, useRef} from 'react';
import {projectFirestore} from '../../firebase/config';
function Home() {
    const [data, setData] = useState([]);
    const [results, setResults] = useState([]);
    const [successLoad, setsuccessLoad] = useState(false);
    const [err, setErr] = useState(null);
    const [index, setIndex] = useState(0);
    const [load, setLoad] = useState(true);
    const handleScroll = (e) => {
        if(e.target.scrollTop + e.target.clientHeight > listRef.current.scrollHeight) {
            console.log("scrollTop",e.target.scrollTop);
            console.log("scrollTop",listRef.current.scrollHeight);
            console.log("offset",listRef.current.offsetTop);
            setLoad(true);
        }
    }
    const listRef = useRef();
    useEffect(()=>{
        const unsub = projectFirestore.collection('recipes').orderBy('createAt','asc').onSnapshot(snapshot => {
                        if(snapshot.empty) {
                            setErr('No recipes to load!');
                            setsuccessLoad(false);
                        } else {
                            const result = [];
                            snapshot.docs.forEach(doc => {
                                result.push({id: doc.id, ...doc.data()});
                            })
                            setResults(result);
                            setsuccessLoad(true);
                        }
                    }, err => {
                        setErr(err.message);
                        setsuccessLoad(false);
                    });
                    return () => {
                        unsub();
                    };
    },[]);
    useEffect(()=>{
        if(results.length) {
            let perLoad = 8;
            let pages = results.length%perLoad===0 ? results.length/perLoad : Math.floor(results.length/perLoad) + 1;
            if(index<pages && load) {
                let start = index*perLoad;
                let end = start+perLoad;
                console.log(start,end)
                let recipes = results.slice(start,end);
                console.log(recipes);
                setIndex(index+1);
                setData([...data,...recipes]);
                setLoad(false);
            }
        }
    },[results, load]);
    useEffect(()=>{
        window.addEventListener('scroll', handleScroll,true);
        return () => {
            document.removeEventListener('scroll',handleScroll,true);
        }
    },[listRef]);
    return (
        <>
        {!successLoad && <div className='loading'><div><span></span><span></span><span></span><span></span></div>Loading...</div>}
        <div className='main' ref={listRef}>
            {err && <div>Không thể tải dữ liệu</div>}
            {data && <RecipeList recipes={data}/>}
        </div>
        </>
    )
}

export default Home;