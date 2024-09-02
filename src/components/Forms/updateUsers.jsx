import React, { useState, useEffect } from 'react';
import { Container, TextField, Button, Typography, Grid, FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import publicServices from '../../service/public.services';

const UpdateUsers = () => {
  const [name, setName] = useState('');
  const [newName, setNewName] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [newType, setNewType] = useState('');

  // Inicializa el estado 'name' con el valor de localStorage cuando el componente se monta
  useEffect(() => {
    const userId = localStorage.getItem('userName');
    if (userId) {
      setName(userId);
    }
  }, []); // El array vacío asegura que el efecto se ejecute solo una vez

  const handleUpdate = async (event) => {
    event.preventDefault();
    try {
      // Aquí 'name' ya debería tener el valor correcto
      await publicServices.updateUser(name, newName, newPassword, newType);
      alert('Usuario actualizado exitosamente');
      setName('');
      setNewName('');
      setNewPassword('');
      setNewType('');
    } catch (error) {
      console.error('Error actualizando usuario:', error);
      alert('Error al actualizar usuario');
    }
  };

  return (
    <Container maxWidth="sm">
      <Typography variant="h4" gutterBottom>
        Actualizar Datos del Usuario
      </Typography>
      <Grid container spacing={2}>
        
        <Grid item xs={12}>
          <TextField
            label="Nuevo nombre"
            variant="outlined"
            fullWidth
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            label="Nueva contraseña"
            type="password"
            variant="outlined"
            fullWidth
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />
        </Grid>
        <Grid item xs={12}>
          <FormControl fullWidth variant="outlined" required>
            <InputLabel>Nuevo tipo</InputLabel>
            <Select
              name="newType"
              value={newType}
              onChange={(e) => setNewType(e.target.value)}
              label="Nuevo tipo"
            >
              <MenuItem value="1">1</MenuItem>
              <MenuItem value="2">2</MenuItem>
              <MenuItem value="3">3</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12}>
          <Button variant="contained" color="primary" fullWidth onClick={handleUpdate}>
            Actualizar
          </Button>
        </Grid>
      </Grid>
    </Container>
  );
};

export default UpdateUsers;
