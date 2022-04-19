import { createContext, useReducer } from "react";

const UpdateContext = createContext();
const updateReducer = (state, action) => {
    switch(action.type) {
        case 'SET_DATA':
            return {...state, dataUpdate: {...action.payload.data, id: action.payload.id}};
        default:
            return state;
    }
}
const UpdateProvider = ({children}) => {
    const [state, dispatch] = useReducer(updateReducer,{});
    const getUpdateData = (data, id) => {
        dispatch({type:'SET_DATA', payload: {data, id}});
    }
    return(
        <UpdateContext.Provider value={{...state, getUpdateData}}>
            {children}
        </UpdateContext.Provider>
    )
}

export {UpdateContext, UpdateProvider}