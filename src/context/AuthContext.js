import { createContext, useEffect, useReducer } from "react";
import { projectAuth } from "../firebase/config";

const AuthContext = createContext();
const authReducer = (state, action) => {
    switch(action.type) {
        case 'LOGIN':
            return {...state, user: action.payload};
        case 'USER_IS_LOGIN':
            return {...state, user: action.payload};
        case 'LOG_OUT':
            return {...state, user: null};
        case 'SIGN_UP':
            return {...state, user: action.payload};
        default:
            return state;
    }
}
const AuthContextProvider = ({children}) => {
    const [state, dispatch] = useReducer(authReducer,{user:null});
    useEffect(()=>{
        projectAuth.onAuthStateChanged(user => {
            dispatch({type:'USER_IS_LOGIN',payload: user});
        })
    },[]);
    return (
        <AuthContext.Provider value={{...state, dispatch}}>
            {children}
        </AuthContext.Provider>
    )
}
export {AuthContext, AuthContextProvider};