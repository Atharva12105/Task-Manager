// import { useEffect, useState } from "react";
// import api from "../api/axios";
// import { useAuth } from "../context/AuthContext";
// import TaskCard from "../components/TaskCard";
// import TaskDetailsModal from "../components/TaskDetailsModal";

// export default function Dashboard({ onEdit }) {
//   const { user } = useAuth();
//   const [tasks, setTasks] = useState([]);
//   const [selectedTask, setSelectedTask] = useState(null); // ✅ IMPORTANT

//   useEffect(() => {
//     api.get("/tasks").then(res => setTasks(res.data));
//   }, []);

//   const handleDelete = async (id) => {
//     await api.delete(`/tasks/${id}`);
//     setTasks(tasks.filter(t => t.id !== id));
//   };

//   return (
//     <>
//       <div className="dashboard">
//         {tasks.map(task => (
//           <TaskCard
//             key={task.id}
//             task={task}
//             canEdit={user.role === "admin" || task.user_id === user.id}
//             onEdit={onEdit}
//             onDelete={handleDelete}
//             onView={setSelectedTask}   // ✅ THIS
//           />
//         ))}
//       </div>

//       {/* ✅ MODAL ONLY WHEN selectedTask EXISTS */}
//       {selectedTask && (
//         <TaskDetailsModal
//           task={selectedTask}
//           onClose={() => setSelectedTask(null)}
//         />
//       )}
//     </>
//   );
// }

import { useEffect, useState } from "react";
import api from "../api/axios";
import Navbar from "../components/Navbar";
import TaskCard from "../components/TaskCard";
import TaskForm from "../components/TaskForm";
import { useAuth } from "../context/AuthContext";

export default function Dashboard() {
  const { user } = useAuth();
  const [selectedTask, setSelectedTask] = useState(null);


  /* ---------- SAFE EMPTY FORM ---------- */
  const emptyForm = {
    title: "",
    description: "",
    status: "todo",
    priority: "low",
  };

  /* ---------- STATE ---------- */
  const [tasks, setTasks] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState(emptyForm);

  /* ---------- FETCH TASKS ---------- */
  const fetchTasks = async () => {
    const res = await api.get("/tasks");
    setTasks(res.data);
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  /* ---------- CREATE / UPDATE ---------- */
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (form.id) {
      await api.put(`/tasks/${form.id}`, form);
    } else {
      await api.post("/tasks", form);
    }

    setShowForm(false);
    setForm(emptyForm);
    fetchTasks();
  };

  /* ---------- OPEN CREATE ---------- */
  const handleCreate = () => {
    setForm(emptyForm);     // 🔥 prevents undefined crash
    setShowForm(true);
  };

  /* ---------- OPEN EDIT ---------- */
  const handleEdit = (task) => {
    setForm({
      id: task.id,
      title: task.title || "",
      description: task.description || "",
      status: task.status || "todo",
      priority: task.priority || "low",
    });
    setShowForm(true);
  };

  /* ---------- DELETE ---------- */
  const handleDelete = async (id) => {
    if (!window.confirm("Delete this task?")) return;
    await api.delete(`/tasks/${id}`);
    fetchTasks();
  };

  return (
    <>
      <Navbar onCreate={handleCreate} />

      {/* ---------- DASHBOARD GRID ---------- */}
      <div className="dashboard">
        {tasks.map((task) => (
          <TaskCard
          key={task.id}
          task={task}
          canEdit={user.role === "admin" || task.user_id === user.id}
          onEdit={handleEdit}
          onDelete={handleDelete}
          onView={setSelectedTask}   // 🔥 ADD THIS LINE
        />
        
        ))}
      </div>

      {/* ---------- MODAL ---------- */}
      {showForm && (
        <TaskForm
          form={form}
          setForm={setForm}
          onSubmit={handleSubmit}
          onClose={() => {
            setShowForm(false);
            setForm(emptyForm);
          }}
          
        />
        
      )}
      {selectedTask && (
  <div
    className="modal-overlay"
    onClick={() => setSelectedTask(null)}
  >
    <div
      className="modal"
      onClick={(e) => e.stopPropagation()}
    >
      <div className="modal-header">
        <h3>{selectedTask.title}</h3>
        <button
          className="close-btn"
          onClick={() => setSelectedTask(null)}
        >
          ✕
        </button>
      </div>

      <div className="modal-body">
        <p>{selectedTask.description}</p>
        <p><strong>Status:</strong> {selectedTask.status}</p>
        <p><strong>Priority:</strong> {selectedTask.priority}</p>
      </div>
    </div>
  </div>
)}

    </>
  );
}
