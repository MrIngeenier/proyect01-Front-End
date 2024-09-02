
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, TextField, Button, Typography, Box, Avatar, CssBaseline, Grid, Link } from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import publicServices from '../service/public.services';

const theme = createTheme();

function Principal() {
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate(); // Hook useNavigate dentro del componente

  const handleEmailChange = (e) => {
    setName(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Email:', name);
    console.log('Password:', password);

    try {
      const data = await publicServices.login(name, password);
      console.log('Login successful:', data);
      localStorage.setItem('token', data.body.token);
      //console.log(data.body.token);
      console.log(localStorage.getItem('token'));
      navigate('/dash'); // Guarda el token si es necesario
    } catch (error) {
      //console.error('Login failed:', error.message);
      alert('Login failed: Invalid credentials. Please check your username and password.');

    }
};


  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs" sx={{
        bgcolor: '#d2d1d1',  // Color de fondo gris
        color: '#333',       // Color del texto
        padding: 4,          // Espaciado interno
        borderRadius: 4,     // Bordes redondeados
        boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)', // Sombra
        display: 'flex', 
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '80vh',
        marginTop: '5%'
      }}>
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="text"
              label="User name"
              name="name"
              autoComplete="text"
              autoFocus
              value={name}
              onChange={handleEmailChange}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              value={password}
              onChange={handlePasswordChange}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link href="#" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}

export default Principal;
