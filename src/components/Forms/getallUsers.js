import React, { useState } from 'react';
import { Container, TextField, Button, Typography, Table, TableBody, TableCell, TableHead, TableRow, Paper, Dialog, DialogContent, DialogActions } from '@mui/material';
import publicServices from '../../service/public.services';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import UpdateIcon from '@mui/icons-material/Update';
import RegisterUsersForm from './registerUsers.from';
import UpdateUsers from './updateUsers';

function Getallusers() {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState('');
  const [openDialog, setOpenDialog] = useState(false);
  const [openDialogUpdate, setOpenDialogUpdate] = useState(false);

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
    console.log(`Delete user with ID: ${userId}`);
  };

  const handleUpdate = (userId) => {
    setOpenDialogUpdate(true);
    console.log(`Update user with name: ${userId}`);
    localStorage.setItem('userName', userId); // Guardar el userId en localStorage
  };

  const handleOpenDialog = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const handleCloseDialogUpdate = () => {
    setOpenDialogUpdate(false);
  };

  return (
    <Container style={{ padding: 0, textAlign: 'center' }}>
      <Typography variant="h5" gutterBottom>Lista de Usuarios</Typography>
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
      <Paper style={{ marginTop: 20, maxHeight: 400, overflowY: 'auto' }}>
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
                  <Button variant="contained" color="success" onClick={() => handleUpdate(user.name)}>
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

      <Dialog open={openDialogUpdate} onClose={handleCloseDialogUpdate}>
        <DialogContent>
          <UpdateUsers />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialogUpdate} color="primary">
            Cancelar
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
}

export default Getallusers;
