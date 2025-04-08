import React, { useEffect, useState } from "react";
import { fetchTasks, deleteTask } from "../api/taskService";

const TaskList = ({ onEdit }) => {
  const [tasks, setTasks] = useState([]);

  const loadTasks = async () => {
    const res = await fetchTasks();
    setTasks(res.data);
  };

  const handleDelete = async (id) => {
    await deleteTask(id);
    loadTasks();
  };

  useEffect(() => {
    loadTasks();
  }, []);

  return (
    <div>
      <h2 className="text-xl font-semibold text-gray-700 mb-4">📋 All Tasks</h2>

      {tasks.length === 0 && (
        <p className="text-gray-500 text-center italic">No tasks available.</p>
      )}

      <div className="space-y-4">
        {tasks.map((task) => (
          <div
            key={task.id}
            className="border border-gray-200 p-4 rounded-xl shadow-sm bg-gray-50"
          >
            <h3 className="text-lg font-medium text-gray-800">{task.title}</h3>
            <p className="text-gray-600 mt-1">{task.description}</p>
            <p className="mt-2 text-sm text-gray-500">
              Status:{" "}
              <span
                className={`font-medium ${
                  task.isCompleted ? "text-green-600" : "text-yellow-600"
                }`}
              >
                {task.isCompleted ? "✅ Completed" : "⏳ Pending"}
              </span>
            </p>
            <div className="mt-4 space-x-2">
              <button
                onClick={() => onEdit(task)}
                className="px-4 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(task.id)}
                className="px-4 py-1 bg-red-500 text-white rounded hover:bg-red-600"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TaskList;
