import {Link} from 'react-router-dom';
import SearchBar from './SearchBar';
import useTheme from '../hooks/useTheme';
import './Navbar.css';
import useAuth from '../hooks/useAuth';
import { projectAuth } from '../firebase/config';

function Navbar() {
    const {theme,changeTheme} = useTheme(),
        {user} = useAuth(),
        {dispatch} = useAuth(),
        logOutHandler = () => {
            projectAuth.signOut();
            dispatch({type:'LOG_OUT'});
        }
    return(
        <div className='navbar' style={{backgroundColor: theme.navBackground}}>
            <nav>
                <Link to='/'>
                    <h1>CÔNG THỨC CHẾ BIẾN</h1>
                </Link>
                <SearchBar/>
                <Link to='/create'>
                    <h2>Tạo công thức</h2>
                </Link>
                <div className='auth'>
                    <a className='themeBtn' onClick={() => changeTheme()}><i className="fa-solid fa-circle-half-stroke"></i>Sáng/Tối</a>
                    {!user&&(<><Link className='logIn' to='/login'>Đăng nhập</Link><Link className='signUp' to='/signup'>Đăng ký</Link></>)}
                    {user&&<><a>Xin chào, {user.displayName}</a><a className='logOut' onClick={logOutHandler}>Đăng xuất</a></>}
                </div>
                <Link to='/create' className='recipeCreateBtn'><i className="fa-solid fa-plus"></i></Link>
            </nav>
        </div>
    )
}

export default Navbar;