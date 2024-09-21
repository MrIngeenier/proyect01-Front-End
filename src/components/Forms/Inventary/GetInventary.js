import React, { useState } from 'react';
import { Container, TextField, Button, Typography, Table, TableBody, TableCell, TableHead, TableRow, Paper, Dialog, DialogContent, DialogActions, Box } from '@mui/material';

function Inventary () {
    const [search, setSearch] = useState('');

    const handleSearchChange = (event) => {
        setSearch(event.target.value);
    };

    const ButtonAdd = () => {
        console.log("GG");
    };

    return (
        <Container maxWidth="sm" sx={{
            backgroundColor: '#121212', // Fondo estilo dark
            color: 'white', // Texto claro para contrastar
            border: '2px solid #333', // Borde oscuro
            borderRadius: '8px',
            opacity: 0.9, // Transparencia ligera
            boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.7)', // Sombra más oscura
            backdropFilter: 'blur(10px)', // Desenfoque de fondo
            padding: '20px',
        }}>
            
            <TextField
                label="Buscar por nombre"
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
                <Button variant="outlined" color='primary' size="medium" onClick={ButtonAdd}  sx={{ 
                    borderColor: 'white', // Color del borde
                    color: 'white', // Color del texto  
                }} >
                    MOSTRAR
                </Button>

                <Button variant="outlined" color='primary' size="medium" onClick={ButtonAdd}  sx={{ 
                    borderColor: 'white', // Color del borde
                    color: 'white', // Color del texto  
                }} >
                    OCULTAR
                </Button>

            </Box>

        </Container>
    );
}

export default Inventary;