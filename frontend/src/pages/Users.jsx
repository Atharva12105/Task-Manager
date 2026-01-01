import { useEffect, useState } from "react";
import api from "../api/axios";

// export default function Users() {
//   const [users, setUsers] = useState([]);

//   useEffect(() => {
//     api.get("/admin/users").then(res => setUsers(res.data));
//   }, []);

//   const deleteUser = async (id) => {
//     await api.delete(`/admin/users/${id}`);
//     setUsers(users.filter(u => u.id !== id));
//   };

//   return (
//     <div>
//       {users.map(u => (
//         <div key={u.id}>
//           <span>{u.email}</span>
//           <button onClick={()=>deleteUser(u.id)}>Delete</button>
//         </div>
//       ))}
//     </div>
//   );
// }

export default function Users() {
    const [users, setUsers] = useState([]);
  
    useEffect(() => {
      api.get("/admin/users").then((res) => setUsers(res.data));
    }, []);
  
    const handleDelete = async (id) => {
      if (!window.confirm("Are you sure you want to delete this user?")) return;
      await api.delete(`/admin/users/${id}`);
      setUsers(users.filter((u) => u.id !== id));
    };
  
    return (
      <div className="users-page">
        <h2>All Users</h2>
  
        <table className="users-table">
          <thead>
            <tr>
              <th>Email</th>
              <th>Role</th>
              <th>Action</th>
            </tr>
          </thead>
  
          <tbody>
            {users.map((user) => (
              <tr key={user.id}>
                <td>{user.email}</td>
                <td>
                  <span className={`role ${user.role}`}>
                    {user.role}
                  </span>
                </td>
                <td>
  {user.role !== "admin" ? (
    <button
      className="delete-user"
      onClick={() => handleDelete(user.id)}
    >
      Delete
    </button>
  ) : (
    <span style={{ color: "#9ca3af", fontSize: "13px" }}>
      Protected
    </span>
  )}
</td>

              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
  