import React, { useState } from 'react';
import { Container, TextField, Button, Box, Grid } from '@mui/material';

function ADDInventary() {
    const [formData, setFormData] = useState({
        cantidad: '',
        talla: '',
        idUsuario: '',
        descripcionLugar: '',
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

    const handleChange = (event) => {
        setFormData({
            ...formData,
            [event.target.name]: event.target.value,
        });
    };

    const ButtonAdd = () => {
        console.log(formData);
    };

    return (
        <Container maxWidth="lg" sx={{
            backgroundColor: '#121212', // Fondo estilo dark
            color: 'white', // Texto claro para contrastar
            border: '2px solid #333', // Borde oscuro
            borderRadius: '8px',
            opacity: 0.9, // Transparencia ligera
            boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.7)', // Sombra más oscura
            backdropFilter: 'blur(10px)', // Desenfoque de fondo
            padding: '20px',
        }}>
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
                        label="Lugar"
                        variant="outlined"
                        name="descripcionLugar"
                        value={formData.descripcionLugar}
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
                    <TextField
                        label="Público"
                        variant="outlined"
                        name="tipoPublicoTipoZapato"
                        value={formData.tipoPublicoTipoZapato}
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

                <Grid item xs={12}>
                    <Box display="flex" justifyContent="center" gap={2}>
                        <Button variant="outlined" color='primary' onClick={ButtonAdd} sx={{ borderColor: 'white', color: 'white' }}>
                            AGREGAR
                        </Button>

                        <Button variant="outlined" color='primary' onClick={ButtonAdd} sx={{ borderColor: 'white', color: 'white' }}>
                            ACTUALIZAR
                        </Button>
                    </Box>
                </Grid>
            </Grid>
        </Container>
    );
}

export default ADDInventary;
