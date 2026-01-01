// export default function TaskCard({ task, canEdit, onEdit, onDelete }) {
//     return (
//       <div className="card">
//         <h4>{task.title}</h4>
//         <p>{task.description}</p>
  
//         <span className={`badge ${task.status}`}>
//           {task.status}
//         </span>
  
//         {canEdit && (
//           <div className="actions">
//             <button className="edit" onClick={() => onEdit(task)}>
//               Edit
//             </button>
//             <button className="delete" onClick={() => onDelete(task.id)}>
//               Delete
//             </button>
//           </div>
//         )}
//       </div>
//     );
//   }
  
// export default function TaskCard({ task, canEdit, onEdit, onDelete, onView }) {
//     return (
//       <div className={`card priority-${task.priority}`} onClick={() => onView(task)}>
//         <h4>{task.title}</h4>
//         <p>{task.description.slice(0, 60)}...</p>
  
//         <span className={`badge ${task.status}`}>{task.status}</span>
  
//         {canEdit && (
//           <div className="actions" onClick={(e) => e.stopPropagation()}>
//             <button className="edit" type="button" onClick={() => onEdit(task)}>
//   Edit
// </button>

// <button className="delete" type="button" onClick={() => onDelete(task.id)}>
//   Delete
// </button>

//           </div>
//         )}
//       </div>
//     );
//   }
  
export default function TaskCard({
  task,
  canEdit,
  onEdit,
  onDelete,
  onView,
}) {
  return (
    <div
      className={`card priority-${task.priority}`}
      onClick={() => onView(task)}   // 🔥 THIS WAS MISSING
    >
      <h4>{task.title || "..."}</h4>
      <p>{task.description || "..."}</p>

      <span className={`badge ${task.status}`}>
        {task.status}
      </span>

      {canEdit && (
        <div
          className="actions"
          onClick={(e) => e.stopPropagation()} // 🔥 prevent conflict
        >
          <button
            type="button"
            className="edit"
            onClick={() => onEdit(task)}
          >
            Edit
          </button>

          <button
            type="button"
            className="delete"
            onClick={() => onDelete(task.id)}
          >
            Delete
          </button>
        </div>
      )}
    </div>
  );
}

  