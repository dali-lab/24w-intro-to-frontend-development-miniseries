import { useContext } from 'react';
import './App.css';

import TaskForm from './components/TaskForm';
import TaskList from './components/TaskList';
import { TaskContext } from './Root';

function App() {
  const { tasks, setTasks } = useContext(TaskContext);

  const addTask = (task) => {
    const newTask = { text: task, completed: false };
    setTasks((prevTasks) => [...prevTasks, newTask]);
  };

  const deleteTask = (index) => {
    setTasks((prevTasks) => prevTasks.filter((_, i) => i !== index));
  };

  const updateTask = (newTask, index) => {
    setTasks((prevTasks) => {
      return prevTasks.map((task, i) => (i === index ? { text: newTask, completed: false } : task));
    });
  };

  const toggleTask = (index) => {
    setTasks((prevTasks) =>
      prevTasks.map((task, i) =>
        i === index ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const swapTask = (index, newIndex) => {
    setTasks((prevTasks) => {
      const updatedTasks = [...prevTasks];
      updatedTasks.splice(index, 0, updatedTasks.splice(newIndex, 1)[0]);
      return updatedTasks;
    });
  }

  return (
    <div className="App">
      <h1>Simple To-Do List</h1>
      <TaskForm onSubmit={addTask} />
      <TaskList tasks={tasks} onDelete={deleteTask} onUpdate={updateTask} onToggle={toggleTask} swapTask={swapTask} />
    </div>
  );
}

export default App;