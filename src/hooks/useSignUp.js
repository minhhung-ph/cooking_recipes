import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom";
import { projectAuth } from "../firebase/config";
import useAuth from "./useAuth";

const useSignUp = () => {
    const [err, setErr] = useState(null),
        [signupLoading, setSignupLoading] = useState(false),
        [abort, setAbort] = useState(false),
        {dispatch} = useAuth(),
        navigate = useNavigate(),
        signup = async(email, pass, displayName) => {
            setSignupLoading(true);
            try {
                const res = await projectAuth.createUserWithEmailAndPassword(email,pass);
                await res.user.updateProfile({displayName});
                if(!abort) {
                    dispatch({type:'SIGN_UP', payload:res.user});
                    return navigate('/');
                }
            } catch (error) {
                if(!abort){
                    setErr(error.message);
                    setSignupLoading(false);
                }
            }
        }
        useEffect(()=> {
            return () => setAbort(true);
        },[])
        return {err, signupLoading, signup};
}

export default useSignUp;