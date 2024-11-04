import React, { useState, useEffect } from 'react';
import { Container, TextField, Button, Typography, Grid, FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import publicServices from '../../../service/public.services';

const UpdateUsers = () => {
  const [newName, setNewName] = useState(localStorage.getItem('userName'));
  const [newPassword, setNewPassword] = useState('');
  const [newType, setNewType] = useState('');
  const [newActive, setNewActive] = useState('1'); // Inicializa 'newActive' como 1 (Activo)

  useEffect(() => {
    const userId = localStorage.getItem('userName');
    if (userId) {
      setNewName(userId);
    }
  }, []); // El array vacío asegura que el efecto se ejecute solo una vez

  const handleUpdate = async (event) => {
    event.preventDefault();

    if (!newName || !newPassword || !newType) {
      alert('Por favor completa todos los campos');
      return;
    }

    try {
      const userData = JSON.parse(localStorage.getItem('userData'));
      const nombreusuario = userData.name;
      console.log(nombreusuario);
      await publicServices.updateUser(nombreusuario, newName, newPassword, newType, newActive);
      alert('Usuario actualizado exitosamente');
      setNewName('');
      setNewPassword('');
      setNewType('');
      setNewActive('1'); // Reinicia el estado a activo
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
          <FormControl fullWidth variant="outlined" required>
            <InputLabel>Estado del usuario</InputLabel>
            <Select
              name="newActive"
              value={newActive}
              onChange={(e) => setNewActive(e.target.value)}
              label="Estado del usuario"
            >
              <MenuItem value="1">Activo</MenuItem>
              <MenuItem value="0">Inactivo</MenuItem>
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
