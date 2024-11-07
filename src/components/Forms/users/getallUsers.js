import React, { useState,useEffect } from 'react';
import { Container, TextField, Button, Typography, Table, TableBody, TableCell, TableHead, TableRow, Paper, Dialog, DialogContent, DialogActions } from '@mui/material';
import publicServices from '../../../service/public.services';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import UpdateIcon from '@mui/icons-material/Update';
import RegisterUsersForm from './registerUsers.from';
import UpdateUsers from './updateUsers';
import ErrorAlert from '../../Alerts/ErrorAlert';
import SuccessAlert from '../../Alerts/SuccesAlert';

function Getallusers() {
    const [users, setUsers] = useState([]);
    const [search, setSearch] = useState('');
    const [openDialog, setOpenDialog] = useState(false);
    const [openDialogUpdate, setOpenDialogUpdate] = useState(false);
    const [errorOpen, setErrorOpen] = useState(false);
    const [successOpen, setSuccessOpen] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    

    const fetchUsers = async () => {
        try {
            const response = await publicServices.getUsers();
            setUsers(response);
            if(Response){
                setSuccessMessage("Obtención de usuarios con éxito.");
                setSuccessOpen(true);
            }else{
                setErrorMessage('Error obtención de usuarios.');
                setErrorOpen(true);
            }
           
        } catch (error) {
            setErrorMessage('Error obtención de usuarios.');
            setErrorOpen(true);
            console.error('Error fetching users:', error);
        }
    };

    const handleSearchChange = (event) => {
        setSearch(event.target.value);
    };

    const filteredUsers = users.filter(user =>
        (user.nombreusuario || '').toLowerCase().includes(search.toLowerCase())
    );

    const handleDelete = async (idusuarios,nombreusuario) => {
       // console.log(idusuarios+nombreusuario)
        try {
            const response = await publicServices.deleteUsers(idusuarios,nombreusuario);
            //console.log(response);
            if(response){
                setSuccessMessage("Obtención de usuarios con éxito.");
                setSuccessOpen(true);
            }else{
                setErrorMessage('Error obtención de usuarios.');
                setErrorOpen(true);
            }
        } catch (error) {
            setErrorMessage('Error obtención de usuarios.');
            setErrorOpen(true);
            console.log('Error Delete user',error);
        }
        //console.log(`Delete user with ID: ${userId}`);
    };

    const handleUpdate = (userId, userName, userType, userActive) => {
        setOpenDialogUpdate(true);
        
        // Crear un objeto con todos los datos del usuario
        const userData = {
            id: userId,
            name: userName,
            type: userType,
            active: userActive
        };
    
        // Almacenar el objeto en localStorage
        localStorage.setItem('userData', JSON.stringify(userData));
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

    const handleErrorClose = () => setErrorOpen(false);
  const handleSuccessClose = () => setSuccessOpen(false);

    useEffect(() => {
        fetchUsers();
      }, []);

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
                            <TableCell sx={{ width: '40%', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>Nombre</TableCell>
                            <TableCell sx={{ width: '20%', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>Tipo</TableCell>
                            <TableCell sx={{ width: '20%', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>Estado</TableCell>
                            <TableCell sx={{ width: '20%', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>Acciones</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {filteredUsers.map((user) => (
                            <TableRow key={user.idusuarios}>
                                <TableCell sx={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{user.idusuarios}</TableCell>
                                <TableCell sx={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{user.nombreusuario}</TableCell>
                                <TableCell sx={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{user.fk_idrol}</TableCell>
                                <TableCell sx={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                                    <Button
                                        variant="contained"
                                        style={{
                                            backgroundColor: user.activo ? 'yellow' : 'black',
                                            color: user.activo ? 'black' : 'white',
                                            width: '80px', // Ancho fijo para ambos botones
                                            textAlign: 'center',
                                        }}
                                    >
                                        {user.activo ? 'Activo' : 'Inactivo'}
                                    </Button>
                                </TableCell>



                                <TableCell>
                                    <Button variant="contained" color="error" onClick={() => handleDelete(user.idusuarios,user.nombreusuario)} style={{ marginRight: 8 }}>
                                        <DeleteForeverIcon />
                                    </Button>
                                    <Button variant="contained" color="success" onClick={() => handleUpdate(user.idusuarios,user.nombreusuario,user.fk_idrol,user.activo)}>
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
            <SuccessAlert open={successOpen} handleClose={handleSuccessClose} message={successMessage} />
            <ErrorAlert open={errorOpen} handleClose={handleErrorClose} message={errorMessage} />
        </Container>
    );
}

export default Getallusers;
