import { useState } from "react";
import "./Signup.css";
import { useNavigate } from "react-router-dom";

export default function Signup(){
  const nav = useNavigate();

  const [user,setUser]=useState({
    name:"",
    email:"",
    location:"",
    role:"Student"
  });

  const handleSignup=()=>{
    localStorage.setItem("user",JSON.stringify(user));
    nav("/login");
  };

  return(
    <div className="card">
      <h2>Signup</h2>

      <input placeholder="Name"
        onChange={e=>setUser({...user,name:e.target.value})}/>

      <input placeholder="Email"
        onChange={e=>setUser({...user,email:e.target.value})}/>

      <select onChange={e=>setUser({...user,role:e.target.value})}>
        <option>Student</option>
        <option>Teacher</option>
        <option>Admin</option>
      </select>

      <input placeholder="City, State"
        onChange={e=>setUser({...user,location:e.target.value})}/>

      <button onClick={handleSignup}>Signup</button>

      <p onClick={()=>nav("/login")}>Already account? Login</p>
    </div>
  );
}
