import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom";
import { projectAuth } from "../firebase/config";
import useAuth from "./useAuth";

const useLogin = () => {
    const [err, setErr] = useState(null),
        [loginLoading, setLoginLoading] = useState(false),
        [abort, setAbort] = useState(false),
        {dispatch} = useAuth(),
        navigate = useNavigate(),
        login = async(email, pass) => {
            setLoginLoading(true);
            try {
                const res = await projectAuth.signInWithEmailAndPassword(email, pass);
                if(!abort) {
                    dispatch({type:'LOGIN', payload:res.user});
                    return navigate('/');
                }
            } catch (error) {
                if(!abort){
                    setErr(error.message);
                    setLoginLoading(false);
                }
            }
        }
        useEffect(()=> {
            return () => setAbort(true);
        },[])
        return {err, loginLoading, login};
}

export default useLogin;