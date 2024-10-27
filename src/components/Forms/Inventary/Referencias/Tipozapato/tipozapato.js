import React, { useState } from 'react';
import { Container, TextField, Button, Grid,MenuItem, FormControl, InputLabel, Select } from '@mui/material';
import tipopublicoServices from '../../../../../service/tipopublico.services';
import GetTipoZapato from './getTipoZapato';
function ADDTipoZapato() {
    const [formData, setFormData] = useState({
        estilo: '',
        tipopublico: '',
        descripcion: '',
    });
    const [isVisible, setIsVisible] = useState(false); // Estado para controlar la visibilidad


    const handleChange = (event) => {
        setFormData({
            ...formData,
            [event.target.name]: event.target.value,
        });
    };

    const PostTipoZapato = async () => {
        const { estilo, tipopublico, descripcion } = formData;
        try {
            const response = await tipopublicoServices.addTipoPublico(estilo, tipopublico, descripcion);
            console.log('Tipo zapato añadido:', response);
            alert("Tipo de zapato agregado");
        } catch (error) {
            console.error('Error añadiendo tipo zapato:', error);
        }
    };

    const ButtonADD = () => {
        alert("Agregar: " + JSON.stringify(formData, null, 2));
        PostTipoZapato();
    };

    const toggleVisibility = () => {
        setIsVisible(!isVisible); // Cambia el valor del estado entre true y false
      };

    return (
        <Container maxWidth="md" sx={{ backgroundColor: '#121212', color: 'white', border: '2px solid #333',padding:'10px', borderRadius: '8px', opacity: 0.9 }}>
            TIPO ZAPATO
            <Grid container spacing={1} sx={{ display: 'flex', justifyContent: 'center', padding: '10px' }}>
            <Grid item xs={12} sm={3}>
                <FormControl variant="outlined" fullWidth>
                    <InputLabel sx={{ color: 'white' }}>Estilo</InputLabel>
                    <Select
                        label="Estilo"
                        name="estilo"
                        value={formData.estilo}
                        onChange={handleChange}
                        sx={{ color: 'white', backgroundColor: '#333' }}
                    >
                        <MenuItem value="zapatilla">Zapatilla</MenuItem>
                        <MenuItem value="bota">Bota</MenuItem>
                        <MenuItem value="sandalia">Sandalia</MenuItem>
                        <MenuItem value="mocasin">Mocasín</MenuItem>
                        <MenuItem value="tacon cubano">Tacón Cubano</MenuItem>
                        <MenuItem value="tacon punta">Tacón Punta</MenuItem>
                        <MenuItem value="playero">Playero</MenuItem>
                        <MenuItem value="zapato">Zapato</MenuItem>
                    </Select>
                </FormControl>
            </Grid>
                <Grid item xs={12} sm={3}>
                    <FormControl variant="outlined" fullWidth>
                        <InputLabel sx={{ color: 'white' }}>Tipo Público</InputLabel>
                        <Select
                            label="Tipo Público"
                            name="tipopublico"
                            value={formData.tipopublico}
                            onChange={handleChange}
                            sx={{ color: 'white', backgroundColor: '#333' }}
                        >
                            <MenuItem value="hombre">Hombre</MenuItem>
                            <MenuItem value="mujer">Mujer</MenuItem>
                            <MenuItem value="niña">Niña</MenuItem>
                        </Select>
                    </FormControl>
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
                        InputProps={{ style: { color: 'white', backgroundColor: '#333' } }}
                    />
                </Grid>
                <Grid item xs={12} display="flex" justifyContent="center" gap={2}>
                    <Button variant="outlined" color="primary" onClick={ButtonADD} sx={{ borderColor: 'white', color: 'white' }}>
                        AGREGAR
                    </Button>
                    <Button variant="outlined" color="primary" onClick={toggleVisibility} sx={{ borderColor: 'white', color: 'white' }}>
                        MOSTRAR
                    </Button>
                </Grid>
            </Grid>
            {isVisible && (
            <GetTipoZapato/> 
            )}
        </Container>
    );
}

export default ADDTipoZapato;

