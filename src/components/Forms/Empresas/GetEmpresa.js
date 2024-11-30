import React, { useState, useEffect } from 'react';
import EmpresaServices from '../../../service/empresa.services';
import {
    Button, Typography, Container, TextField, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Box
} from '@mui/material';

import DeleteIcon from '@mui/icons-material/Delete';
import UpdateIcon from '@mui/icons-material/Update';

function GetEmpresa() {
    const [empresas, setEmpresas] = useState([]); // Estado para almacenar todas las empresas
    const [search, setSearch] = useState(''); // Estado para la búsqueda
    const [filteredData, setFilteredData] = useState([]); // Estado para los datos filtrados

    useEffect(() => {
        fetchEmpresas();
    }, []);

    const fetchEmpresas = async () => {
        try {
            const response = await EmpresaServices.getEmpresas();
            setEmpresas(response.body || []); // Asegúrate de que sea un array
            setFilteredData(response.body || []); // Inicializa también los datos filtrados
        } catch (error) {
            console.error('Error fetching Empresas:', error);
        }
    };

    // Filtrar datos cuando se ingresa texto en el buscador
    const handleSearch = () => {
        const lowerCaseSearch = search.toLowerCase();
        const filtered = empresas.filter((item) => 
            item.id.toString().includes(lowerCaseSearch) || // Buscar por ID
            item.nombre.toLowerCase().includes(lowerCaseSearch) || // Buscar por nombre
            item.nit.toString().includes(lowerCaseSearch) // Buscar por NIT
        );
        setFilteredData(filtered);
    };

    const handleDelete = (id) => {
        console.log(`Borrar acción para ID: ${id}`);
        // Implementar lógica para eliminar usando id
    };

    const handleUpdate = (id) => {
        console.log(`Actualizar acción para ID: ${id}`);
        // Implementar lógica para actualizar usando id
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
                padding: { xs: '4px', sm: 0 },
                maxWidth: { xs: '300px', sm: '700px', md: '1000px' },
            }}
        >
            <Box display="flex" alignItems="center" sx={{ padding: { xs: 0, sm: '20px' } }}>
                <TextField
                    label="Buscar por ID, Nombre o NIT"
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
                    color="primary"
                    sx={{ borderColor: 'white', color: 'white', height: '56px', marginLeft: '8px', width: '20%' }}
                    onClick={handleSearch} // Filtrar datos al hacer clic
                >
                    <Typography sx={{ fontSize: { xs: '10px', sm: 'auto' } }}>BUSCAR</Typography>
                </Button>
            </Box>

            <Box sx={{
                maxHeight: { xs: '300px', sm: '400px', md: '500px' },
                overflowY: 'auto',
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
                                <TableCell sx={{ color: 'white' }}>Nombre</TableCell>
                                <TableCell sx={{ color: 'white' }}>NIT</TableCell>
                                <TableCell sx={{ textAlign: 'center', color: 'white' }}>Acciones</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {filteredData.length > 0 ? (
                                filteredData.map((item) => (
                                    <TableRow key={item.id}>
                                        <TableCell sx={{ color: 'white' }}>{item.id}</TableCell>
                                        <TableCell sx={{ color: 'white' }}>{item.nombre}</TableCell>
                                        <TableCell sx={{ color: 'white' }}>{item.nit}</TableCell>
                                        <TableCell sx={{ textAlign: 'center', color: 'white' }}>
                                            <Box display="flex" justifyContent="center" alignItems="center" gap={2}>
                                                <Button
                                                    variant="contained"
                                                    color="error"
                                                    onClick={() => handleDelete(item.id)}
                                                >
                                                    <DeleteIcon sx={{ width: '60%' }} />
                                                </Button>

                                                <Button
                                                    variant="contained"
                                                    color="primary"
                                                    onClick={() => handleUpdate(item.id)}
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

export default GetEmpresa;
