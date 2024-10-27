import React, { useState } from 'react';
import { Container, TextField, Button, Box, Grid,FormControl,InputLabel,Select,MenuItem } from '@mui/material';
import TipoIngresoServices from '../../../../service/tipoIngreso.service';
import GetTipoIngreso from './GetTipoIngreso';
function TipoIngreso() {
    const [formData, setFormData] = useState({
        descripcion: '',
        valor: '', // Campo para manejar el valor
    });

    const [isVisible, setIsVisible] = useState(false); // Estado para controlar la visibilidad
    const [error, setError] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

    const handleChange = (event) => {
        setFormData({
            ...formData,
            [event.target.name]: event.target.value,
        });
    };

    const postTipoIngreso = async () => {
        const { descripcion, valor } = formData; // Solo se envía descripcion y valor
        if(!descripcion === '' || !descripcion === null){
            try {
                const response = await TipoIngresoServices.addTipoIngreso(descripcion, valor);
                setSuccessMessage('Referencia añadida: ' + response.descripcion);
                alert("Referencia Agregada");
                setFormData({ descripcion: '', valor: '' }); // Reinicia el formulario
            } catch (error) {
                setError('Error añadiendo referencia: ' + error.message);
                console.error('Error añadiendo referencia:', error);
            }
        }else{
            alert('Debes Llenar los datos de tipo ingreso');
        }
        
        
    };

    const toggleVisibility = () => {
        setIsVisible(!isVisible); // Cambia el valor del estado entre true y false
    };

    const ButtonADD = () => {
        alert("Agregar: " + JSON.stringify(formData, null, 2));
        postTipoIngreso();
    };

    return (
        <Container maxWidth="md" sx={{
            backgroundColor: '#121212',
            color: 'white',
            border: '2px solid #333',
            borderRadius: '8px',
            opacity: 0.9,
            boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.7)',
            backdropFilter: 'blur(10px)',
            padding: { xs: '10px ', sm: '20px' },
        }}>
            Tipo Ingreso
            {error && <div style={{ color: 'red' }}>{error}</div>}
            {successMessage && <div style={{ color: 'green' }}>{successMessage}</div>}
            <Grid container spacing={1} sx={{ display: 'flex', justifyContent: 'center', padding: '10px' }}>
            <Grid item xs={12} sm={6}>
                <FormControl variant="outlined" fullWidth>
                    <InputLabel sx={{ color: 'white' }}>Descripción</InputLabel>
                    <Select
                        label="Descripción"
                        name="descripcion" // Asegúrate de que este campo esté en tu estado formData
                        value={formData.descripcion} // Debe ser parte del formData
                        onChange={handleChange} // Manejador de cambios
                        sx={{ color: 'white', backgroundColor: '#333' }} // Estilo personalizado
                    >
                        <MenuItem value="Bodega">Bodega</MenuItem>
                        <MenuItem value="Devolucion">Devolución</MenuItem>
                    </Select>
                </FormControl>
            </Grid>

                <Grid item xs={12} sm={6}>
                    <TextField
                        label="Valor" // Campo para el valor
                        variant="outlined"
                        name="valor"
                        value={formData.valor}
                        onChange={handleChange}
                        fullWidth
                        InputLabelProps={{ style: { color: 'white' } }}
                        InputProps={{
                            style: {
                                color: 'white',
                                backgroundColor: '#333',
                            }
                        }}
                    />
                </Grid>

                
                <Grid item xs={12}>
                    <Box display="flex" justifyContent="center" gap={2}>
                        <Button variant="outlined" color='primary' onClick={ButtonADD} sx={{ borderColor: 'white', color: 'white' }}>
                            AGREGAR
                        </Button>
                        <Button variant="outlined" color='primary' onClick={toggleVisibility} sx={{ borderColor: 'white', color: 'white' }}>
                            {isVisible ? 'OCULTAR' : 'MOSTRAR'}
                        </Button>
                    </Box>
                </Grid>
            </Grid>
            {isVisible && ( 
                <GetTipoIngreso /> 
            )}
        </Container>
    );
}

export default TipoIngreso;
