import React, { useState } from 'react';
import { TextField, Button, Box, Typography, Paper, Alert } from '@mui/material';
import { useAuth } from './AuthContext';

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isRegistering, setIsRegistering] = useState(false);
  const { login, register } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!username.trim() || !password.trim()) {
      setError('Please fill in all fields');
      return;
    }

    const result = isRegistering 
      ? await register(username, password)
      : await login(username, password);

    if (result.success) {
      if (isRegistering) {
        setIsRegistering(false);
        setError('');
        setPassword('');
      }
    } else {
      setError(result.error);
    }
  };

  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>
      <Paper elevation={3} sx={{ p: 4, width: '100%', maxWidth: 400 }}>
        <Typography variant="h4" align="center" gutterBottom>
          {isRegistering ? 'Register' : 'Login'}
        </Typography>
        
        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}

        <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <TextField
            label="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            fullWidth
          />
          <TextField
            label="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            fullWidth
          />
          <Button type="submit" variant="contained" color="primary" fullWidth>
            {isRegistering ? 'Register' : 'Login'}
          </Button>
        </Box>

        <Box sx={{ mt: 2, textAlign: 'center' }}>
          <Button
            variant="text"
            onClick={() => setIsRegistering(!isRegistering)}
          >
            {isRegistering ? 'Already have an account? Login' : 'Need an account? Register'}
          </Button>
        </Box>
      </Paper>
    </Box>
  );
}
