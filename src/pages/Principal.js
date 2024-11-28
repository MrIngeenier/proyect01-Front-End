import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, TextField, Button, Typography, Box, Avatar, CssBaseline, Grid, Link } from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import publicServices from '../service/public.services';
import LoadingScreen from '../utils/LoadingSceen';
import ErrorAlert from '../components/Alerts/ErrorAlert';
import SuccessAlert from '../components/Alerts/SuccesAlert';
const theme = createTheme();

function Principal() {
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false); // Estado para la pantalla de carga
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [errorOpen, setErrorOpen] = useState(false);
  const [successOpen, setSuccessOpen] = useState(false);
  const handleErrorClose = () => setErrorOpen(false);
  const handleSuccessClose = () => setSuccessOpen(false);

  const handleEmailChange = (e) => {
    setName(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true); // Mostrar pantalla de carga

    try {
      const data = await publicServices.login(name, password);
      const Role = data.body.Role;
      localStorage.setItem('token', data.body.token);
      setSuccessMessage("¡Hola !"+name);
      setSuccessOpen(true);
      switch (Role) {
        case 1:
          navigate('/admin');
          break;
        case 2:
          navigate('/casher');
          break;
        case 3:
          navigate('/sales');
          break;
        case 4:
          navigate('/casher2');
          break;
        default:
          console.warn(`Unknown Role: ${Role}`);
      }
    } catch (error) {
      setErrorMessage('El usuario o contraseña esta mal. Por favor, inténtalo de nuevo.');
      setErrorOpen(true);    } finally {
      setIsLoading(false); // Ocultar pantalla de carga
    }
  };

  if (isLoading) {
    return <LoadingScreen />; // Renderizar pantalla de carga si `isLoading` es true
  }

  return (
    <ThemeProvider theme={theme}>
      <Container
        component="main"
        sx={{
          bgcolor: '#d2d1d1',
          color: '#333',
          padding: 4,
          borderRadius: 4,
          boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          maxWidth: { xs: '300px', sm:'700px', md:'700px' },
          marginTop: '5%',
        }}
      >
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
            <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
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
      <SuccessAlert open={successOpen} handleClose={handleSuccessClose} message={successMessage} />
      <ErrorAlert open={errorOpen} handleClose={handleErrorClose} message={errorMessage} />
    </ThemeProvider>
  );
}

export default Principal;
