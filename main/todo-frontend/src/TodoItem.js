import React, { useState } from 'react';
import { ListItem, Checkbox, IconButton, TextField, Box } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';

const TodoItem = ({ todo, onToggle, onDelete, onEdit }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editValue, setEditValue] = useState(todo.text);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    onEdit(todo.id, editValue);
    setIsEditing(false);
  };

  return (
    <ListItem
      secondaryAction={
        <Box>
          {isEditing ? (
            <IconButton edge="end" aria-label="save" onClick={handleSave}>
              <SaveIcon />
            </IconButton>
          ) : (
            <IconButton edge="end" aria-label="edit" onClick={handleEdit}>
              <EditIcon />
            </IconButton>
          )}
          <IconButton edge="end" aria-label="delete" onClick={() => onDelete(todo.id)}>
            <DeleteIcon />
          </IconButton>
        </Box>
      }
      sx={{ textDecoration: todo.completed ? 'line-through' : 'none' }}
    >
      <Checkbox checked={todo.completed} onChange={() => onToggle(todo.id)} />
      {isEditing ? (
        <TextField
          value={editValue}
          onChange={(e) => setEditValue(e.target.value)}
          size="small"
          sx={{ flex: 1 }}
        />
      ) : (
        <span>{todo.title}</span>
      )}
    </ListItem>
  );
};

export default TodoItem;
