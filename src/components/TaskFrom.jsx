import { useState } from 'react';

function TaskForm({ onAddTask }) {
  // Form inputlari uchun state
  const [description, setDescription] = useState('');
  const [deadline, setDeadline] = useState('');

  // Form submit bo'lganda
  const handleSubmit = (e) => {
    e.preventDefault();
    // Validatsiya (bonus)
    if (!description.trim()) {
      alert('Vazifa tavsifini kiriting!');
      return;
    }
    onAddTask({ description, deadline });
    setDescription('');
    setDeadline('');
  };

  return (
    <form onSubmit={handleSubmit} className="task-form">
      <input
        type="text"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Vazifa tavsifi"
      />
      <input
        type="date"
        value={deadline}
        onChange={(e) => setDeadline(e.target.value)}
      />
      <button type="submit">Qo‘shish</button>
    </form>
  );
}

export default TaskForm;