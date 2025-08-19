import React, { useState, useEffect } from 'react';
import { Container, Typography, Paper, Button, Box, CircularProgress } from '@mui/material';
import { AuthProvider, useAuth } from './AuthContext';
import { todoAPI } from './api';
import AddTodo from './AddTodo';
import TodoList from './TodoList';
import Login from './Login';

function TodoApp() {
  const { user, logout, loading } = useAuth();
  const [todos, setTodos] = useState([]);
  const [loadingTodos, setLoadingTodos] = useState(false);

  useEffect(() => {
    if (user) {
      loadTodos();
    }
  }, [user]);

  const loadTodos = async () => {
    setLoadingTodos(true);
    try {
      const data = await todoAPI.getTodos();
      setTodos(data);
    } catch (error) {
      console.error('Failed to load todos:', error);
    } finally {
      setLoadingTodos(false);
    }
  };

  const handleAdd = async (text) => {
    try {
      const newTodo = await todoAPI.createTodo(text);
      setTodos([...todos, newTodo]);
    } catch (error) {
      console.error('Failed to add todo:', error);
    }
  };

  const handleToggle = async (id) => {
    try {
      const todo = todos.find(t => t.id === id);
      const updatedTodo = await todoAPI.updateTodo(id, !todo.completed);
      setTodos(todos.map(t => t.id === id ? updatedTodo : t));
    } catch (error) {
      console.error('Failed to update todo:', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await todoAPI.deleteTodo(id);
      setTodos(todos.filter(todo => todo.id !== id));
    } catch (error) {
      console.error('Failed to delete todo:', error);
    }
  };

  const handleEdit = async (id, newText) => {
    try {
      const updatedTodo = await todoAPI.updateTodo(id, { title: newText });
      setTodos(todos.map(t => t.id === id ? updatedTodo : t));
    } catch (error) {
      console.error('Failed to edit todo:', error);
    }
  };

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>
        <CircularProgress />
      </Box>
    );
  }

  if (!user) {
    return <Login />;
  }

  return (
    <Container maxWidth="sm" sx={{ mt: 6 }}>
      <Paper elevation={6} sx={{ p: 4, mb: 2 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
          <Typography variant="h4" align="center">
            To-Do List
          </Typography>
          <Button variant="outlined" onClick={logout}>
            Logout
          </Button>
        </Box>
        <Typography variant="body2" sx={{ mb: 2, textAlign: 'center' }}>
          Welcome, {user.username}!
        </Typography>
        <AddTodo onAdd={handleAdd} />
        {loadingTodos ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
            <CircularProgress />
          </Box>
        ) : (
          <TodoList
            todos={todos}
            onToggle={handleToggle}
            onDelete={handleDelete}
            onEdit={handleEdit}
          />
        )}
      </Paper>
    </Container>
  );
}

function App() {
  return (
    <AuthProvider>
      <TodoApp />
    </AuthProvider>
  );
}

export default App;
