import React, { useState, useEffect } from 'react';
import { Container, TextField, Button, Box, Grid, FormControl, InputLabel, Select, MenuItem  } from '@mui/material';
import inventaryServices from '../../../../service/inventary.services';

function ADDReferences() {
    const [formData, setFormData] = useState({
        tipozapatoid: '',
        color: '',
        serial: '',
        descripcion: '',
    });

    const [publico, setPublico] = useState([]); // Estado para almacenar publico
// , ,descripcion,


    const handleChange = (event) => {
        setFormData({
            ...formData,
            [event.target.name]: event.target.value,
        });
    };

    
    const fetchPublico = async () => {
        try {
            const response = await inventaryServices.getPublico();
            setPublico(response); // Asignar la respuesta al estado
            if (response.length > 0) {
                setFormData((prev) => ({
                    ...prev,
                }));
            }
        } catch (error) {
            console.error('Error fetching users:', error);
        }
    };

    const PostReferences = async () => {
        const { color, serial, descripcion, tipozapatoid } = formData;
        try {
            const response = await inventaryServices.addReferences(
                color,
                serial,
                descripcion,
                tipozapatoid
            );
            console.log('Referencia añadida:', response);
            alert("Referencia Agregada");
        } catch (error) {
            console.error('Error añadiendo referencia:', error);
        }
    };



    useEffect(() => {
        fetchPublico();
    }, []);

    const ButtonUpdate = () => {
        fetchPublico();
    };

    const ButtonADD = () => {
        alert("Agregar: " + JSON.stringify(formData, null, 2));
        PostReferences();
        //console.log(formData);
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
            padding: '20px',
        }}>
            PRODUCTOS
            <Grid container spacing={1} sx={{display:'flex',justifyContent:'center', padding:'10px'}} >
                
        

            <Grid item xs={12} sm={2}>
                    <TextField
                        label="Referencia"
                        variant="outlined"
                        name="serial"
                        value={formData.serial}
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
                

                <Grid item xs={12} sm={2}>
                    <TextField
                        label="Color"
                        variant="outlined"
                        name="color"
                        value={formData.color}
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
                    
               
                <Grid item xs={12} sm={3}>
                    <TextField
                        label="Descripción"
                        variant="outlined"
                        name="descripcion"
                        value={formData.descripcion}
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


                <Grid item xs={12} sm={4}>
                    <FormControl fullWidth>
                        <InputLabel style={{ color: 'white' }}>Tipo</InputLabel>
                        <Select
                            variant="outlined"
                            name="tipozapatoid"
                            value={formData.tipozapatoid}
                            onChange={handleChange}
                            label="Lugar"
                            style={{ color: 'white', backgroundColor: '#333' }}
                            inputProps={{ style: { color: 'white' } }}
                        >
                            {publico.map((publico) => (
                                <MenuItem key={publico.id} value={publico.id}>
                                    {publico.tipopublico +"/"+ publico.estilo+"/"+ publico.descripcion}
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
                        <Button variant="outlined" color='primary' onClick={ButtonUpdate} sx={{ borderColor: 'white', color: 'white' }}>
                            MOSTRAR
                        </Button>
                    </Box>
                </Grid>

                
            </Grid>
        </Container>
    );
}

export default ADDReferences;
