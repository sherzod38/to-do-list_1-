import { useState } from 'react';

function TaskList({ tasks, onToggleComplete, onDeleteTask, onEditTask }) {
  // Tahrirlash holati uchun state (bonus)
  const [editingTaskId, setEditingTaskId] = useState(null);
  const [editDescription, setEditDescription] = useState('');
  const [editDeadline, setEditDeadline] = useState('');

  // Tahrirlashni boshlash
  const startEditing = (task) => {
    setEditingTaskId(task.id);
    setEditDescription(task.description);
    setEditDeadline(task.deadline);
  };

  // Tahrirni saqlash
  const saveEdit = (taskId) => {
    if (!editDescription.trim()) {
      alert('Vazifa bo‘sh bo‘lmasligi kerak!');
      return;
    }
    onEditTask(taskId, { description: editDescription, deadline: editDeadline });
    setEditingTaskId(null);
  };

  return (
    <div className="task-list">
      {tasks.map(task => (
        <div key={task.id} className={`task-item ${task.completed ? 'completed' : ''}`}>
          {editingTaskId === task.id ? (
            <>
              <input
                type="text"
                value={editDescription}
                onChange={(e) => setEditDescription(e.target.value)}
              />
              <input
                type="date"
                value={editDeadline}
                onChange={(e) => setEditDeadline(e.target.value)}
              />
              <button onClick={() => saveEdit(task.id)}>Saqlash</button>
              <button onClick={() => setEditingTaskId(null)}>Bekor</button>
            </>
          ) : (
            <>
              <input
                type="checkbox"
                checked={task.completed}
                onChange={() => onToggleComplete(task.id)}
              />
              <span style={{ textDecoration: task.completed ? 'line-through' : 'none' }}>
                {task.description}
              </span>
              <span className="deadline">{task.deadline}</span>
              <button onClick={() => startEditing(task)}>Tahrirlash</button>
              <button onClick={() => onDeleteTask(task.id)}>O‘chirish</button>
            </>
          )}
        </div>
      ))}
    </div>
  );
}

export default TaskList;