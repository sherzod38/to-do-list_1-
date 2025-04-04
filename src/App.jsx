import { useState, useEffect } from 'react';
import TaskForm from './components/TaskFrom';
import TaskList from './components/TaskList';
import './App.css';

function App() {
  // Vazifalar ro'yxatini saqlash uchun state
  const [tasks, setTasks] = useState([]);

  // localStorage dan ma'lumotlarni yuklash
  useEffect(() => {
    const storedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
    setTasks(storedTasks);
  }, []);

  // Tasks o'zgarganda localStorage ga saqlash
  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  // Yangi vazifa qo'shish
  const onAddTask = (newTask) => {
    setTasks([...tasks, { ...newTask, id: Date.now(), completed: false }]);
  };

  // Vazifani bajarilgan deb belgilash
  const onToggleComplete = (taskId) => {
    setTasks(tasks.map(task =>
      task.id === taskId ? { ...task, completed: !task.completed } : task
    ));
  };

  // Vazifani o'chirish
  const onDeleteTask = (taskId) => {
    setTasks(tasks.filter(task => task.id !== taskId));
  };

  // Vazifani tahrirlash
  const onEditTask = (taskId, updatedTask) => {
    setTasks(tasks.map(task =>
      task.id === taskId ? { ...task, ...updatedTask } : task
    ));
  };

  return (
    <div className="app">
      <h1>To-Do List</h1>
      <TaskForm onAddTask={onAddTask} />
      <TaskList 
        tasks={tasks} 
        onToggleComplete={onToggleComplete} 
        onDeleteTask={onDeleteTask} 
        onEditTask={onEditTask} 
      />
    </div>
  );
}

export default App;