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

        talla21: '21',
        cantidad21: '0',

        talla22: '22',
        cantidad22: '0',

        talla23: '23',
        cantidad23: '0',

        talla24: '24',
        cantidad24: '0',

        talla25: '25',
        cantidad25: '0',

        talla26: '26',
        cantidad26: '0',

        talla27: '27',
        cantidad27: '0',

        talla28: '28',
        cantidad28: '0',

        talla29: '29',
        cantidad29: '0',

        talla30: '30',
        cantidad30: '0',

        talla31: '31',
        cantidad31: '0',

        talla32: '32',
        cantidad32: '0',

        talla33: '33',
        cantidad33: '0',

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
        const { tipoPublicoTipoZapato, serialReferencia, descripcionLugar, idUsuario, empresa, ...rest } = formData;
        
        if (!tipoPublicoTipoZapato || !serialReferencia || !descripcionLugar || !idUsuario || !empresa) {
            setErrorMessage('Error agregando inventario: Faltan datos.');
            setErrorOpen(true);
            alert(JSON.stringify(formData, null, 2));
            return;
        }

        const inventaryData = [

            { cantidad: rest.cantidad21, talla: rest.talla21 },
            { cantidad: rest.cantidad22, talla: rest.talla22 },
            { cantidad: rest.cantidad23, talla: rest.talla23 },
            { cantidad: rest.cantidad24, talla: rest.talla24 },
            { cantidad: rest.cantidad25, talla: rest.talla25 },
            { cantidad: rest.cantidad26, talla: rest.talla26 },
            { cantidad: rest.cantidad27, talla: rest.talla27 },
            { cantidad: rest.cantidad28, talla: rest.talla28 },
            { cantidad: rest.cantidad29, talla: rest.talla29 },
            { cantidad: rest.cantidad30, talla: rest.talla30 },
            { cantidad: rest.cantidad31, talla: rest.talla31 },
            { cantidad: rest.cantidad32, talla: rest.talla32 },
            { cantidad: rest.cantidad33, talla: rest.talla33 },
            { cantidad: rest.cantidad34, talla: rest.talla34 },
            { cantidad: rest.cantidad35, talla: rest.talla35 },
            { cantidad: rest.cantidad36, talla: rest.talla36 },
            { cantidad: rest.cantidad37, talla: rest.talla37 },
            { cantidad: rest.cantidad38, talla: rest.talla38 },
            { cantidad: rest.cantidad39, talla: rest.talla39 },
            { cantidad: rest.cantidad40, talla: rest.talla40 },
            { cantidad: rest.cantidad41, talla: rest.talla41 },
            { cantidad: rest.cantidad42, talla: rest.talla42 },
            { cantidad: rest.cantidad43, talla: rest.talla43 }
        ];

       for (const { cantidad, talla } of inventaryData) {
            await inventaryServices.addInventaryPro(
                descripcionLugar,
                serialReferencia,
                tipoPublicoTipoZapato,
                idUsuario,
                cantidad,
                talla,
                empresa
            );
        }
        setSuccessMessage('Inventario agregado exitosamente.');
        setSuccessOpen(true);
        
    } catch (error) {
        console.error('Error agregando inventario:', error.message, error.stack);
        setErrorMessage('Error agregando inventario: ' + error.message);
        setErrorOpen(true);
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
                        name="tipoPublicoTipoZapato"
                            variant="outlined"
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
                            name="descripcionLugar"
                            variant="outlined"
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

                <Grid item xs={12} sm={20} sx={{ display: 'grid', gap: 1 ,
                        gridTemplateColumns: { xs: 'repeat(3, 1fr)', sm: 'repeat(6, 1fr)', md: 'repeat(8, 1fr)', lg: 'repeat(12, 1fr)' }, 

                }}>

                <Grid item xs={12} sm={12} >
                <TextField
                    label="#21"
                    variant="outlined"
                    name="cantidad21"
                    value={formData.cantidad21}
                    onChange={(event) => {
                        const { name: fieldName, value } = event.target;  
                        setFormData((prevData) => ({
                            ...prevData,
                            [fieldName]: value,  
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

                <Grid item xs={12} sm={12}>
                <TextField
                    label="#22"
                    variant="outlined"
                    name="cantidad22"
                    value={formData.cantidad22}
                    onChange={(event) => {
                        const { name: fieldName, value } = event.target;  
                        setFormData((prevData) => ({
                            ...prevData,
                            [fieldName]: value,  
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

                <Grid item xs={12}  sm={12}>
                <TextField
                    label="#23"
                    variant="outlined"
                    name="cantidad23"
                    value={formData.cantidad23}
                    onChange={(event) => {
                        const { name: fieldName, value } = event.target;  
                        setFormData((prevData) => ({
                            ...prevData,
                            [fieldName]: value,  
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

                <Grid item xs={12} sm={12} >
                <TextField
                    label="#24"
                    variant="outlined"
                    name="cantidad24"
                    value={formData.cantidad24}
                    onChange={(event) => {
                        const { name: fieldName, value } = event.target;  
                        setFormData((prevData) => ({
                            ...prevData,
                            [fieldName]: value,  
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

                <Grid item xs={12} sm={12} >
                <TextField
                    label="#25"
                    variant="outlined"
                    name="cantidad25"
                    value={formData.cantidad25}
                    onChange={(event) => {
                        const { name: fieldName, value } = event.target;  
                        setFormData((prevData) => ({
                            ...prevData,
                            [fieldName]: value,  
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

                <Grid item xs={12} sm={12} >
                <TextField
                    label="#26"
                    variant="outlined"
                    name="cantidad26"
                    value={formData.cantidad26}
                    onChange={(event) => {
                        const { name: fieldName, value } = event.target;  
                        setFormData((prevData) => ({
                            ...prevData,
                            [fieldName]: value,  
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

                <Grid item xs={12} sm={12} >
                <TextField
                    label="#27"
                    variant="outlined"
                    name="cantidad27"
                    value={formData.cantidad27}
                    onChange={(event) => {
                        const { name: fieldName, value } = event.target;  
                        setFormData((prevData) => ({
                            ...prevData,
                            [fieldName]: value,  
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

                <Grid item xs={12} sm={12} >
                <TextField
                    label="#28"
                    variant="outlined"
                    name="cantidad28"
                    value={formData.cantidad28}
                    onChange={(event) => {
                        const { name: fieldName, value } = event.target;  
                        setFormData((prevData) => ({
                            ...prevData,
                            [fieldName]: value,  
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

                <Grid item xs={12} sm={12} >
                <TextField
                    label="#29"
                    variant="outlined"
                    name="cantidad29"
                    value={formData.cantidad29}
                    onChange={(event) => {
                        const { name: fieldName, value } = event.target;  
                        setFormData((prevData) => ({
                            ...prevData,
                            [fieldName]: value,  
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

                <Grid item xs={12} sm={12} >
                <TextField
                    label="#30"
                    variant="outlined"
                    name="cantidad30"
                    value={formData.cantidad30}
                    onChange={(event) => {
                        const { name: fieldName, value } = event.target;  
                        setFormData((prevData) => ({
                            ...prevData,
                            [fieldName]: value,  
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

                <Grid item xs={12} sm={12} >
                <TextField
                    label="#31"
                    variant="outlined"
                    name="cantidad31"
                    value={formData.cantidad31}
                    onChange={(event) => {
                        const { name: fieldName, value } = event.target;  
                        setFormData((prevData) => ({
                            ...prevData,
                            [fieldName]: value,  
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
                
                <Grid item xs={12} sm={12} >
                <TextField
                    label="#32"
                    variant="outlined"
                    name="cantidad32"
                    value={formData.cantidad32}
                    onChange={(event) => {
                        const { name: fieldName, value } = event.target;  
                        setFormData((prevData) => ({
                            ...prevData,
                            [fieldName]: value,  
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
                
                <Grid item xs={12} sm={12}>
                <TextField
                    label="#33"
                    variant="outlined"
                    name="cantidad33"
                    value={formData.cantidad33}
                    onChange={(event) => {
                        const { name: fieldName, value } = event.target;  
                        setFormData((prevData) => ({
                            ...prevData,
                            [fieldName]: value,  
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

                <Grid item xs={12} sm={12}>
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

                <Grid item xs={12} sm={12}>
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

                <Grid item xs={12} sm={12}>
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

                <Grid item xs={12} sm={12}>
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

                <Grid item xs={12} sm={12}>
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

                <Grid item xs={12} sm={12}>
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

                <Grid item xs={12} sm={12}>
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

                <Grid item xs={12} sm={12}>
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

                <Grid item xs={12} sm={12}>
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

                <Grid item xs={12} sm={12}>
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
