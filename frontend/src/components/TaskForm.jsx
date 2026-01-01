// import { useEffect, useState } from "react";

// export default function TaskForm({ task, onSubmit }) {
//   const [form, setForm] = useState({
//     title: "",
//     description: "",
//     status: "todo",
//     priority: "low"
//   });

//   useEffect(() => {
//     if (task) setForm(task);
//   }, [task]);

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     onSubmit(form);
//   };

//   return (
//     <div className="modal">
//     <form onSubmit={handleSubmit}>
//       <input
//         value={form.title}
//         onChange={(e) => setForm({ ...form, title: e.target.value })}
//         placeholder="Title"
//       />

//       <textarea
//         value={form.description}
//         onChange={(e) => setForm({ ...form, description: e.target.value })}
//         placeholder="Description"
//       />

//       <select
//         value={form.status}
//         onChange={(e) => setForm({ ...form, status: e.target.value })}
//       >
//         <option value="todo">Todo</option>
//         <option value="in_progress">In Progress</option>
//         <option value="done">Done</option>
//       </select>

//       <select
//         value={form.priority}
//         onChange={(e) => setForm({ ...form, priority: e.target.value })}
//       >
//         <option value="low">Low</option>
//         <option value="medium">Medium</option>
//         <option value="high">High</option>
//       </select>

//       <button type="submit">Save</button>
//     </form>
//     </div>
//   );
// }

export default function TaskForm({ form, setForm, onSubmit, onClose }) {
    return (
      <div className="modal-overlay" onClick={onClose}>
        <div
          className="modal"
          onClick={(e) => e.stopPropagation()}
        >
          {/* HEADER */}
          <div className="modal-header">
            <h3>{form.id ? "Update Task" : "Create Task"}</h3>
            <button className="close-btn" onClick={onClose}>
              ✕
            </button>
          </div>
  
          {/* BODY */}
          <form className="modal-body" onSubmit={onSubmit}>
            <input
              placeholder="Title"
              value={form.title}
              onChange={(e) =>
                setForm({ ...form, title: e.target.value })
              }
              required
            />
  
            <textarea
              placeholder="Description"
              value={form.description}
              onChange={(e) =>
                setForm({ ...form, description: e.target.value })
              }
            />
  
            <select
              value={form.status}
              onChange={(e) =>
                setForm({ ...form, status: e.target.value })
              }
            >
              <option value="todo">Todo</option>
              <option value="in_progress">In Progress</option>
              <option value="done">Done</option>
            </select>
  
            <select
              value={form.priority}
              onChange={(e) =>
                setForm({ ...form, priority: e.target.value })
              }
            >
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
  
            <button type="submit">
  {form.id ? "Update Task" : "Create Task"}
</button>

          </form>
        </div>
      </div>
    );
  }
  


  