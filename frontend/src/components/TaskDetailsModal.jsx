export default function TaskDetailsModal({ task, onClose }) {
    if (!task) return null; // ✅ SAFETY CHECK
  
    return (
      <div className="modal" onClick={onClose}>
        <div
          className="modal-content"
          onClick={(e) => e.stopPropagation()}
        >
          <h2>{task.title}</h2>
          <p><b>Description:</b> {task.description}</p>
          <p><b>Status:</b> {task.status}</p>
          <p><b>Priority:</b> {task.priority}</p>
  
          <button onClick={onClose}>Close</button>
        </div>
      </div>
    );
  }
  