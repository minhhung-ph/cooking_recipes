import { useState, useEffect } from "react"
import './Signup.css';
import useSignup from "../../hooks/useSignUp";
const SignUp = () => {
    const [email, setEmail] = useState(''),
        [password, setPassword] = useState(''),
        [displayName, setDisplayName] = useState(''),
        {err, loginLoading, signup} = useSignup();
    const submitHandler = (e) => {
        e.preventDefault();
        signup(email, password, displayName);
    };
    useEffect(()=>{
        const recipeCreateBtn = document.querySelector('.navbar a.recipeCreateBtn');
        recipeCreateBtn.style.visibility = 'hidden';
        return (() => {
            recipeCreateBtn.style.visibility = 'visible'
        });
    },[])
    return (
            <div className="signUpPage">
                <h1>Đăng ký</h1>
                <form onSubmit = {submitHandler} className="signUpForm">
                    <label>
                        <div>Email</div>
                        <input type="text" onChange={(e) => setEmail(e.target.value)} required/>
                    </label>
                    <label>
                        <div>Tên hiển thị</div>
                        <input type="text" onChange={(e) => setDisplayName(e.target.value)} required/>
                    </label>
                    <label>
                        <div>Mật khẩu</div>
                        <input type="password" onChange={(e) => setPassword(e.target.value)} required/>
                    </label>
                    {!loginLoading && <input type="submit" value="Đăng ký" />}
                    {loginLoading && <input type="submit" disabled value="Đang tải"/>}
                </form>
                {err && <div style={{marginTop:'20px', color:'red'}}>{err}</div>}
            </div>
    )
}
export default SignUp;