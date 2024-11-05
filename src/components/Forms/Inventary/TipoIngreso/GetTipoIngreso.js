import React, { useState, useEffect } from 'react';
import TipoIngresoServices from '../../../../service/tipoIngreso.service';
import {
    Button, Typography, Container, TextField, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper,
    Box
} from '@mui/material';

import DeleteIcon from '@mui/icons-material/Delete';
import UpdateIcon from '@mui/icons-material/Update';

function GetTipoIngreso() {
    const [referencias, setReferencias] = useState([]); // Estado para almacenar referencias
    const [search, setSearch] = useState(''); // Estado para la búsqueda
    const [filteredData, setFilteredData] = useState([]); // Estado para los datos filtrados

    useEffect(() => {
        fetchReferenciasZapatos();
    }, []);

    const fetchReferenciasZapatos = async () => {
        try {
            const response = await TipoIngresoServices.getTipoIngreso();
                //console.log(response);
                setReferencias(response);
                setFilteredData(response); // Inicialmente, mostrar todos los datos
            
            
        } catch (error) {
            console.error('Error fetching TipoZapato:', error);
        }
    };

    // Filtrar referencias basado en el texto de búsqueda
    useEffect(() => {
        const filtered = referencias.filter(item =>
            (item.id && item.id.toString().includes(search)) ||
            item.descripcion.toLowerCase().includes(search.toLowerCase()) ||
            item.valor.toLowerCase().includes(search.toLowerCase())
        );
        setFilteredData(filtered);
    }, [search, referencias]);

    const handleDelete = () => {
        console.log("Borrar acción");
        // Lógica para borrar
    };
    
    const handleUpdate = () => {
        console.log("Actualizar acción");
        // Lógica para actualizar
    };

    return (
        <Container
            sx={{
                backgroundColor: '#121212',
                color: 'white',
                border: '2px solid #333',
                borderRadius: '8px',
                opacity: 0.9,
                boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.7)',
                maxWidth: { xs: 'auto', sm: 'auto', md: 'md' },
                padding: { xs: '4px', sm: 0 },
            }}                
        >
            <Box display="flex" alignItems="center" sx={{ padding: { xs: 0, sm: '20px' }}} >
                <TextField
                    label="Buscar por Id, Descripcion o Valor"
                    variant="outlined"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)} 
                    sx={{ width: '80%', margin: 'normal', height: '56px' }}
                    InputLabelProps={{ style: { color: 'white' } }}
                    InputProps={{
                        style: {
                            color: 'white',
                            backgroundColor: '#333',
                        },
                    }}
                />
                <Button
                    variant="outlined"
                    color='primary'
                    sx={{ borderColor: 'white', color: 'white', height: '56px', marginLeft: '8px', width: '20%' }}
                    onClick={fetchReferenciasZapatos}
                >
                    <Typography sx={{fontSize: { xs: '10px', sm: 'auto' }}}>ACTUALIZAR</Typography>
                </Button>
            </Box>

            <Box sx={{
                maxHeight: { xs: '300px', sm: '400px', md: '500px' },
                overflowY: 'auto',
                maxWidth: { xs: '100%', sm: 'auto', md: 'auto' },
                width: '100%',
                margin: '0 auto',
                backgroundColor: '#121212',
                color: 'white',
                border: '2px solid #333',
                borderRadius: '8px',
                padding: '20px',
            }}>
                <TableContainer component={Paper} sx={{ backgroundColor: '#333', borderRadius: '8px' }}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell sx={{ color: 'white' }}>ID</TableCell>
                                <TableCell sx={{ color: 'white' }}>Descripción</TableCell>
                                <TableCell sx={{ color: 'white' }}>Valor</TableCell>
                                <TableCell sx={{ textAlign: 'center', color: 'white' }}>Acciones</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {filteredData && filteredData.length > 0 ? (
                                filteredData.map((item) => (
                                    <TableRow key={item.id}>
                                        <TableCell sx={{ color: 'white' }}>{item.id}</TableCell>
                                        <TableCell sx={{ color: 'white' }}>{item.descripcion}</TableCell>
                                        <TableCell sx={{ color: 'white' }}>{item.valor}</TableCell>
                                        <TableCell sx={{ textAlign: 'center', color: 'white' }}>
                                            <Box display="flex" justifyContent="center" alignItems='center' gap={2}>
                                                <Button
                                                    variant="contained"
                                                    color="error"
                                                    onClick={handleDelete}
                                                >
                                                    <DeleteIcon sx={{ width: '60%' }} />
                                                </Button>
                                                <Button
                                                    variant="contained"
                                                    color="primary"
                                                    onClick={handleUpdate}
                                                >
                                                    <UpdateIcon sx={{ width: '60%' }} />
                                                </Button>
                                            </Box>
                                        </TableCell>
                                    </TableRow>
                                ))
                            ) : (
                                <TableRow>
                                    <TableCell colSpan={4} sx={{ textAlign: 'center', color: 'white' }}>
                                        No hay datos disponibles
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Box>
        </Container>
    );
}

export default GetTipoIngreso;
