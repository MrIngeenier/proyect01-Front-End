import React, { useState } from 'react';
import { Container, TextField, Button, Typography, Grid, MenuItem, Select, InputLabel, FormControl } from '@mui/material';
import publicServices from '../../../service/public.services';

const RegisterUsersForm = () => {
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [type, setType] = useState('');

  const handleChange = (event) => {
    const { name, value } = event.target;
    if (name === 'name') setName(value);
    if (name === 'password') setPassword(value);
    if (name === 'type') setType(value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await publicServices.addUsers(name, password, type);
      alert('Usuario registrado exitosamente');
      setName('');
      setPassword('');
      setType('');
    } catch (error) {
      console.error('Error registrando usuario:', error);
      alert('Error al registrar usuario');
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
              value={name}
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
              value={password}
              onChange={handleChange}
              fullWidth
              required
            />
          </Grid>
          <Grid item xs={12}>
            <FormControl fullWidth variant="outlined" required>
              <InputLabel>Tipo</InputLabel>
              <Select
                name="type"
                value={type}
                onChange={handleChange}
                label="Tipo"
              >
                <MenuItem value="1">Admin General</MenuItem>
                <MenuItem value="2">Cajera</MenuItem>
                <MenuItem value="3">Vendedora</MenuItem>
                <MenuItem value="4">Cajera 2</MenuItem>
                <MenuItem value="5">Vendedora 2</MenuItem>
                <MenuItem value="6">Bodeguero</MenuItem>
                <MenuItem value="5">Bodeguero 2</MenuItem>


              </Select>
            </FormControl>
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
