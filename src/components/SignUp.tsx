import { useState } from "react";
import { post_request } from "../services/Request";

function SignUp(){
    const [username,SetUsername] = useState('');
    const [password,SetPassword] = useState('');
    const [role, SetRole] = useState('Employee');
    const handleSign = async()=>{
        try{
        const response = await post_request("/api/auth/signup",{username,password});
        alert('user registered');
    } catch {
        alert('sign up failed');
    }
}

        return (
             <div>
      <h2>SignUp</h2>

      <input
        placeholder="Username"
        onChange={e => SetUsername(e.target.value)}
      />

      <input
        placeholder="Password"
        type="password"
        onChange={e => SetPassword(e.target.value)}
      />

      <select onChange={e => SetRole(e.target.value)} value={role}>
        <option value="Employee">Employee</option>
        <option value="Manager">Manager</option>
        <option value="Admin">Admin</option>
      </select>

      <button onClick={handleSign}>Sign Up</button>
    </div>
        );
}

export default SignUp;