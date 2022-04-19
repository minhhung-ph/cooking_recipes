import {useState, useEffect} from 'react';
import {projectFirestore} from '../firebase/config';
const useFetch = (method='GET') => {
    const [data, setData] = useState(null);
    const [successLoad, setsuccessLoad] = useState(true);
    const [err, setErr] = useState(null);
    useEffect(()=>{
        const getData = () => {
            projectFirestore.collection('recipes').onSnapshot(snapshot => {
                if(snapshot.empty) {
                    setErr('No recipes to load!');
                    setsuccessLoad(false);
                } else {
                    const results = [];
                    snapshot.docs.forEach(doc => {
                        results.push({id: doc.id, ...doc.data()});
                    })
                    setData(results);
                }
            }, err => {
                setErr(err.message);
                setsuccessLoad(false);
            })
        }
        switch (method) {
            case 'GET':
                getData();
                break;
            default:
                break;
        }
        return () => getData();
    },[method]);
    return {data, err, successLoad};
}

export default useFetch;