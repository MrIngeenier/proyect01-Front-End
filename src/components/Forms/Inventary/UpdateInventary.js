import { Container, TextField, Button, Box, Grid, Autocomplete } from '@mui/material';
import React, { useState, useEffect } from 'react';
import inventaryServices from '../../../service/inventary.services';
import { useForm, Controller } from 'react-hook-form';

function UpdateInventary() {
    const [formData, setFormData] = useState({
        empresa: '',
        color: '',
        serial: '',
        descripcion: '',
        num34:'0',
        num35:'0',
        num36:'0',
        num37:'0',
        num38:'0',
        num39:'0',
        num40:'0'
    });

    const [referencias, setReferencias] = useState([]); // Estado para almacenar lugares
    const [empresas, setEmpresas] = useState([]); // Estado para almacenar lugares

    const { control } = useForm(); // Inicializa useForm


    const fetchReferencia = async () => {
        try {
            const response = await inventaryServices.getReferencia();


            setReferencias(response); // Asignar la respuesta al estado
            if (response.length > 0) {
                setFormData((prev) => ({
                    ...prev,
                    empresa: response[0].id
                    
                }));
            }
        } catch (error) {
            console.error('Error fetching Refernceses:', error);
        }
    };

    const fetchEmpresas = async () => {
        try {
            const response = await inventaryServices.getEmpresa();
            setEmpresas(response); // Asignar la respuesta al estado
            if (response.length > 0) {
                setFormData((prev) => ({
                    ...prev,
                    empresa: response[0].id, // Establece el primer lugar como valor por defecto
                }));
            }
        } catch (error) {
            console.error('Error fetching Empresas:', error);
        }
    };

    const handleUpdate = async (event) => {
        event.preventDefault();
        if(formData.empresa ==='' || formData.color==='' || formData.serialReferencia===''){
            alert("Faltan datos");
        }else{
            alert(`Datos del formulario:
                Empresa: ${formData.empresa}
                Color: ${formData.color}
                Serial: ${formData.serialReferencia}
                Num34: ${formData.num34}
                Num35: ${formData.num35}
                Num36: ${formData.num36}
                Num37: ${formData.num37}
                Num38: ${formData.num38}
                Num39: ${formData.num39}
                Num40: ${formData.num40}
            `);    
        }
        
        
      };

      
    

      const handleClose = async (item) => {
      //  onUpdate(false);
        alert("Mostrar")
    }

    useEffect(() => {
        fetchReferencia();
        fetchEmpresas();
    }, []);


    return ( 
        <>
           
           <Box onClick={handleClose} sx={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            backgroundColor: 'black',
            opacity: 0.9,
            zIndex: 1, 
            backdropFilter: 'blur(100px)',
            
            }} />

            <Box sx={{
            position: 'fixed',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            zIndex: 10, 
            background: 'red',
            padding: '20px',
            backgroundColor: '#121212',
            color: 'white',
            border: '2px solid #333',
            borderRadius: '8px',
            opacity: 0.9,
            boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.7)',
            backdropFilter: 'blur(10px)',
            overflowY: 'auto',
            
            height: {
                xs: '80%', // 100% de ancho en pantallas pequeñas (xs)
                sm: '50%',  // 80% de ancho en pantallas medianas (sm)
                md: '40%',  // 60% de ancho en pantallas grandes (md)
                lg: '30%',  // 50% de ancho en pantallas extra grandes (lg)
            }, // Definimos una altura fija para el contenido desplazable
            width: {
                xs: '80%', // 100% de ancho en pantallas pequeñas (xs)
                sm: '80%',  // 80% de ancho en pantallas medianas (sm)
                md: '60%',  // 60% de ancho en pantallas grandes (md)
                lg: '60%',  // 50% de ancho en pantallas extra grandes (lg)
            },
            }}>
                <Grid container spacing={2}  fullWidth  >
                    <Grid item xs={12} sm={3} >
                    <Controller
                        name="empresa"
                        control={control}
                        defaultValue=""
                        value={formData.empresa}
                        render={({ field }) => (
                            <Autocomplete
                                {...field}
                                options={empresas} // Usa el objeto completo
                                getOptionLabel={(option) => option.nombre || ""} // Asegúrate de que devuelva una cadena válida
                                freeSolo // Permite escribir libremente

                                onChange={(event, newValue) => {
                                    const selectedId = newValue ? newValue.id : "";
                                    field.onChange(newValue); // Actualiza el valor con el objeto completo

                                    setFormData((prevData) => ({
                                        ...prevData,
                                        empresa: selectedId, // Actualiza formData.empresa con el selectedId
                                    }));
                                }}

                                renderInput={(params) => (
                                    <TextField
                                        {...params}
                                        label="Empresa"
                                        style={{ color: 'white', backgroundColor: '#333' }}
                                        variant="outlined"
                                        fullWidth
                                        InputLabelProps={{ style: { color: 'white' } }} // Color de la etiqueta
                                        sx={{
                                            '& .MuiOutlinedInput-root .MuiOutlinedInput-input': {
                                                color: 'white', // Cambia el color del texto
                                            },
                                        }}
                                
                                        
                                    />
                                )}
                            />
                        )}
                    />
                </Grid>

                    <Grid item xs={12} sm={4}>
                    <Controller
                        name="serialReferencia"
                        control={control}
                        defaultValue=""
                        render={({ field }) => (
                            <Autocomplete
                                {...field}
                                options={referencias} // Usa el objeto completo
                                getOptionLabel={(option) => `${option.serial} / ${option.color} / ${option.tipopublico}` || ""} // Muestra serial y color
                                freeSolo // Permite escribir libremente
                                style={{ color: 'white', backgroundColor: '#333' }}
                                onChange={(event, newValue) => {
                                    const selectedId = newValue ? newValue.id : "";
                                    field.onChange(newValue); // Actualiza el valor con el objeto completo

                                    setFormData((prevData) => ({
                                        ...prevData,
                                        serialReferencia: selectedId, // Actualiza formData.serialReferencia con el selectedId
                                    }));
                                }}
                                renderOption={(props, option) => (
                                    <li {...props} key={option.id}> 
                                        {`${option.serial} / ${option.color} / ${option.tipopublico}`}
                                    </li>
                                )}
                                renderInput={(params) => (
                                    <TextField
                                        {...params}
                                        label="Referencia"
                                        variant="outlined"
                                        fullWidth
                                        InputLabelProps={{ style: { color: 'white' } }} // Color de la etiqueta
                                        sx={{
                                            '& .MuiOutlinedInput-root .MuiOutlinedInput-input': {
                                                color: 'white', // Cambia el color del texto
                                            },
                                        }}
                                
                                        
                                    />
                                )}
                            />
                        )}
                    />
                </Grid>     

                    <Grid item xs={12} sm={3}>
                        <TextField
                            label="Color"
                            variant="outlined"
                            name="color"
                            value={formData.color}
                            onChange={(e) => setFormData({ ...formData, color: e.target.value })}
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
                            label="#34"
                            variant="outlined"
                            name="num34"  // Asegúrate de que el nombre sea consistente
                            value={formData.num34}
                            onChange={(e) => setFormData({ ...formData, num34: e.target.value })}
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
                            label="#35"
                            variant="outlined"
                            name="num35"  // Asegúrate de que el nombre sea consistente
                            value={formData.num35}
                            onChange={(e) => setFormData({ ...formData, num35: e.target.value })}
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
                            label="#36"
                            variant="outlined"
                            name="num36"  // Asegúrate de que el nombre sea consistente
                            value={formData.num36}
                            onChange={(e) => setFormData({ ...formData, num36: e.target.value })}
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
                            label="#37"
                            variant="outlined"
                            name="num37"  // Asegúrate de que el nombre sea consistente
                            value={formData.num37}
                            onChange={(e) => setFormData({ ...formData, num37: e.target.value })}
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
                            label="#38"
                            variant="outlined"
                            name="num38"  // Asegúrate de que el nombre sea consistente
                            value={formData.num38}
                            onChange={(e) => setFormData({ ...formData, num38: e.target.value })}
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
                            label="#39"
                            variant="outlined"
                            name="num39"  // Asegúrate de que el nombre sea consistente
                            value={formData.num39}
                            onChange={(e) => setFormData({ ...formData, num39: e.target.value })}
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
                            label="#40"
                            variant="outlined"
                            name="num40"  // Asegúrate de que el nombre sea consistente
                            value={formData.num40}
                            onChange={(e) => setFormData({ ...formData, num40: e.target.value })}
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
                    <Button variant="contained" color="success" sx={{ marginTop: 4, marginLeft:1 }} fullWidth onClick={handleUpdate}>
                    Actualizar
                    </Button> 
                    <Button variant="contained" color="error" sx={{ marginTop: 4, marginLeft:1 }} fullWidth onClick={handleClose}>
                    Cerrar
                    </Button> 
                </Grid>
            </Box>
        </>
    );
}

export default UpdateInventary;
