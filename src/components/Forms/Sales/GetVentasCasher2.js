import React, { useState, useEffect } from 'react';
import VentasServices from '../../../service/ventas.services';
import {
    Button, Typography, Container, TextField, Box, Paper,
    Table, TableBody, TableCell, TableHead, TableRow
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import UpdateIcon from '@mui/icons-material/Update';

function GetVentasCasher2() {
    const [referencias, setReferencias] = useState([]); // Estado para almacenar referencias
    const [filteredData, setFilteredData] = useState([]); // Estado para los datos filtrados

    // Estados para cada campo de búsqueda
    const [searchId, setSearchId] = useState('');
    const [searchFecha, setSearchFecha] = useState('');
    const [searchUsuario, setSearchUsuario] = useState('');
    const [searchReferencia, setSearchReferencia] = useState('');
    const [searchColor, setSearchColor] = useState('');

    useEffect(() => {
        fetchReferenciasZapatos();
    }, []);

    const fetchReferenciasZapatos = async () => {
        try {
            const response = await VentasServices.getVentasCentro();
            setReferencias(response);
            setFilteredData(response); // Inicialmente, mostrar todos los datos
        } catch (error) {
            console.error('Error fetching TipoZapato:', error);
        }
    };
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

    const handleDelete = async (id) => {
        try {
            if (id === null || id === 0) {
                console.log("ID no válido:", id);
                return; // Salir de la función si el ID no es válido
            }
   
            console.log("Borrar acción para ID:", id);
   
            // Llamar al servicio de eliminación
            const response = await VentasServices.deleteVentas(id);
            console.log(response);
            // Llamar a la función para actualizar los datos
            fetchReferenciasZapatos();
        } catch (error) {
            console.error('Error Delete Venta:', error);
        }
    };
   
    
    const handleUpdate = (id) => {
        console.log("Actualizar acción para ID:", id);
        // Lógica para actualizar
    };

    //const groupedData = groupByDate(filteredData);
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

    // Filtrar referencias basado en los campos de búsqueda
    useEffect(() => {
        const filtered = referencias.filter(item => 
            (searchId === '' || item.idventas.toString().includes(searchId)) &&
            (searchFecha === '' || new Date(item.fecha).toLocaleDateString().includes(searchFecha)) &&
            (searchUsuario === '' || item.nombreusuario.toLowerCase().includes(searchUsuario.toLowerCase())) &&
            (searchReferencia === '' || item.serial.toLowerCase().includes(searchReferencia.toLowerCase())) &&
            (searchColor === '' || item.color.toLowerCase().includes(searchColor.toLowerCase()))
        );
        setFilteredData(filtered);
    }, [searchId, searchFecha, searchUsuario, searchReferencia, searchColor, referencias]);

    return (
        <Container sx={{ 
            backgroundColor: '#121212', 
            color: 'white', 
            border: '2px solid #333',
            borderRadius: '8px', 
            opacity: 0.9, 
            maxWidth: { xs: '350px', sm:'700px', md:'1000px' },
            padding: '20px',
           // maxWidth: '350px'
             }}>
                
            <Box display="flex" gap={2} sx={{ padding: '5px', flexDirection: { xs: 'column', sm: 'row' }}}>
                {/* Campos de búsqueda individuales */}
                <TextField
                    label="ID"
                    variant="outlined"
                    value={searchId}
                    onChange={(e) => setSearchId(e.target.value)}
                    sx={{ width: '100%', backgroundColor: '#333' }}
                    InputLabelProps={{ style: { color: 'white' } }}
                    InputProps={{ style: { color: 'white' } }}
                />
                <TextField
                    label="Fecha"
                    variant="outlined"
                    value={searchFecha}
                    onChange={(e) => setSearchFecha(e.target.value)}
                    placeholder="dd/mm/yyyy"
                    sx={{ width: '100%', backgroundColor: '#333' }}
                    InputLabelProps={{ style: { color: 'white' } }}
                    InputProps={{ style: { color: 'white' } }}
                />
                <TextField
                    label="Usuario"
                    variant="outlined"
                    value={searchUsuario}
                    onChange={(e) => setSearchUsuario(e.target.value)}
                    sx={{ width: '100%', backgroundColor: '#333' }}
                    InputLabelProps={{ style: { color: 'white' } }}
                    InputProps={{ style: { color: 'white' } }}
                />
                <TextField
                    label="Referencia"
                    variant="outlined"
                    value={searchReferencia}
                    onChange={(e) => setSearchReferencia(e.target.value)}
                    sx={{ width: '100%', backgroundColor: '#333' }}
                    InputLabelProps={{ style: { color: 'white' } }}
                    InputProps={{ style: { color: 'white' } }}
                />
                <TextField
                    label="Color"
                    variant="outlined"
                    value={searchColor}
                    onChange={(e) => setSearchColor(e.target.value)}
                    sx={{ width: '100%', backgroundColor: '#333' }}
                    InputLabelProps={{ style: { color: 'white' } }}
                    InputProps={{ style: { color: 'white' } }}
                />
                <Button variant="outlined" color='primary' sx={{ borderColor: 'white', color: 'white', height: '56px' }} onClick={fetchReferenciasZapatos}>
                    <Typography sx={{ fontSize: { xs: '10px', sm: 'auto' } }}>ACTUALIZAR</Typography>
                </Button>
            </Box>
            <Box
                sx={{
                overflow: 'auto', // Permite el desplazamiento
                maxHeight: '400px', // Altura máxima del contenedor
                marginTop: '20px', // Espaciado superior
                }}
            >
            {/* Tabla agrupada por fecha */}
            {Object.entries(groupByDate(filteredData)).map(([date, ventas]) => (
                <Paper key={date} sx={{ margin: '20px 0', padding: '10px', backgroundColor: '#121212' }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-around'  }}>
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
                                <TableCell sx={{ color: 'white' }}>Empresa</TableCell>
                                <TableCell sx={{ color: 'white' }}>Referencia</TableCell>
                                <TableCell sx={{ color: 'white' }}>Color</TableCell>
                                <TableCell sx={{ color: 'white' }}>Valor</TableCell>
                                <TableCell sx={{ color: 'white' }}>Lugar</TableCell>
                                <TableCell sx={{ color: 'white' }}>Estado</TableCell>
                                <TableCell sx={{ color: 'white', textAlign: 'center' }}>Fecha</TableCell>
                                <TableCell sx={{ textAlign: 'center', color: 'white' }}>Acciones</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {ventas.map((item) => (
                                <TableRow key={item.idventas}>
                                    <TableCell sx={{ color: 'white' }}>{item.idventas}</TableCell>
                                    <TableCell sx={{ color: 'white' }}>{item.nombreusuario}</TableCell>
                                    <TableCell sx={{ color: 'white' }}>{item.nombre}</TableCell>
                                    <TableCell sx={{ color: 'white' }}>{item.serial}</TableCell>
                                    <TableCell sx={{ color: 'white' }}>{item.color}</TableCell>
                                    <TableCell sx={{ color: 'white' }}>{item.valor}</TableCell>
                                    <TableCell sx={{ color: 'white' }}>{item.lugar}</TableCell>
                                    <TableCell>
                                        <Button
                                            variant="contained"
                                            color={item.estado ? 'success' : 'error'}
                                            onClick={() => handleToggleStatus(item.idventas)}
                                        >
                                            {item.estado ? 'ON' : 'OFF'}
                                        </Button>
                                    </TableCell>
                                    <TableCell sx={{ color: 'white', textAlign: 'center' }}>
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
            </Box>
        </Container>
    );
}

export default GetVentasCasher2;
