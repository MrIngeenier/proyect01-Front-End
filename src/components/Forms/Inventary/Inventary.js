import React, { useState, useEffect } from 'react';
import { Container, TextField, Button, Box, Grid, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import inventaryServices from '../../../service/inventary.services';

function ADDInventary() {
    const [formData, setFormData] = useState({
        cantidad: '',
        talla: '',
        idUsuario: '',
        descripcionLugar: '', // Asegúrate de que este campo esté inicializado
        activoLugar: '',
        descripcionTipoIngreso: '',
        valorTipoIngreso: '',
        colorReferencia: '',
        serialReferencia: '',
        descripcionReferencia: '',
        estiloTipoZapato: '',
        tipoPublicoTipoZapato: '',
        descripcionTipoZapato: '',
    });

    const [places, setPlaces] = useState([]); // Estado para almacenar lugares
    const [publico, setPublico] = useState([]); // Estado para almacenar lugares

    const handleChange = (event) => {
        setFormData({
            ...formData,
            [event.target.name]: event.target.value,
        });
    };

    const fetchPlaces = async () => {
        try {
            const response = await inventaryServices.getPlaces();
            setPlaces(response); // Asignar la respuesta al estado
            // Si deseas, puedes establecer un valor por defecto aquí
            if (response.length > 0) {
                setFormData((prev) => ({
                    ...prev,
                    descripcionLugar: response[0].id, // Establece el primer lugar como valor por defecto
                }));
            }
        } catch (error) {
            console.error('Error fetching users:', error);
        }
    };

    const fetchPublico = async () => {
        try {
            const response = await inventaryServices.getPublico();
            setPublico(response); // Asignar la respuesta al estado
            if (response.length > 0) {
                setFormData((prev) => ({
                    ...prev,
                    tipoPublicoTipoZapato: response[0].id, // Establece el primer lugar como valor por defecto
                }));
            }
        } catch (error) {
            console.error('Error fetching users:', error);
        }
    };


    useEffect(() => {
        fetchPlaces(); // Cargar lugares al montar el componente
        fetchPublico();
    }, []);

    const ButtonUpdate = () => {
        fetchPlaces();
        fetchPublico();
    };

    const ButtonADD = () => {
        alert("Agregar");
        console.log(formData);
    };

    return (
        <Container maxWidth="lg" sx={{
            backgroundColor: '#121212',
            color: 'white',
            border: '2px solid #333',
            borderRadius: '8px',
            opacity: 0.9,
            boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.7)',
            backdropFilter: 'blur(10px)',
            padding: '20px',
        }}>
            Inventary
            <Grid container spacing={1}>
                
            <Grid item xs={12} sm={1}>
                    <TextField
                        label="Empresa"
                        variant="outlined"
                        name="descripcionTipoIngreso"
                        value={formData.descripcionTipoIngreso}
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

                    

                    
                <Grid item xs={12} sm={1}>
                    <TextField
                        label="Referencia"
                        variant="outlined"
                        name="serialReferencia"
                        value={formData.serialReferencia}
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

                <Grid item xs={12} sm={1}>
                    <TextField
                        label="Color"
                        variant="outlined"
                        name="colorReferencia"
                        value={formData.colorReferencia}
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
                    
                <Grid item xs={12} sm={1}>
                    <TextField
                        label="Talla"
                        variant="outlined"
                        name="talla"
                        value={formData.talla}
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


                <Grid item xs={12} sm={1}>
                    <TextField
                        label="Cantidad"
                        variant="outlined"
                        name="cantidad"
                        value={formData.cantidad}
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
                
                <Grid item xs={12} sm={1}>
                    <TextField
                        label="Valor"
                        variant="outlined"
                        name="valorTipoIngreso"
                        value={formData.valorTipoIngreso}
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

                <Grid item xs={12} sm={1}>
                    <TextField
                        label="Estado"
                        variant="outlined"
                        name="activoLugar"
                        value={formData.activoLugar}
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


                <Grid item xs={12} sm={1}>
                    <TextField
                        label="Descripción"
                        variant="outlined"
                        name="descripcionReferencia"
                        value={formData.descripcionReferencia}
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

                <Grid item xs={12} sm={1}>
                    <TextField
                        label="Estilo"
                        variant="outlined"
                        name="estiloTipoZapato"
                        value={formData.estiloTipoZapato}
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

                

                <Grid item xs={12} sm={1}>
                    <FormControl fullWidth>
                        <InputLabel style={{ color: 'white' }}>Lugar</InputLabel>
                        <Select
                            variant="outlined"
                            name="tipoPublicoTipoZapato"
                            value={formData.tipoPublicoTipoZapato}
                            onChange={handleChange}
                            label="Publico"
                            style={{ color: 'white', backgroundColor: '#333' }}
                            inputProps={{ style: { color: 'white' } }}
                        >
                            {places.map((place) => (
                                <MenuItem key={place.id} value={place.id}>
                                    {place.Descripcion}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </Grid>

                <Grid item xs={12} sm={1}>
                    <TextField
                        label="Descripción (Tipo Zapato)"
                        variant="outlined"
                        name="descripcionTipoZapato"
                        value={formData.descripcionTipoZapato}
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


                <Grid item xs={12} sm={1}>
                    <FormControl fullWidth>
                        <InputLabel style={{ color: 'white' }}>Lugar</InputLabel>
                        <Select
                            variant="outlined"
                            name="descripcionLugar"
                            value={formData.descripcionLugar}
                            onChange={handleChange}
                            label="Lugar"
                            style={{ color: 'white', backgroundColor: '#333' }}
                            inputProps={{ style: { color: 'white' } }}
                        >
                            {publico.map((publico) => (
                                <MenuItem key={publico.id} value={publico.id}>
                                    {publico.tipopublico}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </Grid>

                {/* Otros campos... */}
                    
                <Grid item xs={12}>
                    <Box display="flex" justifyContent="center" gap={2}>
                        <Button variant="outlined" color='primary' onClick={ButtonADD} sx={{ borderColor: 'white', color: 'white' }}>
                            AGREGAR
                        </Button>

                        <Button variant="outlined" color='primary' onClick={ButtonUpdate} sx={{ borderColor: 'white', color: 'white' }}>
                            ACTUALIZAR
                        </Button>
                    </Box>
                </Grid>
            </Grid>
        </Container>
    );
}

export default ADDInventary;
