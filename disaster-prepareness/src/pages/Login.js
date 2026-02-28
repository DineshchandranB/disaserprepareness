import { useNavigate } from "react-router-dom";
import { useState } from "react";
import "./Login.css";

export default function Login(){
  const nav = useNavigate();
  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    const user = {
      name: name || "Guest",
      email,
      location,
      role: "Student"
    };
    localStorage.setItem("user", JSON.stringify(user));
    nav("/dashboard");
  };

  return(
    <div className="card">
      <h2>Login</h2>

      <input placeholder="Name" value={name} onChange={e=>setName(e.target.value)}/>
      <input placeholder="City, State" value={location} onChange={e=>setLocation(e.target.value)}/>

      <input placeholder="Email" value={email} onChange={e=>setEmail(e.target.value)}/>
      <input placeholder="Password" type="password" value={password} onChange={e=>setPassword(e.target.value)}/>

      <button onClick={handleLogin}>Login</button>
    </div>
  );
}
