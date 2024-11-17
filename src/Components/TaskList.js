// src/components/TaskList.js
import React from 'react';
import { db } from '../Firebase/config';
import {doc, updateDoc, deleteDoc } from 'firebase/firestore'; // Modular imports

const TaskList = ({ tasks, fetchTasks }) => {
  const updateTaskStatus = async (id, newStatus) => {
    try {
      const taskDocRef = doc(db, 'tasks', id); // Reference to specific document
      await updateDoc(taskDocRef, { status: newStatus });
      fetchTasks();
    } catch (error) {
      console.error('Error updating task status: ', error);
    }
  };

  const deleteTask = async (id) => {
    try {
      const taskDocRef = doc(db, 'tasks', id); // Reference to specific document
      await deleteDoc(taskDocRef);
      fetchTasks();
    } catch (error) {
      console.error('Error deleting task: ', error);
    }
  };

  return (
    <ul>
      {tasks.map((task) => (
        <li key={task.id}>
          <h3>{task.title}</h3>
          <p>{task.description}</p>
          <select
            value={task.status}
            onChange={(e) => updateTaskStatus(task.id, e.target.value)}
          >
            <option value="To Do">To Do</option>
            <option value="In Progress">In Progress</option>
            <option value="Done">Done</option>
          </select>
          <button onClick={() => deleteTask(task.id)}>Delete</button>
        </li>
      ))}
    </ul>
  );
};

export default TaskList;
