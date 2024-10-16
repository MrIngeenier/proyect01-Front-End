import React, { useState, useEffect } from 'react';
import {
    Button,Container, TextField, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper,
    Box
} from '@mui/material';
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
            item.empresa.toLowerCase().includes(value.toLowerCase()) ||
            item.referencia.toLowerCase().includes(value.toLowerCase()) ||
            item.color.toLowerCase().includes(value.toLowerCase()) ||
            item.lugar.toLowerCase().includes(value.toLowerCase())
        );
        setFilteredData(filtered);
    };

    const fetchInventary = async () => {
        try {
            const response = await inventaryServices.getInventary();
            console.log('Response from backend:', response); // Verifica la estructura de los datos aquí

            setData(response); // Asignar la respuesta al estado
            setFilteredData(response); // Inicializar también filteredData
        } catch (error) {
            console.error('Error fetching inventory:', error);
        }
    };

    
    

    return (
        <Container maxWidth="lg" sx={{
            backgroundColor: '#121212',
            color: 'white',
            border: '2px solid #333',
            borderRadius: '8px',
            opacity: 0.9,
            boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.7)',
            padding: '20px',
        }}>
        <Box display="flex" alignItems="center" sx={{padding: '20px 0px',}}> {/* Alinea verticalmente el contenido */}
            <TextField
                label="Buscar por Empresa, Referencia, Color o Lugar"
                variant="outlined"
                value={search}
                onChange={handleSearchChange}
                sx={{ width: '80%', margin: 'normal', height: '56px' }} // Establece la altura aquí
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
                sx={{ borderColor: 'white', color: 'white', height: '56px', marginLeft: '8px',width: '20%'}}
                onClick={fetchInventary} 
            >
                ACTUALIZAR
            </Button>
        </Box>
           

            <TableContainer component={Paper} sx={{  backgroundColor: '#333', borderRadius: '8px' }}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell sx={{ color: 'white' }}>ID Inventario</TableCell>
                            <TableCell sx={{ color: 'white' }}>Empresa</TableCell>
                            <TableCell sx={{ color: 'white' }}>Referencia</TableCell>
                            <TableCell sx={{ color: 'white' }}>Color</TableCell>
                            <TableCell sx={{ color: 'white' }}>Ubicación</TableCell>
                            <TableCell sx={{ color: 'white' }}>T34</TableCell>
                            <TableCell sx={{ color: 'white' }}>T35</TableCell>
                            <TableCell sx={{ color: 'white' }}>T36</TableCell>
                            <TableCell sx={{ color: 'white' }}>T37</TableCell>
                            <TableCell sx={{ color: 'white' }}>T38</TableCell>
                            <TableCell sx={{ color: 'white' }}>T39</TableCell>
                            <TableCell sx={{ color: 'white' }}>T40</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {filteredData.map((item) => (
                            <TableRow key={item.idinventario}>
                                <TableCell sx={{ color: 'white' }}>{item.idinventario}</TableCell>
                                <TableCell sx={{ color: 'white' }}>{item.empresa}</TableCell>
                                <TableCell sx={{ color: 'white' }}>{item.referencia}</TableCell>
                                <TableCell sx={{ color: 'white' }}>{item.color}</TableCell>
                                <TableCell sx={{ color: 'white' }}>{item.lugar}</TableCell>
                                <TableCell sx={{ color: 'white' }}>{item.t34 || 0}</TableCell>
                                <TableCell sx={{ color: 'white' }}>{item.t35 || 0}</TableCell>
                                <TableCell sx={{ color: 'white' }}>{item.t36 || 0}</TableCell>
                                <TableCell sx={{ color: 'white' }}>{item.t37 || 0}</TableCell>
                                <TableCell sx={{ color: 'white' }}>{item.t38 || 0}</TableCell>
                                <TableCell sx={{ color: 'white' }}>{item.t39 || 0}</TableCell>
                                <TableCell sx={{ color: 'white' }}>{item.t40 || 0}</TableCell>

                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Container>
    );
}

export default Inventary;
