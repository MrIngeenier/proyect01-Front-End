import React, { useState, useEffect } from 'react';
import { Container, TextField, Button, Box, Grid, FormControl, InputLabel, Select, MenuItem,Autocomplete  } from '@mui/material';
import { useForm, Controller } from 'react-hook-form';
import inventaryServices from '../../../service/inventary.services';
//import { color } from 'chart.js/helpers';
import ErrorAlert from '../../Alerts/ErrorAlert';
import SuccessAlert from '../../Alerts/SuccesAlert';

function ADDInventary() {
    const [formData, setFormData] = useState({
        empresa:'',

        talla34: '34',
        cantidad34: '0',

        talla35: '35',
        cantidad35: '0',

        talla36: '36',
        cantidad36: '0',

        talla37: '37',
        cantidad37: '0',

        talla38: '38',
        cantidad38: '0',

        cantidad39: '0',
        talla39: '39',

        cantidad40: '0',
        talla40: '40',

        cantidad41: '0',
        talla41: '41',
        
        cantidad42: '0',
        talla42: '42',

        cantidad43: '0',
        talla43: '43',
        
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
     const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const [errorOpen, setErrorOpen] = useState(false);
    const [successOpen, setSuccessOpen] = useState(false);
    const handleErrorClose = () => setErrorOpen(false);
    const handleSuccessClose = () => setSuccessOpen(false);
    const fetchPlaces = async () => {
        try {
            const response = await inventaryServices.getPlaces();
            setPlaces(response); // Asignar la respuesta al estado
            // Si deseas, puedes establecer un valor por defecto aquí
            if (response.length > 0) {
                setFormData((prev) => ({
                    ...prev,
                    descripcionLugar: response[0].id
                }));
            }
        } catch (error) {
            console.error('Error fetching users:', error);
        }
    };

    const fetchTipoIngreso = async () => {
        try {
            const response = await inventaryServices.getTipoIngreso();
            setPublico(response); // Asignar la respuesta al estado
           // console.log("Tipo Ingreso:", JSON.stringify(publico, null, 2));
            if (response.length > 0) {
                setFormData((prev) => ({
                    ...prev,
                    tipoPublicoTipoZapato: response[0].id
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

    // tipoingresoid,referenciaid, ubicacionesproductoid,usuarioid,cantidad,talla
    
// tipoingresoid, referenciaid, ubicacionesproductoid, usuarioid, cantidad, talla, empresaid
    const FetchAddInventary = async (event) => {
        try {
           // console.log("Cantidad :", formData.cantidad);
            //var idUser = formData.cantidad;
            //var cantidad = formData.idUsuario; 
            //var tipo = formData.tipoPublicoTipoZapato;
            //var Lugar = formData.descripcionLugar;
            var tipoingresoid = formData.tipoPublicoTipoZapato;
            var referenciaid = formData.serialReferencia;
            var ubicacionesproductoid = formData.descripcionLugar;
            var usuarioid = formData.idUsuario;
            var empresaid = formData.empresa;

            alert("LUGAR: "+tipoingresoid+" REF:"+referenciaid+" ESTADO: "
                +ubicacionesproductoid+" USUARIO: "+usuarioid+" CANTIDAD: "+formData.cantidad34
                +" TALLA: "+formData.talla34+" EMPRESA: "+empresaid);

           if(tipoingresoid ==='' || referenciaid==='' ||ubicacionesproductoid ==='' ||usuarioid  ===''||empresaid  ===''){
            //console.error('Error agregando inventario: Faltan');
            setErrorMessage('Error agregando inventario: Faltan datos.');
            setErrorOpen(true);
           }else{
            await inventaryServices.addInventaryPro(
                ubicacionesproductoid,
                referenciaid,
                tipoingresoid ,
                usuarioid,
                formData.cantidad34,
                formData.talla34,
                empresaid
            );

            await inventaryServices.addInventaryPro(
                ubicacionesproductoid,
                referenciaid,
                tipoingresoid ,
                usuarioid,
                formData.cantidad35,
                formData.talla35,
                empresaid
            );

            await inventaryServices.addInventaryPro(
                ubicacionesproductoid,
                referenciaid,
                tipoingresoid ,
                usuarioid,
                formData.cantidad36,
                formData.talla36,
                empresaid
            );
            await inventaryServices.addInventaryPro(
                ubicacionesproductoid,
                referenciaid,
                tipoingresoid ,
                usuarioid,
                formData.cantidad37,
                formData.talla37,
                empresaid
            );
            await inventaryServices.addInventaryPro(
                ubicacionesproductoid,
                referenciaid,
                tipoingresoid ,
                usuarioid,
                formData.cantidad38,
                formData.talla38,
                empresaid
            );

            await inventaryServices.addInventaryPro(
                ubicacionesproductoid,
                referenciaid,
                tipoingresoid ,
                usuarioid,
                formData.cantidad39,
                formData.talla39,
                empresaid
            );

            await inventaryServices.addInventaryPro(
                ubicacionesproductoid,
                referenciaid,
                tipoingresoid ,
                usuarioid,
                formData.cantidad40,
                formData.talla40,
                empresaid
            );

            await inventaryServices.addInventaryPro(
                ubicacionesproductoid,
                referenciaid,
                tipoingresoid ,
                usuarioid,
                formData.cantidad41,
                formData.talla41,
                empresaid
            );

            await inventaryServices.addInventaryPro(
                ubicacionesproductoid,
                referenciaid,
                tipoingresoid ,
                usuarioid,
                formData.cantidad42,
                formData.talla42,
                empresaid
            );

            await inventaryServices.addInventaryPro(
                ubicacionesproductoid,
                referenciaid,
                tipoingresoid ,
                usuarioid,
                formData.cantidad43,
                formData.talla43,
                empresaid
            );

            
            
           }
            
            setSuccessMessage("Inventario agregado exitosamente.");
            setSuccessOpen(true);
            
        } catch (error) {
            console.error('Error agregando inventario:', error);
            alert('Error al agregar inventario');
        }
    };

    const FetchAddEmpresa = async (event) => {
        try {
           // console.log("Cantidad :", formData.cantidad);
            
            // Llama al servicio pasando el objeto completo {empresaid, referenciaid}
            const result = await inventaryServices.addEmpresaRef(formData.empresa,formData.serialReferencia);
           // alert('Empresa Referencia agregado exitosamente');
            console.log('Agregado al [INVENTARIO]:', result);
        } catch (error) {
            setErrorMessage('Error - No se puede agregado al [INVENTARIO].');
            setErrorOpen(true);
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
    
    
    
    
    

    useEffect(() => {
        showJWT();
        fetchPlaces(); // Cargar lugares al montar el componente
        fetchEmpresas();
        fetchReferencia();
        fetchTipoIngreso();
    }, []);

    const ButtonUpdate = () => {
      //  fetchPlaces();
       // fetchEmpresas();
       // fetchReferencia();
        fetchTipoIngreso();
       
        //console.log(data);
        
    };

    /*const fetchInventary = async () => {
        try {
            const response = await inventaryServices.getInventary();
            console.log('Response from backend:', response); // Verifica la estructura de los datos aquí

           // setData(response); // Asignar la respuesta al estado
        } catch (error) {
            console.error('Error fetching inventory:', error);
        }
    };*/
    //const ButtonADD = () => {
      //  event.preventDefault();
        //showJWT();
       // FetchAddInventary();
        //FetchAddEmpresa();
        //console.log("Form Data:", formData); // Agrega esta línea para depurar

        //alert("Agregar: " + JSON.stringify(formData, null, 2));
        //console.log(formData);
    //};

    const ButtonADD = (event) => {
        event.preventDefault();
        //showJWT();
        // ---------------------- Aqui --------------------
        FetchAddInventary();
        //FetchAddEmpresa();
        //fetchInventary();
        //console.log("Form Data:", formData); // Muestra el objeto completo
       // alert(JSON.stringify(formData, null, 2));

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
                
            <Grid item xs={12} sm={3}>
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


                <Grid item xs={12} sm={3}>
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
                    <FormControl fullWidth>
                        <InputLabel style={{ color: 'white' }}>Lugar</InputLabel>
                        <Select
                            variant="outlined"
                            name="tipoPublicoTipoZapato"
                            value={formData.tipoPublicoTipoZapato }
                            onChange={(event) => {
                                const selectedId = event.target.value;
                                console.log("Selected ID Lugar:", selectedId);  // Verifica el valor seleccionado
    
                                setFormData((prevData) => ({
                                    ...prevData,
                                    tipoPublicoTipoZapato: selectedId, // Actualiza formData.talla con el selectedId
                                }));
                            }}
                            fullWidth
                            
                            label="Publico"
                            style={{ color: 'white', backgroundColor: '#333' }}
                        >
                            {places.map((place) => (
                                <MenuItem key={place.id} value={place.id}>
                                    {place.Descripcion}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </Grid>

               

                <Grid item xs={12} sm={3}>
                    <FormControl fullWidth>
                        <InputLabel style={{ color: 'white' }}>Tipo</InputLabel>
                        <Select
                            variant="outlined"
                            name="descripcionLugar"
                            value={formData.descripcionLugar} 
                            onChange={(event) => {
                                const selectedId = event.target.value;
                                setFormData((prevData) => ({
                                    ...prevData,
                                    descripcionLugar: selectedId, // Actualiza formData.talla con el selectedId
                                }));
                            }}
                            label="Lugar"
                            style={{ color: 'white', backgroundColor: '#333' }}
                        >{publico.map((place) => (
                            <MenuItem key={place.id} value={place.id}>
                                {place.descripcion}
                            </MenuItem>
                        ))}
                            
                        </Select>
                    </FormControl>
                </Grid>

                <Grid item xs={12} sm={1}>
                <TextField
                    label="#34"
                    variant="outlined"
                    name="cantidad34"
                    value={formData.cantidad34}
                    onChange={(event) => {
                        const { name: fieldName, value } = event.target;  // Renombramos 'name' a 'fieldName'
                        setFormData((prevData) => ({
                            ...prevData,
                            [fieldName]: value,  // Usamos el nuevo nombre 'fieldName'
                        }));
                    }}
                    fullWidth
                    type="number"
                    InputProps={{
                        style: { color: 'white', backgroundColor: '#333' },
                    }}
                    InputLabelProps={{
                        style: { color: 'white' },
                    }}
                />
            </Grid>

                <Grid item xs={12} sm={1}>
                    <TextField
                        label="#35"
                        variant="outlined"
                        name="cantidad35"
                        value={formData.cantidad35}
                        onChange={(event) => {
                            const { name: fieldName, value } = event.target;  // Renombramos 'name' a 'fieldName'
                            setFormData((prevData) => ({
                                ...prevData,
                                [fieldName]: value,  // Usamos el nuevo nombre 'fieldName'
                            }));
                        }}
                        fullWidth
                        type="number"
                        InputProps={{
                            style: { color: 'white', backgroundColor: '#333' }, // Color del texto y fondo del input
                        }}
                        InputLabelProps={{
                            style: { color: 'white' }, // Color de la etiqueta
                        }}
                    />
                </Grid>

                <Grid item xs={12} sm={1}>
                    <TextField
                        label="#36"
                        variant="outlined"
                        name="cantidad36"
                        value={formData.cantidad36}
                        onChange={(event) => {
                            const { name: fieldName, value } = event.target;  // Renombramos 'name' a 'fieldName'
                            setFormData((prevData) => ({
                                ...prevData,
                                [fieldName]: value,  // Usamos el nuevo nombre 'fieldName'
                            }));
                        }}
                        fullWidth
                        type="number"
                        InputProps={{
                            style: { color: 'white', backgroundColor: '#333' }, // Color del texto y fondo del input
                        }}
                        InputLabelProps={{
                            style: { color: 'white' }, // Color de la etiqueta
                        }}
                    />
                </Grid>

                <Grid item xs={12} sm={1}>
                    <TextField
                        label="#37"
                        variant="outlined"
                        name="cantidad37"
                        value={formData.cantidad37}
                        onChange={(event) => {
                            const { name: fieldName, value } = event.target;  // Renombramos 'name' a 'fieldName'
                            setFormData((prevData) => ({
                                ...prevData,
                                [fieldName]: value,  // Usamos el nuevo nombre 'fieldName'
                            }));
                        }}
                        fullWidth
                        type="number"
                        InputProps={{
                            style: { color: 'white', backgroundColor: '#333' }, // Color del texto y fondo del input
                        }}
                        InputLabelProps={{
                            style: { color: 'white' }, // Color de la etiqueta
                        }}
                    />
                </Grid>

                <Grid item xs={12} sm={1}>
                    <TextField
                        label="#38"
                        variant="outlined"
                        name="cantidad38"
                        value={formData.cantidad38}
                        onChange={(event) => {
                            const { name: fieldName, value } = event.target;  // Renombramos 'name' a 'fieldName'
                            setFormData((prevData) => ({
                                ...prevData,
                                [fieldName]: value,  // Usamos el nuevo nombre 'fieldName'
                            }));
                        }}
                        fullWidth
                        type="number"
                        InputProps={{
                            style: { color: 'white', backgroundColor: '#333' }, // Color del texto y fondo del input
                        }}
                        InputLabelProps={{
                            style: { color: 'white' }, // Color de la etiqueta
                        }}
                    />
                </Grid>

                <Grid item xs={12} sm={1}>
                    <TextField
                        label="#39"
                        variant="outlined"
                        name="cantidad39"
                        value={formData.cantidad39}
                        onChange={(event) => {
                            const { name: fieldName, value } = event.target;  // Renombramos 'name' a 'fieldName'
                            setFormData((prevData) => ({
                                ...prevData,
                                [fieldName]: value,  // Usamos el nuevo nombre 'fieldName'
                            }));
                        }}
                        fullWidth
                        type="number"
                        InputProps={{
                            style: { color: 'white', backgroundColor: '#333' }, // Color del texto y fondo del input
                        }}
                        InputLabelProps={{
                            style: { color: 'white' }, // Color de la etiqueta
                        }}
                    />
                </Grid>

                <Grid item xs={12} sm={1}>
                    <TextField
                        label="#40"
                        variant="outlined"
                        name="cantidad40"
                        value={formData.cantidad40}
                        onChange={(event) => {
                            const { name: fieldName, value } = event.target;  // Renombramos 'name' a 'fieldName'
                            setFormData((prevData) => ({
                                ...prevData,
                                [fieldName]: value,  // Usamos el nuevo nombre 'fieldName'
                            }));
                        }}
                        fullWidth
                        type="number"
                        InputProps={{
                            style: { color: 'white', backgroundColor: '#333' }, // Color del texto y fondo del input
                        }}
                        InputLabelProps={{
                            style: { color: 'white' }, // Color de la etiqueta
                        }}
                    />
                </Grid>

                <Grid item xs={12} sm={1}>
                    <TextField
                        label="#41"
                        variant="outlined"
                        name="cantidad41"
                        value={formData.cantidad41}
                        onChange={(event) => {
                            const { name: fieldName, value } = event.target;  // Renombramos 'name' a 'fieldName'
                            setFormData((prevData) => ({
                                ...prevData,
                                [fieldName]: value,  // Usamos el nuevo nombre 'fieldName'
                            }));
                        }}
                        fullWidth
                        type="number"
                        InputProps={{
                            style: { color: 'white', backgroundColor: '#333' }, // Color del texto y fondo del input
                        }}
                        InputLabelProps={{
                            style: { color: 'white' }, // Color de la etiqueta
                        }}
                    />
                </Grid>
                <Grid item xs={12} sm={1}>
                    <TextField
                        label="#42"
                        variant="outlined"
                        name="cantidad42"
                        value={formData.cantidad42}
                        onChange={(event) => {
                            const { name: fieldName, value } = event.target;  // Renombramos 'name' a 'fieldName'
                            setFormData((prevData) => ({
                                ...prevData,
                                [fieldName]: value,  // Usamos el nuevo nombre 'fieldName'
                            }));
                        }}
                        fullWidth
                        type="number"
                        InputProps={{
                            style: { color: 'white', backgroundColor: '#333' }, // Color del texto y fondo del input
                        }}
                        InputLabelProps={{
                            style: { color: 'white' }, // Color de la etiqueta
                        }}
                    />
                </Grid>
                <Grid item xs={12} sm={1}>
                    <TextField
                        label="#43"
                        variant="outlined"
                        name="cantidad43"
                        value={formData.cantidad43}
                        onChange={(event) => {
                            const { name: fieldName, value } = event.target;  // Renombramos 'name' a 'fieldName'
                            setFormData((prevData) => ({
                                ...prevData,
                                [fieldName]: value,  // Usamos el nuevo nombre 'fieldName'
                            }));
                        }}
                        fullWidth
                        type="number"
                        InputProps={{
                            style: { color: 'white', backgroundColor: '#333' }, // Color del texto y fondo del input
                        }}
                        InputLabelProps={{
                            style: { color: 'white' }, // Color de la etiqueta
                        }}
                    />
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
            <SuccessAlert open={successOpen} handleClose={handleSuccessClose} message={successMessage} />
            <ErrorAlert open={errorOpen} handleClose={handleErrorClose} message={errorMessage} />
        </Container>
    );
}

export default ADDInventary;
