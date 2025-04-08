import { useState } from "react";
import "./App.css"; // Import CSS for styling

export default function TodoApp() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");

  const addTask = () => {
    if (newTask.trim() !== "") {
      setTasks([...tasks, { text: newTask, completed: false }]);
      setNewTask("");
    }
  };

  const markDone = (index) => {
    setTasks((prevTasks) =>
      prevTasks.map((task, i) =>
        i === index ? { ...task, completed: true } : task
      )
    );
  };

  const deleteTask = (index) => {
    setTasks(tasks.filter((_, i) => i !== index));
  };

  return (
    <div className="container">
      <div className="todo-box">
        <h2>TODO List</h2>
        <div className="input-group">
          <input
            type="text"
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
            placeholder="Add a task..."
          />
          <button onClick={addTask} className="add-btn">ADD</button>
        </div>
        <ul className="task-list">
          {tasks.map((task, index) => (
            <li key={index} className="task-item">
              <span className={task.completed ? "completed" : ""}>{task.text}</span>
              {!task.completed && (
                <button onClick={() => markDone(index)} className="done-btn">Done</button>
              )}
              <button onClick={() => deleteTask(index)} className="delete-btn">Delete</button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}