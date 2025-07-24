import React, { useEffect, useState } from 'react';
import './todo.css';
import TodoCards from './TodoCards';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';

const id = sessionStorage.getItem("id");

const Todo = () => {
  const [inputs, setInputs] = useState({ title: '', body: '' });
  const [todos, setTodos] = useState([]);
  const [editIndex, setEditIndex] = useState(null);
  const [editingId,  setEditingId] = useState(null);
  const [showTextarea, setShowTextarea] = useState(false);


  
  const fetchTasks = async () => {
    if (!id) return;
    try {
      const response = await axios.get(`http://localhost:1000/api/v2/getTasks/${id}`);
      setTodos(response.data.list);
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  };

  
  useEffect(() => {
    fetchTasks();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInputs({ ...inputs, [name]: value });
  };

  const handleSubmit = async () => {
  if (!inputs.title.trim() || !inputs.body.trim()) {
    toast.error('Title and Description cannot be empty!');
    return;
  }

  if (editingId) {
    // Update Task
    try {
      const response = await axios.put(`http://localhost:1000/api/v2/updateTask/${editingId}`, {
        title: inputs.title,
        body: inputs.body,
      });

      if (response.status === 200) {
        toast.success('Task updated!');
        setInputs({ title: '', body: '' });
        setEditingId(null);
        setShowTextarea(false);
        fetchTasks();
      }
    } catch (error) {
      console.error("Error updating task:", error);
      toast.error("Error updating task!");
    }
  } else {
    // Add Task
    if (id) {
      try {
        const response = await axios.post(`http://localhost:1000/api/v2/addTask`, {
          title: inputs.title,
          body: inputs.body,
          id: id,
        });

        if (response.status === 200) {
          toast.success('Task added!');
          setInputs({ title: '', body: '' });
          setShowTextarea(false);
          fetchTasks();
        }
      } catch (error) {
        console.error("Error adding task:", error);
        toast.error("Error adding task!");
      }
    } else {
      // No ID - offline fallback
      setTodos([...todos, inputs]);
      toast.success('Task added (not saved to DB)!');
      setInputs({ title: '', body: '' });
      setShowTextarea(false);
    }
  }
};


  

 const handleDelete = async (taskId) => {
  try {
    await axios.delete(`http://localhost:1000/api/v2/deleteTask/${taskId}`);
    const updatedTodos = todos.filter((todo) => todo._id !== taskId);
    setTodos(updatedTodos);
    toast.warn('Task deleted!');
  } catch (error) {
    console.error("Delete failed:", error);
    toast.error("Failed to delete task");
  }
};

 const handleUpdate = (taskId) => {
  const task = todos.find((todo) => todo._id === taskId);
  if (task) {
    setInputs({ title: task.title, body: task.body });
    setEditingId(taskId);
    setShowTextarea(true);
  }
};



  return (
    <div className="main">
      <div className="todo-wrapper">
        <ToastContainer />
        <div className="todo-container">
          <h2 className="title">📝 My Todo List</h2>
          <div className="todo-inputs-box">
            <input
              type="text"
              placeholder="Enter Title"
              name="title"
              value={inputs.title}
              onClick={() => setShowTextarea(true)}
              onChange={handleChange}
              className="todo-input"
            />
            {showTextarea && (
              <textarea
                placeholder="Enter Description"
                name="body"
                value={inputs.body}
                onChange={handleChange}
                className="todo-textarea"
              />
            )}
            <button className="todo-button" onClick={handleSubmit}>
             {editingId ? '✏️ Update Task' : '➕ Add Task'}
            </button>
          </div>
        </div>
        <div className="todo-cards-wrapper">
          {todos.map((todo, index) => (
            <TodoCards
              key={index}
              title={todo.title}
              description={todo.body}
              onDelete={() => todo._id && handleDelete(todo._id)}
              onUpdate={() => handleUpdate(todo._id)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Todo;
