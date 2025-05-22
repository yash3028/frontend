import { useState } from "react";
import { post_request } from "../services/Request";

function Login(){
    const [username, SetUsername] = useState('');
    const [password, SetPassword] = useState('');
    const handleLogin = async()=>{
        try{
            const response = await post_request("/api/auth/login",{username,password})
            localStorage.setItem('token',response.data.token);
            alert('login success')
        }catch{
            alert('login failed')
        }
    }

    return (
        <div>
            <h2>Login</h2>
             <input placeholder="Username" onChange={e => SetUsername(e.target.value)} />
            <input placeholder="Password" type="password" onChange={e => SetPassword(e.target.value)} />
            <button onClick={handleLogin}>Login</button>
        </div>
    );
}

export default Login