import { useState } from "react";
import api from "../api/axios";
import { Link } from "react-router-dom";

export default function Register() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "user"
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    await api.post("/auth/register", form);
    alert("Registered successfully");
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Register</h2>

      <input placeholder="Name" onChange={e=>setForm({...form,name:e.target.value})}/>
      <input placeholder="Email" onChange={e=>setForm({...form,email:e.target.value})}/>
      <input type="password" placeholder="Password"
        onChange={e=>setForm({...form,password:e.target.value})}/>


      <button>Register</button>

      <p style={{ marginTop: "12px", textAlign: "center" }}>
  Already have an account?{" "}
  <Link to="/login" style={{ color: "#3b82f6" }}>
    Login
  </Link>
</p>

    </form>
  );
}
