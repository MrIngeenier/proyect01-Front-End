import React, { useState, useEffect } from 'react';
import ReferencesServices from "../../../../service/References.services";
import {
    Button,Typography , Container, TextField, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper,
    Box
} from '@mui/material';

import DeleteIcon from '@mui/icons-material/Delete';
import UpdateIcon from '@mui/icons-material/Update';

function GetRefencias() {

    const [referencias, setReferencias] = useState([]); // Estado para almacenar referencias
    const [search, setSearch] = useState(''); // Estado para la búsqueda
    const [filteredData, setFilteredData] = useState([]); // Estado para los datos filtrados

    
    useEffect(() => {
        fetchReferenciasZapatos();
    }, []);

    const fetchReferenciasZapatos = async () => {
        try {
            const response = await ReferencesServices.getReferencia();
            setReferencias(response);
            setFilteredData(response); // Inicialmente, mostrar todos los datos
        } catch (error) {
            console.error('Error fetching References:', error);
        }
    };

    // Filtrar referencias basado en el texto de búsqueda
    useEffect(() => {
        const filtered = referencias.filter(item =>
            (item.id && item.id.toString().includes(search)) || // Convierte id a string
            item.serial.toLowerCase().includes(search.toLowerCase()) ||
            item.color.toLowerCase().includes(search.toLowerCase()) ||
            item.descripcion.toLowerCase().includes(search.toLowerCase()) ||
            item.tipopublico.toLowerCase().includes(search.toLowerCase())
        );
        setFilteredData(filtered);
    }, [search, referencias]);

    const handleDelete = (userId) => {
        console.log(`Delete user with ID: ${userId}`);
    };
    
      const handleUpdate = (userId) => {
        console.log(`Update user with ID: ${userId}`);
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
                //padding: '20px',
                maxWidth: { xs: 'auto', sm: 'auto', md: 'md' }, // Ajusta el ancho para diferentes tamaños

                padding: { xs: '4px', sm: 0 }, // Mueve el container 20px a la izquierda en modo móvil

            }}                

        >
            <Box display="flex" alignItems="center" sx={{  padding: { xs: 0, sm: '20px' }}}  >
                <TextField
                    label="Buscar por Id, Empresa, Referencia, Color o Lugar"
                    variant="outlined"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)} // Actualiza el estado de búsqueda
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
                <Typography   sx={{fontSize: { xs: '10px', sm: 'auto' }}}>ACTUALIZAR</Typography>
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
                                <TableCell sx={{ color: 'white' }}>Referencia</TableCell>
                                <TableCell sx={{ color: 'white' }}>Color</TableCell>
                                <TableCell sx={{ color: 'white' }}>Valor</TableCell>
                                <TableCell sx={{ color: 'white' }}>Publico</TableCell>
                                <TableCell sx={{ textAlign: 'center', color: 'white' }}>Acciones</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {filteredData.map((item) => (
                                <TableRow key={item.id}>
                                    <TableCell sx={{ color: 'white' }}>{item.id}</TableCell>
                                    <TableCell sx={{ color: 'white' }}>{item.serial}</TableCell>
                                    <TableCell sx={{ color: 'white' }}>{item.color}</TableCell>
                                    <TableCell sx={{ color: 'white' }}>{item.descripcion}</TableCell>
                                    <TableCell sx={{ color: 'white' }}>{item.tipopublico}</TableCell>
                                    <TableCell sx={{ textAlign: 'center', color: 'white' }}>
                                    <Box display="flex" justifyContent="center" alignItems='center' gap={2}>
                                        <Button
                                            variant="contained"
                                            color="error"
                                            onClick={() => handleDelete(item.id)}
                                        >
                                            <DeleteIcon sx={{width:'60%'}}/>
                                        </Button>

                                        <Button
                                            variant="contained"
                                            color="primary"
                                            onClick={() => handleUpdate(item.id)}
                                        >
                                            <UpdateIcon sx={{width:'60%'}}/>
                                        </Button>
                                    </Box>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Box>
        </Container>
    );
}

export default GetRefencias;
