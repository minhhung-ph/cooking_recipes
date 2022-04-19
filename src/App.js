import { BrowserRouter,Routes,Route, Navigate } from 'react-router-dom';
import Create from './pages/create/Create';
import Home from './pages/home/Home';
import Recipe from './pages/recipe/Recipe';
import Search from './pages/search/Search';
import Navbar from './components/Navbar';
import useTheme from './hooks/useTheme';
import {UpdateProvider} from './context/UpdateContext';
import Update from './pages/update/Update';
import Login from './pages/login/Login';
import useAuth from './hooks/useAuth';
import SignUp from './pages/signup/SignUp';
import './App.css';
import './components/Loading.css';
import './components/Responsive.css';
function App() {
  const {theme} = useTheme();
  const  {user} = useAuth();
  return (
    <div className='App' style={{backgroundColor: theme.backgroundColor, color: theme.fontColor}}>
      <BrowserRouter>
        <Navbar/>
        {user&&<Routes>
          <Route exact path='/' element={<Home/>}/>
          <Route path='/search' element={<Search/>}/>
          <Route path='/create' element={<Create/>}/>
          <Route path='/recipes/:id' element={
            <UpdateProvider>
              <Recipe/>
            </UpdateProvider>
          }/>
          <Route path='/update/:id' element={
            <UpdateProvider>
              <Update/>
            </UpdateProvider>
          }/>
          <Route path='*' element={
            <Navigate to='/' replace/>
          }/>
        </Routes>}
        {!user&&<Routes>
            <Route path='/signup' element={<SignUp/>}/>
            <Route path="*" element={<Navigate to='/login' replace/>}/>
            <Route path='/login' element={<Login/>}/>
          </Routes>}
      </BrowserRouter>
    </div>
  );
}

export default App;
