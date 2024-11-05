import React, { useState, useEffect } from 'react';
import VentasServices from '../../../service/ventas.services';
import {
    Button, Typography, Container, TextField, Box, Paper,
    Table, TableBody, TableCell, TableHead, TableRow
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import UpdateIcon from '@mui/icons-material/Update';

function GetVentas() {
    const [referencias, setReferencias] = useState([]); // Estado para almacenar referencias
    const [search, setSearch] = useState(''); // Estado para la búsqueda
    const [filteredData, setFilteredData] = useState([]); // Estado para los datos filtrados

    useEffect(() => {
        fetchReferenciasZapatos();
    }, []);

    const fetchReferenciasZapatos = async () => {
        try {
            const response = await VentasServices.getVentas();
            setReferencias(response);
            setFilteredData(response); // Inicialmente, mostrar todos los datos
        } catch (error) {
            console.error('Error fetching TipoZapato:', error);
        }
    };

    // Filtrar referencias basado en el texto de búsqueda
    useEffect(() => {
        if (search.trim() === '') {
            setFilteredData(referencias); // Mostrar todos los datos si la búsqueda está vacía
        } else {
            const filtered = referencias.filter(item =>
                (item.id && item.id.toString().includes(search)) ||
                (item.descripcion && item.descripcion.toLowerCase().includes(search.toLowerCase())) ||
                (item.valor && item.valor.toLowerCase().includes(search.toLowerCase()))
            );
            setFilteredData(filtered);
        }
    }, [search, referencias]);
    
    

    const groupByDate = (data) => {
        return data.reduce((acc, item) => {
            const date = new Date(item.fecha).toLocaleDateString();
            if (!acc[date]) {
                acc[date] = [];
            }
            acc[date].push(item);
            return acc;
        }, {});
    };

    const handleDelete = (id) => {
        console.log("Borrar acción para ID:", id);
        // Lógica para borrar
    };
    
    const handleUpdate = (id) => {
        console.log("Actualizar acción para ID:", id);
        // Lógica para actualizar
    };

    const groupedData = groupByDate(filteredData);
    const handleToggleStatus = async (id) => {
        console.log("Estado acción para ID:", id);

        // Aquí puedes implementar la lógica para actualizar el estado en el backend
        try {
            // Lógica para cambiar el estado del usuario
           // const updatedStatus = /* lógica para determinar el nuevo estado */;
            
            // Actualiza el estado en el backend (puedes hacer una llamada API aquí)
            //await publicServices.updateStatus(id, updatedStatus);
    
            // Actualiza el estado localmente si es necesario
            // setVentas(prev => prev.map(item => item.idventas === id ? { ...item, estado: updatedStatus } : item));
        } catch (error) {
            console.error('Error updating status:', error);
        }
    };
    
    return (
        <Container sx={{ backgroundColor: '#121212', color: 'white', border: '2px solid #333', borderRadius: '8px', opacity: 0.9, maxWidth: 'auto', padding: '20px' }}>
            <Box display="flex" alignItems="center" sx={{ padding: '20px' }}>
                <TextField
                    label="Buscar por Id, Descripcion o Valor"
                    variant="outlined"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    sx={{ width: '80%', margin: 'normal', height: '56px' }}
                    InputLabelProps={{ style: { color: 'white' } }}
                    InputProps={{ style: { color: 'white', backgroundColor: '#333' } }}
                />
                <Button variant="outlined" color='primary' sx={{ borderColor: 'white', color: 'white', height: '56px', marginLeft: '8px', width: '20%' }} onClick={fetchReferenciasZapatos}>
                    <Typography sx={{ fontSize: { xs: '10px', sm: 'auto' } }}>ACTUALIZAR</Typography>
                </Button>
            </Box>

            {Object.entries(groupedData).map(([date, ventas]) => (
                <Paper key={date} sx={{ margin: '20px 0', padding: '10px', backgroundColor: '#333' }}>
                    <Box sx={{ display: 'flex',justifyContent: 'space-around' }}>  
                        <Typography variant="h6" sx={{ color: 'white' }}>Fecha: {date}</Typography>
                        <Typography variant="h6" sx={{ color: 'white' }}>
                            Total: {ventas.reduce((sum, item) => sum + parseFloat(item.valor) || 0, 0)}
                        </Typography>
                    </Box>
                   
                   
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell sx={{ color: 'white' }}>ID</TableCell>
                                <TableCell sx={{ color: 'white' }}>Usuario</TableCell>
                                <TableCell sx={{ color: 'white' }}>Referencia</TableCell>
                                <TableCell sx={{ color: 'white' }}>Color</TableCell>
                                <TableCell sx={{ color: 'white' }}>Valor</TableCell>

                                <TableCell sx={{ color: 'white' }}>Estado</TableCell>
                                <TableCell sx={{ color: 'white',textAlign: 'center' }}>Fecha</TableCell>
                                <TableCell sx={{ textAlign: 'center', color: 'white' }}>Acciones</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {ventas.map((item) => (
                                <TableRow key={item.idventas}>
                                    <TableCell sx={{ color: 'white' }}>{item.idventas}</TableCell>
                                    <TableCell sx={{ color: 'white' }}>{item.nombre}</TableCell>
                                    <TableCell sx={{ color: 'white' }}>{item.serial}</TableCell>
                                    <TableCell sx={{ color: 'white' }}>{item.color}</TableCell>
                                    <TableCell sx={{ color: 'white' }}>{item.valor}</TableCell>
                                    <TableCell>
                                    <Button
                                        variant="contained"
                                        color={item.estado ? 'success' : 'error'}
                                        onClick={() => handleToggleStatus(item.idventas)}
                       
                                    >
                                        {item.estado ? 'ON' : 'OFF'}
                                    </Button>
                                </TableCell>
                                    <TableCell sx={{ color: 'white',textAlign: 'center' }}>
                                        {new Date(new Date(item.fecha).getTime() - 5 * 60 * 60 * 1000).toLocaleString()}
                                    </TableCell>                                    
                                    <TableCell sx={{ textAlign: 'center', color: 'white' }}>
                                        <Box display="flex" justifyContent="center" alignItems='center' gap={2}>
                                            <Button variant="contained" color="error" onClick={() => handleDelete(item.idventas)}>
                                                <DeleteIcon sx={{ width: '60%' }} />
                                            </Button>
                                            <Button variant="contained" color="primary" onClick={() => handleUpdate(item.idventas)}>
                                                <UpdateIcon sx={{ width: '60%' }} />
                                            </Button>
                                        </Box>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </Paper>
            ))}
        </Container>
    );
}

export default GetVentas;
