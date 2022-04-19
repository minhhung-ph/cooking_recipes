import { useState, useEffect } from "react"
import './Login.css';
import useLogin from "../../hooks/useLogin";
const Login = () => {
    const [email, setEmail] = useState(''),
        [password, setPassword] = useState(''),
        {err, loginLoading, login} = useLogin();
    const submitHandler = (e) => {
        e.preventDefault();
        login(email, password);
    }
    useEffect(()=>{
        const recipeCreateBtn = document.querySelector('.navbar a.recipeCreateBtn');
        recipeCreateBtn.style.visibility = 'hidden';
        return (() => {
            recipeCreateBtn.style.visibility = 'visible'
        });
    },[])
    return (
            <div className="loginPage">
                <h1>Đăng nhập</h1>
                <p>email và pass mặc định: admin@gmail.com 123456</p>
                <form onSubmit = {submitHandler} className="loginForm">
                    <label>
                        <div>Email</div>
                        <input type="text" onChange={(e) => setEmail(e.target.value)} required/>
                    </label>
                    <label>
                        <div>Mật khẩu</div>
                        <input type="password" onChange={(e) => setPassword(e.target.value)} required/>
                    </label>
                    {!loginLoading && <input type="submit" value="Đăng nhập" />}
                    {loginLoading && <input type="submit" disabled value="Đang tải"/>}
                </form>
                {err && <div style={{marginTop:'20px', color:'red'}}>{err}</div>}
            </div>
    )
}
export default Login;