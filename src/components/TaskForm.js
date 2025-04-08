import React, { useState, useEffect } from "react";
import { createTask, updateTask } from "../api/taskService";

const TaskForm = ({ selectedTask, onSave }) => {
  const [task, setTask] = useState({
    title: "",
    description: "",
    isCompleted: false,
    userId: "test-user",
  });

  useEffect(() => {
    if (selectedTask) setTask(selectedTask);
  }, [selectedTask]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setTask({ ...task, [name]: type === "checkbox" ? checked : value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    selectedTask ? await updateTask(task.id, task) : await createTask(task);
    onSave();
    setTask({
      title: "",
      description: "",
      isCompleted: false,
      userId: "test-user",
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <h2 className="text-2xl font-semibold text-gray-700 mb-4">
        {selectedTask ? "✏️ Edit Task" : "➕ Add New Task"}
      </h2>

      <input
        type="text"
        name="title"
        value={task.title}
        onChange={handleChange}
        placeholder="Task title"
        required
        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
      />

      <textarea
        name="description"
        value={task.description}
        onChange={handleChange}
        placeholder="Task description"
        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400"
      />

      <label className="flex items-center space-x-2 text-sm text-gray-600">
        <input
          type="checkbox"
          name="isCompleted"
          checked={task.isCompleted}
          onChange={handleChange}
          className="accent-blue-600"
        />
        <span>Mark as completed</span>
      </label>

      <button
        type="submit"
        className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition duration-200"
      >
        {selectedTask ? "Update Task" : "Create Task"}
      </button>
    </form>
  );
};

export default TaskForm;
