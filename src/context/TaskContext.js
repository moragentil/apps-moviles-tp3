import React, { createContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const TaskContext = createContext();

export function TaskProvider({ children }) {
  const [tasks, setTasks] = useState([]);

  // Cargar tareas al iniciar
  useEffect(() => {
    AsyncStorage.getItem('tasks').then(data => {
      if (data) setTasks(JSON.parse(data));
    });
  }, []);

  // Guardar tareas cada vez que cambian
  useEffect(() => {
    AsyncStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  const addTask = (task) => setTasks(prev => [task, ...prev]);
  const updateTask = (updated) =>
    setTasks(prev => prev.map(t => t.id === updated.id ? updated : t));
  const deleteTask = (id) =>
    setTasks(prev => prev.filter(t => t.id !== id));

  return (
    <TaskContext.Provider value={{ tasks, addTask, updateTask, deleteTask }}>
      {children}
    </TaskContext.Provider>
  );
}
