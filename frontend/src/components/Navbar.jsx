// import { useAuth } from "../context/AuthContext";
// import { Link } from "react-router-dom";

// export default function Navbar({ onCreate }) {
//   const { user, logout } = useAuth();

//   return (
//     <nav className="navbar">
//       <div className="nav-left">
//         <h3>Task Manager</h3>
//       </div>

//       <div className="nav-right">
//         <button onClick={onCreate}>Create Task</button>
//         {user?.role === "admin" && <Link to="/users">Users</Link>}
//         <button className="logout" onClick={logout}>Logout</button>
//       </div>
//     </nav>
//   );
// }

import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Navbar({ onCreate }) {
  const { user, logout } = useAuth();

  return (
    <nav className="navbar">
      <div className="nav-left">
        {/* 🔹 HOME LINK */}
        <Link to="/" className="nav-logo">
          Task Manager
        </Link>
      </div>

      <div className="nav-right">
        {/* 🔹 HOME BUTTON */}
        <Link to="/" className="nav-link">
          Home
        </Link>

        <button type="button" onClick={onCreate}>
  Create Task
</button>


        {user?.role === "admin" && (
          <Link to="/users" className="nav-link">
            Users
          </Link>
        )}

        <button className="logout" onClick={logout}>
          Logout
        </button>
      </div>
    </nav>
  );
}
