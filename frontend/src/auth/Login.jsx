// import { useState } from "react";
// import api from "../api/axios";
// import { useAuth } from "../context/AuthContext";
// import { useNavigate } from "react-router-dom";
// import { Link } from "react-router-dom";

// export default function Login() {
//   const { login } = useAuth();
//   const navigate = useNavigate();

//   const [form, setForm] = useState({
//     email: "",
//     password: ""
//   });

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     try {
//       const res = await api.post("/auth/login", form);

//       console.log("LOGIN RESPONSE:", res.data); // 🔴 IMPORTANT LOG

//       login(res.data);
//       navigate("/"); // 🔥 THIS WAS MISSING
//     } catch (err) {
//       console.error(err);
//       alert("Login failed");
//     }
//   };

//   return (
//     <form onSubmit={handleSubmit}>
//       <h2>Login</h2>
  
//       <input
//         placeholder="Email"
//         value={form.email}
//         onChange={(e) => setForm({ ...form, email: e.target.value })}
//       />
  
//       <input
//         type="password"
//         placeholder="Password"
//         value={form.password}
//         onChange={(e) => setForm({ ...form, password: e.target.value })}
//       />
  
//       <button type="submit">Login</button>
  
//       {/* 🔹 SIGNUP LINK */}
//       <p style={{ marginTop: "12px", textAlign: "center" }}>
//         Don’t have an account?{" "}
//         <Link to="/register" style={{ color: "#3b82f6" }}>
//           Sign up
//         </Link>
//       </p>
//     </form>
//   );
  
// }

import { useState } from "react";
import api from "../api/axios";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    password: "",
    loginAs: "user" // 👈 default
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await api.post("/auth/login", form);
      login(res.data);
      navigate("/");
    } catch (err) {
      alert(err.response?.data?.message || "Login failed");
    }
  };

//   return (
//     <div className="auth-container">
//       <form className="auth-card" onSubmit={handleSubmit}>
//         <h2>Login</h2>
  
//         <input
//           placeholder="Email"
//           value={form.email}
//           onChange={(e) =>
//             setForm({ ...form, email: e.target.value })
//           }
//         />
  
//         <input
//           type="password"
//           placeholder="Password"
//           value={form.password}
//           onChange={(e) =>
//             setForm({ ...form, password: e.target.value })
//           }
//         />
  
//         {/* ROLE SELECT */}
//         <div className="role-select">
//           <label className={form.loginAs === "user" ? "active" : ""}>
//             <input
//               type="radio"
//               name="loginAs"
//               value="user"
//               checked={form.loginAs === "user"}
//               onChange={(e) =>
//                 setForm({ ...form, loginAs: e.target.value })
//               }
//             />
//             Login as User
//           </label>
  
//           <label className={form.loginAs === "admin" ? "active" : ""}>
//             <input
//               type="radio"
//               name="loginAs"
//               value="admin"
//               checked={form.loginAs === "admin"}
//               onChange={(e) =>
//                 setForm({ ...form, loginAs: e.target.value })
//               }
//             />
//             Login as Admin
//           </label>
//         </div>
  
//         <button type="submit">Login</button>
  
//         <p className="auth-footer">
//           Don’t have an account? <Link to="/register">Sign up</Link>
//         </p>
//       </form>
//     </div>
//   );
return (
    <div className="auth-page">
      <div className="auth-box">
        <h2>Login</h2>
  
        <input
          placeholder="Email"
          value={form.email}
          onChange={(e) =>
            setForm({ ...form, email: e.target.value })
          }
        />
  
        <input
          type="password"
          placeholder="Password"
          value={form.password}
          onChange={(e) =>
            setForm({ ...form, password: e.target.value })
          }
        />
  
        <div className="role-select">
          <label className={form.loginAs === "user" ? "active" : ""}>
            <input
              type="radio"
              name="loginAs"
              value="user"
              checked={form.loginAs === "user"}
              onChange={(e) =>
                setForm({ ...form, loginAs: e.target.value })
              }
            />
            Login as User
          </label>
  
          <label className={form.loginAs === "admin" ? "active" : ""}>
            <input
              type="radio"
              name="loginAs"
              value="admin"
              checked={form.loginAs === "admin"}
              onChange={(e) =>
                setForm({ ...form, loginAs: e.target.value })
              }
            />
            Login as Admin
          </label>
        </div>
  
        <button onClick={handleSubmit}>Login</button>
  
        <p className="auth-footer">
          Don’t have an account? <Link to="/register">Sign up</Link>
        </p>
      </div>
    </div>
  );
  
  
}
