import React, { useState, useEffect } from 'react';
import { Container, TextField, Button, Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import inventaryServices from '../../../service/inventary.services';

function Inventary() {
    const [search, setSearch] = useState('');
    const [data, setData] = useState([]);
    const [filteredData, setFilteredData] = useState([]);

    useEffect(() => {
        fetchInventary();
    }, []);

    const handleSearchChange = (event) => {
        const value = event.target.value;
        setSearch(value);
        
        // Filtra los datos según la búsqueda
        const filtered = data.filter(item => 
            item.referenciaid.toString().includes(value) || // Filtrar por ID de referencia
            item.ubicacionesproductoid.toString().includes(value) || // Filtrar por ID de ubicación
            item.usuarioid.toString().includes(value) || // Filtrar por ID de usuario
            item.cantidad.toString().includes(value) || // Filtrar por cantidad
            (item.talla && item.talla.toString().includes(value)) || // Filtrar por talla (si existe)
            item.tipoingresoid.toString().includes(value) || // Filtrar por ID de tipo de ingreso
            (item.fecha && item.fecha.toString().includes(value)) // Filtrar por fecha (si existe)
        );
        setFilteredData(filtered);
        console.log(filtered);
    };

    const fetchInventary = async () => {
        try {
            const response = await inventaryServices.getInventary();
            setData(response); // Asignar la respuesta al estado
            setFilteredData(response); // Inicializar también filteredData
            //console.log(data);
        } catch (error) {
            console.error('Error fetching inventory:', error);
        }
    };

    const ButtonAdd = () => {
        console.log("GG");
    };

    return (
        <Container maxWidth="sm" sx={{
            backgroundColor: '#121212',
        color: 'white',
        border: '2px solid #333',
        borderRadius: '8px',
        opacity: 0.9,
        boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.7)',
        height: '400px', // Establece el tamaño fijo vertical
        overflowY: 'auto', // Habilita el desplazamiento vertical
        padding: '20px',
        }}>
            
            <TextField
                label="Buscar por ID o cantidad"
                variant="outlined"
                value={search}
                onChange={handleSearchChange}
                fullWidth
                margin="normal"
                InputLabelProps={{ style: { color: 'white' } }} // Color de la etiqueta
                InputProps={{
                    style: {
                        color: 'white', // Texto dentro del TextField
                        backgroundColor: '#333', // Fondo del TextField
                    }
                }}
            />

            <Box display="flex" justifyContent="center" gap={2}>

                
            </Box>

            <TableContainer component={Paper} sx={{ marginTop: '20px', backgroundColor: '#333', borderRadius: '8px' }}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell sx={{ color: 'white' }}>ID</TableCell>
                            <TableCell sx={{ color: 'white' }}>Referencia</TableCell>
                            <TableCell sx={{ color: 'white' }}>Ubicación</TableCell>
                            <TableCell sx={{ color: 'white' }}>Usuario</TableCell>
                            <TableCell sx={{ color: 'white' }}>Cantidad</TableCell>
                            <TableCell sx={{ color: 'white' }}>Tipo</TableCell>
                            <TableCell sx={{ color: 'white' }}>Talla</TableCell>
                            <TableCell sx={{ color: 'white' }}>Fecha</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {filteredData.map((item) => (
                            <TableRow key={item.id}>
                                <TableCell sx={{ color: 'white' }}>{item.id}</TableCell>
                                <TableCell sx={{ color: 'white' }}>{item.referenciaid}</TableCell>
                                <TableCell sx={{ color: 'white' }}>{item.ubicacionesproductoid}</TableCell>
                                <TableCell sx={{ color: 'white' }}>{item.usuarioid}</TableCell>
                                <TableCell sx={{ color: 'white' }}>{item.cantidad}</TableCell>
                                <TableCell sx={{ color: 'white' }}>{item.tipoingresoid}</TableCell>
                                <TableCell sx={{ color: 'white' }}>{item.talla || 'N/A'}</TableCell> {/* Mostrar 'N/A' si no hay talla */}
                                <TableCell sx={{ color: 'white' }}>{item.fecha ? new Date(item.fecha).toLocaleString() : 'N/A'}</TableCell> {/* Formato de fecha */}
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Container>
    );
}

export default Inventary;

