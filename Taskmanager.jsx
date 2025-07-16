import React, { useState } from "react";

const TaskManager = () => {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");
  const [filter, setFilter] = useState("all");

  const addTask = () => {
    if (!title.trim()) return;
    const newTask = {
      id: Date.now(),
      title: title.trim(),
      completed: false,
    };
    setTasks([...tasks, newTask]);
    setTitle("");
  };

  const toggleComplete = (id) => {
    setTasks(tasks.map(task =>
      task.id === id ? { ...task, completed: !task.completed } : task
    ));
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  const filteredTasks = tasks.filter(task => {
    if (filter === "active") return !task.completed;
    if (filter === "completed") return task.completed;
    return true;
  });

  return (
    <div className="max-w-xl mx-auto mt-10 p-6 bg-white rounded-2xl shadow-lg">
      <h1 className="text-2xl font-bold mb-4 text-center">📝 Task Manager</h1>
      
      <div className="flex mb-4">
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Enter task title..."
          className="flex-grow p-2 border border-gray-300 rounded-l-lg focus:outline-none"
        />
        <button
          onClick={addTask}
          className="bg-blue-600 text-white px-4 py-2 rounded-r-lg hover:bg-blue-700"
        >
          Add
        </button>
      </div>

      <div className="flex justify-center gap-3 mb-4">
        <button onClick={() => setFilter("all")} className={`px-3 py-1 rounded ${filter === "all" ? "bg-blue-200" : "bg-gray-200"}`}>All</button>
        <button onClick={() => setFilter("active")} className={`px-3 py-1 rounded ${filter === "active" ? "bg-blue-200" : "bg-gray-200"}`}>Active</button>
        <button onClick={() => setFilter("completed")} className={`px-3 py-1 rounded ${filter === "completed" ? "bg-blue-200" : "bg-gray-200"}`}>Completed</button>
      </div>

      <ul className="space-y-2">
        {filteredTasks.map(task => (
          <li key={task.id} className="flex justify-between items-center bg-gray-100 p-2 rounded-xl">
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={task.completed}
                onChange={() => toggleComplete(task.id)}
              />
              <span className={task.completed ? "line-through text-gray-500" : ""}>
                {task.title}
              </span>
            </div>
            <button
              onClick={() => deleteTask(task.id)}
              className="text-red-500 hover:text-red-700 font-bold"
            >
              ✖
            </button>
          </li>
        ))}
        {filteredTasks.length === 0 && (
          <li className="text-center text-gray-400">No tasks to show.</li>
        )}
      </ul>
    </div>
  );
};

export default TaskManager;
