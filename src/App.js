// src/App.js
import React, { useState, useEffect } from 'react';
import TaskForm from './Components/TaskForm';
import TaskList from './Components/TaskList';
import FilterDropdown from './Components/FilterDropdown';
import { db } from './Firebase/config';
import { collection, getDocs } from 'firebase/firestore'; // Modular imports
import './App.css';

const App = () => {
  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState('All');

  const fetchTasks = async () => {
    try {
      const tasksCollectionRef = collection(db, 'tasks'); // Reference to 'tasks' collection
      const tasksSnapshot = await getDocs(tasksCollectionRef);
      setTasks(
        tasksSnapshot.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }))
      );
    } catch (error) {
      console.error('Error fetching tasks: ', error);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const filteredTasks =
    filter === 'All'
      ? tasks
      : tasks.filter((task) => task.status === filter);

  return (
    <div>
      <h1>Task Manager</h1>
      <TaskForm fetchTasks={fetchTasks} />
      <FilterDropdown setFilter={setFilter} />
      <TaskList tasks={filteredTasks} fetchTasks={fetchTasks} />
    </div>
  );
};

export default App;

