// src/components/TaskForm.js
import React, { useState, useEffect } from 'react';
import { db } from '../Firebase/config';
import { collection, addDoc, getDocs } from 'firebase/firestore'; // Modular imports

const TaskForm = ({ fetchTasks }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [status, setStatus] = useState('To Do');
  const [disableTodo, setDisableTodo] = useState(false);

  useEffect(() => {
    checkTodoLimit();
  }, []);

  const checkTodoLimit = async () => {
    const tasksCollectionRef = collection(db, 'tasks'); // Get reference to the 'tasks' collection
    const tasksSnapshot = await getDocs(tasksCollectionRef);
    const totalTasks = tasksSnapshot.size;
    const todoTasks = tasksSnapshot.docs.filter(doc => doc.data().status === 'To Do').length;

    setDisableTodo(todoTasks >= totalTasks * 0.5);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title) return alert('Task title is required!');

    try {
      const tasksCollectionRef = collection(db, 'tasks'); // Reference to 'tasks' collection
      await addDoc(tasksCollectionRef, { title, description, status });
      fetchTasks();
      setTitle('');
      setDescription('');
      setStatus('To Do');
    } catch (error) {
      console.error('Error adding task: ', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Task Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />
      <textarea
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <select
        value={status}
        onChange={(e) => setStatus(e.target.value)}
        disabled={disableTodo && status === 'To Do'}
      >
        <option value="To Do">To Do</option>
        <option value="In Progress">In Progress</option>
        <option value="Done">Done</option>
      </select>
      <button type="submit">Add Task</button>
    </form>
  );
};

export default TaskForm;
