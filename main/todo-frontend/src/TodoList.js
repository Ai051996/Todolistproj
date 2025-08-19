import React from 'react';
import { List, Paper } from '@mui/material';
import TodoItem from './TodoItem';

const TodoList = ({ todos, onToggle, onDelete, onEdit }) => (
  <Paper elevation={3} sx={{ mt: 2 }}>
    <List>
      {todos.map((todo) => (
        <TodoItem
          key={todo.id}
          todo={todo}
          onToggle={onToggle}
          onDelete={onDelete}
          onEdit={onEdit}
        />
      ))}
    </List>
  </Paper>
);

export default TodoList;
