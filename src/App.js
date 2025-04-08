import React, { useState } from "react";
import TaskForm from "./components/TaskForm";
import TaskList from "./components/TaskList";

function App() {
  const [selectedTask, setSelectedTask] = useState(null);
  const [refreshList, setRefreshList] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  const handleSave = () => {
    setSelectedTask(null);
    setRefreshList(!refreshList);
  };

  const handleEdit = (task) => {
    setSelectedTask(task);
  };

  return (
    <div
      className={`${
        darkMode
          ? "bg-gray-900 text-white"
          : "bg-gradient-to-br from-blue-100 to-purple-100 text-gray-900"
      } min-h-screen transition duration-300`}
    >
      <div className="flex justify-end px-6 pt-6">
        <button
          onClick={() => setDarkMode(!darkMode)}
          className={`px-4 py-2 rounded-full text-sm font-medium ${
            darkMode ? "bg-white text-gray-800" : "bg-gray-800 text-white"
          } hover:opacity-80 transition`}
        >
          {darkMode ? "☀️ Light Mode" : "🌙 Dark Mode"}
        </button>
      </div>

      <div className="flex items-center justify-center px-4 py-6">
        <div
          className={`w-full max-w-3xl p-8 rounded-2xl shadow-2xl ${
            darkMode ? "bg-gray-800" : "bg-white"
          }`}
        >
          <h1 className="text-4xl font-bold text-center mb-10">
            📝 Task Manager
          </h1>

          <TaskForm selectedTask={selectedTask} onSave={handleSave} />
          <hr className="my-8 border-gray-400" />
          <TaskList onEdit={handleEdit} key={refreshList} />
        </div>
      </div>
    </div>
  );
}

export default App;
