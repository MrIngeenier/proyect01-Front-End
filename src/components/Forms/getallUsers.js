import React, { useState } from 'react';
import { Container, TextField, Button, Typography, Table, TableBody, TableCell, TableHead, TableRow, Paper, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';
import publicServices from '../../service/public.services';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import UpdateIcon from '@mui/icons-material/Update';
import RegisterUsersForm from './registerUsers.from';

function Getallusers() {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState('');
  const [openDialog, setOpenDialog] = useState(false);

  const fetchUsers = async () => {
    try {
      const response = await publicServices.getUsers();
      setUsers(response);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  const handleSearchChange = (event) => {
    setSearch(event.target.value);
  };

  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(search.toLowerCase())
  );

  const handleDelete = (userId) => {
    // Lógica para eliminar el usuario
    console.log(`Delete user with ID: ${userId}`);
  };

  const handleUpdate = (userId) => {
    // Lógica para actualizar el usuario
    console.log(`Update user with ID: ${userId}`);
  };

  const handleOpenDialog = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Lista de Usuarios
      </Typography>
      <TextField
        label="Buscar por nombre"
        variant="outlined"
        value={search}
        onChange={handleSearchChange}
        fullWidth
        margin="normal"
      />
      <Button variant="contained" color="primary" onClick={fetchUsers}>
        Actualizar lista
      </Button>
      <Button variant="contained" color="primary" onClick={handleOpenDialog} style={{ marginLeft: 20 }}>
        Agregar
      </Button>
      <Paper style={{ marginTop: 20, overflowX: 'auto' }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell sx={{ width: '20%', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>ID</TableCell>
              <TableCell sx={{ width: '20%', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>Nombre</TableCell>
              <TableCell sx={{ width: '20%', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>Tipo</TableCell>
              <TableCell sx={{ width: '20%', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>Acciones</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredUsers.map((user) => (
              <TableRow key={user.id}>
                <TableCell sx={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{user.id}</TableCell>
                <TableCell sx={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{user.name}</TableCell>
                <TableCell sx={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{user.type}</TableCell>
                <TableCell>
                  <Button variant="contained" color="error" onClick={() => handleDelete(user.id)} style={{ marginRight: 8 }}>
                    <DeleteForeverIcon />
                  </Button>
                  <Button variant="contained" color="success" onClick={() => handleUpdate(user.id)}>
                    <UpdateIcon />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>

      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogContent>
          <RegisterUsersForm />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="primary">
            Cancelar
          </Button>
         
        </DialogActions>
      </Dialog>
    </Container>
  );
}

export default Getallusers;
