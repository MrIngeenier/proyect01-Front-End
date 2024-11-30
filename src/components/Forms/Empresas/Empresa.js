import React, { useState } from 'react';
import { Container, TextField, Button, Grid } from '@mui/material';
import EmpresaServices from '../../../service/empresa.services';
import GetEmpresa from './GetEmpresa';
function ADDEmpresa() {
    const [formData, setFormData] = useState({
        nombre: '',
        nit: '',
    });
    const [isVisible, setIsVisible] = useState(false); // Estado para controlar la visibilidad


    const handleChange = (event) => {
        setFormData({
            ...formData,
            [event.target.name]: event.target.value,
        });
    };

    const FetchAddEmpresa = async () => {
        const { nombre, nit } = formData;
        try {
            const response = await EmpresaServices.addEmpresa(nombre, nit);
            console.log('Empresa añadido:', response);
            alert("Empresa agregado");
        } catch (error) {
            console.error('Error añadiendo Empresa:', error);
        }
    };

    const ButtonADD = () => {
        alert("Agregar: " + JSON.stringify(formData, null, 2));
        FetchAddEmpresa();
    };

    const toggleVisibility = () => {
        setIsVisible(!isVisible); // Cambia el valor del estado entre true y false
      };

    return (
        <Container maxWidth="md" sx={{ backgroundColor: '#121212', color: 'white', border: '2px solid #333',padding:'10px', borderRadius: '8px', opacity: 0.9 }}>
            EMPRESA
            <Grid container spacing={1} sx={{ display: 'flex', justifyContent: 'center', padding: '10px' }}>
           
                
                <Grid item xs={12} sm={3}>
                    <TextField
                        label="Nombre"
                        variant="outlined"
                        name="nombre"
                        value={formData.nombre}
                        onChange={handleChange}
                        fullWidth
                        InputLabelProps={{ style: { color: 'white' } }}
                        InputProps={{ style: { color: 'white', backgroundColor: '#333' } }}
                    />
                    
                </Grid>
                <Grid item xs={12} sm={3}>
                    <TextField
                        label="Nit"
                        variant="outlined"
                        name="nit"
                        value={formData.nit}
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
            <GetEmpresa/> 
            )}
        </Container>
    );
}

export default ADDEmpresa;

