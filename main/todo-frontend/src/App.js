import React, { useState } from 'react';
import { Container, Typography, Paper } from '@mui/material';
import AddTodo from './AddTodo';
import TodoList from './TodoList';

function App() {
  const [todos, setTodos] = useState([
    // Example initial data
    // { id: 1, text: 'Sample Task', completed: false },
  ]);

  const handleAdd = (text) => {
    setTodos([...todos, { id: Date.now(), text, completed: false }]);
  };

  const handleToggle = (id) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const handleDelete = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const handleEdit = (id, newText) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, text: newText } : todo
      )
    );
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 6 }}>
      <Paper elevation={6} sx={{ p: 4, mb: 2 }}>
        <Typography variant="h4" align="center" gutterBottom>
          To-Do List
        </Typography>
        <AddTodo onAdd={handleAdd} />
        <TodoList
          todos={todos}
          onToggle={handleToggle}
          onDelete={handleDelete}
          onEdit={handleEdit}
        />
      </Paper>
    </Container>
  );
}

export default App;
