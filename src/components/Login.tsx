import { useState } from "react";
import { post_request } from "../services/Request";
import { useNavigate } from "react-router-dom";


function Login(){
    const [username, SetUsername] = useState('');
    const [password, SetPassword] = useState('');
    const navigate = useNavigate();

    const handleLogin = async()=>{
        try{
            const response = await post_request("/api/auth/login",{username,password})
            const {token,role} = response.data;
            localStorage.setItem('token',token);
            localStorage.setItem('role',role);
            alert('login success')
            if (role === 'Employee') {
                navigate('/request-access');
            } else if (role === 'Manager') {
                navigate('/pending-requests');
            } else if (role === 'Admin') {
                navigate('/create-software'); 
            } else {
                alert("Unknown role");
            }
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