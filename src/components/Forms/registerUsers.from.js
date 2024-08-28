import React, { useState } from 'react';
import { Container, TextField, Button, Typography, Grid } from '@mui/material';

const RegisterUsersForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    password: '',
    type: '',
  });

  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch('http://localhost:10000/users/regiserUsers', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        alert('Usuario registrado exitosamente');
        setFormData({ name: '', password: '', type: '' });
      } else {
        alert('Error al registrar usuario');
      }
    } catch (error) {
      console.error('Error registrando usuario:', error);
    }
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Registrar Usuario
      </Typography>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              label="Nombre"
              name="name"
              variant="outlined"
              value={formData.name}
              onChange={handleChange}
              fullWidth
              required
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Contraseña"
              name="password"
              type="password"
              variant="outlined"
              value={formData.password}
              onChange={handleChange}
              fullWidth
              required
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Tipo"
              name="type"
              variant="outlined"
              value={formData.type}
              onChange={handleChange}
              fullWidth
              required
            />
          </Grid>
          <Grid item xs={12}>
            <Button variant="contained" color="primary" type="submit" fullWidth>
              Registrar
            </Button>
          </Grid>
        </Grid>
      </form>
    </Container>
  );
};

export default RegisterUsersForm;
