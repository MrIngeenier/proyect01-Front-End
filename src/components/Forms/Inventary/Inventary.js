import React, { useState, useEffect } from 'react';
import { Container, TextField, Button, Box, Grid, FormControl, InputLabel, Select, MenuItem,Autocomplete  } from '@mui/material';
import { useForm, Controller } from 'react-hook-form';
import inventaryServices from '../../../service/inventary.services';


function ADDInventary() {
    const [formData, setFormData] = useState({
        empresa:'',
        cantidad: '',
        talla: '',
        idUsuario: '',
        descripcionLugar: '',
        serialReferencia: '',
        tipoPublicoTipoZapato: ''
        
    });

    const [places, setPlaces] = useState([]); // Estado para almacenar lugares
    const [publico, setPublico] = useState([]); // Estado para almacenar publico
    const [empresas, setEmpresas] = useState([]); // Estado para almacenar lugares
    const [referencias, setReferencias] = useState([]); // Estado para almacenar lugares
    const token = localStorage.getItem('token');

    const { control } = useForm(); // Inicializa useForm


    const handleChange = (event) => {
        setFormData({
            ...formData,
            [event.target.name]: event.target.value
            
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

    function decodeJWT(token) {
        if (!token) {
            console.error("No token provided");
            return null;
        }
    
        const parts = token.split('.');
        if (parts.length !== 3) {
            console.error("Invalid token format");
            return null;
        }
    
        const payload = parts[1];
    
        // Decodificar la carga útil de base64 a un objeto JSON
        try {
            const decodedPayload = atob(payload);
            const parsedPayload = JSON.parse(decodedPayload);
            return parsedPayload;
        } catch (error) {
            console.error("Error decoding token payload:", error);
            return null;
        }
    }
    

    function showJWT() {
        const myToken = token; // Asegúrate de que 'token' esté definido y tenga el valor correcto
        //console.log("My token: " + myToken);
        const decodedData = decodeJWT(myToken);
        setFormData((prev) => ({
            ...prev,
            idUsuario: decodedData.userId 
        }));
       // console.log("DecodeJWT:", decodedData.userId);
    }

    const FetchAddInventary = async (event) => {
    
        try {
            // Llama a tu servicio para agregar el inventario, pasando los valores necesarios
            const result = await inventaryServices.addInventary(
                formData.tipoPublicoTipoZapato, // Asegúrate de que este campo existe en formData
                formData.serialReferencia, // Este debería ser el id de la referencia seleccionada
                formData.descripcionLugar, // Este debería ser el id del lugar seleccionado
                formData.idUsuario, // Extrae idUsuario del estado
                formData.cantidad, // Extrae cantidad del estado
                formData.talla // Extrae talla del estado
            );
    
            alert('Inventario agregado exitosamente');
            console.log('Resultado del inventario agregado:', result); // Puedes hacer algo con el resultado, como limpiar el formulario o redirigir
           
        } catch (error) {
            console.error('Error agregando inventario:', error);
            alert('Error al agregar inventario'); // Muestra un mensaje de error
        }
    };
    
    
    

    useEffect(() => {
        
        fetchPlaces(); // Cargar lugares al montar el componente
        fetchPublico();
        fetchEmpresas();
        fetchReferencia();
        showJWT();
    }, []);

    const ButtonUpdate = () => {
        fetchPlaces();
        fetchPublico();
        fetchEmpresas();
        fetchReferencia();
        
    };

    const ButtonADD = () => {
        //showJWT();
        FetchAddInventary();
        console.log("Form Data:", formData); // Agrega esta línea para depurar

        //alert("Agregar: " + JSON.stringify(formData, null, 2));
        //console.log(formData);
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
                
            <Grid item xs={12} sm={4}>
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
                                    variant="outlined"
                                    fullWidth
                                    InputLabelProps={{ style: { color: 'white' } }}
                                    InputProps={{
                                        ...params.InputProps,
                                        style: {
                                            color: 'white',
                                            backgroundColor: '#333',
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
                                getOptionLabel={(option) => `${option.serial} / ${option.color}` || ""} // Muestra serial y color
                                freeSolo // Permite escribir libremente
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
                                        {`${option.serial} / ${option.color}`}
                                    </li>
                                )}
                                renderInput={(params) => (
                                    <TextField
                                        {...params}
                                        label="Referencia"
                                        variant="outlined"
                                        fullWidth
                                        InputLabelProps={{ style: { color: 'white' } }}
                                        InputProps={{
                                            ...params.InputProps,
                                            style: {
                                                color: 'white',
                                                backgroundColor: '#333',
                                            },
                                        }}
                                    />
                                )}
                            />
                        )}
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
                    <FormControl fullWidth>
                        <InputLabel style={{ color: 'white' }}>Lugar</InputLabel>
                        <Select
                            variant="outlined"
                            name="tipoPublicoTipoZapato"
                            value={formData.tipoPublicoTipoZapato }
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
                    <FormControl fullWidth>
                        <InputLabel style={{ color: 'white' }}>Tipo</InputLabel>
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
                                    {publico.tipopublico + "/" + publico.descripcion}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </Grid>

                {/* --------------------------------------------------------------*/}
                    
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
