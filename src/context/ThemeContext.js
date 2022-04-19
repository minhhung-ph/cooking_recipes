import { createContext, useReducer } from 'react';

const ThemeContext = createContext();
const themeReducer = (state, action) => {
    switch(action.type) {
        case 'CHANGE_THEME':
            return {...state, themeStatus: action.payload.themeStatus, theme: action.payload};
        default:
            return state;
    }
}
const ThemeProvider = ({children}) => {
    const darkTheme = {
        fontColor: '#fff',
        backgroundColor: '#000',
        navBackground:'#333',
        recipeBackground:'#333',
        themeStatus:'darkTheme',
        h2FontColor: '#F3E6E3'
    };
    const lightTheme = {
        fontColor: '#333',
        backgroundColor: '#fff',
        navBackground:'rgb(40, 90, 240)', 
        recipeBackground:'#fff', 
        themeStatus:'lightTheme',
        h2FontColor: '#222120'
    };
    const [state, dispatch] = useReducer(themeReducer,{themeStatus:'lightTheme', theme:lightTheme});
    const changeTheme = () => {
        dispatch({type:'CHANGE_THEME', payload: state.themeStatus === 'lightTheme' ? darkTheme : lightTheme});
    }
    return (
        <ThemeContext.Provider value={{...state, changeTheme}}>
            {children}
        </ThemeContext.Provider>
    )
}

export {ThemeContext, ThemeProvider};