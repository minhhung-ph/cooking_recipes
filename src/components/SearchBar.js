import { useNavigate } from "react-router-dom";
import { useState, useRef } from "react";
import './SearchBar.css';
const SearchBar = () => {
    const searchValue = useRef();
    const navigate = useNavigate();
    const [term, setTerm] = useState('');
    const handlerSubmit = (e) => {
        e.preventDefault();
        searchValue.current.value = '';
        navigate(`/search?q=${term}`);
    }
    return(
        <div>
            <form onSubmit={handlerSubmit} className='searchBar'>
                <label>
                    Tìm công thức:
                    <input type="text" onChange={(e)=>setTerm(e.target.value)} ref={searchValue}/>
                </label>
            </form>
        </div>
    )
}

export default SearchBar;