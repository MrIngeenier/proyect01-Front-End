import React, { useState, useEffect } from "react";
import { Box, Button, TextField, Grid, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, MenuItem, Select, FormControl, InputLabel, IconButton } from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete'; // Icono de eliminar
import inventaryServices from "../../../service/inventary.services";
import VentasServices from "../../../service/ventas.services";
import clienteServices from "../../../service/cliente.service";
import { Dialog, DialogActions, DialogContent, DialogContentText,Autocomplete } from '@mui/material';
import SuccessAlert from "../../Alerts/SuccesAlert";
import ErrorAlert from "../../Alerts/ErrorAlert";
import { generateReceipt2 } from "../../../utils/receipt2";
// Estilos

const buttonStyle = {
    width: '100%', // Ancho del botón (cuadrado)
    height: '100%', // Alto del botón (cuadrado)
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    textTransform: 'none',
    padding: 2,
    color: 'black',
    backgroundColor:'#FFFFFF',
    boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.4)', 

};

const searchStyle = {
    marginBottom: 2,
    width: '80%', // Ancho de la barra de búsqueda
    maxWidth: '600px', // Tamaño máximo
};

function Store() {
    const token = localStorage.getItem('token');
    const [formData, setFormData] = useState({
        idUsuario: '',
        estado: false,
        serialReferencia: '1'
      });
    const [data, setData] = useState([]);           // Datos del inventario
    const [search, setSearch] = useState('');        // Valor de búsqueda
    const [selectedItems, setSelectedItems] = useState([]);  // Arreglo de productos seleccionados
    const [ItemsID, setItemsID] = useState([]);  // Arreglo de productos seleccionados
    const [isIdReferenceProcessed, setIsIdReferenceProcessed] = useState(true);
    const [dialogOpen, setDialogOpen] = useState(false); // Estado para controlar la apertura del diálogo
    const [idClient, setidClient] = useState('');
    const [cliente, setCliente] = useState('');
    const [cedula, setCedula] = useState('');
    const [correo, setCorreo] = useState('');
    const [telefono, setTelefono] = useState('');
    const [showContent, setShowContent] = useState(false);
    const [metodoPago, setMetodoPago] = useState('');
    const [idPago, setidPago] = useState(0); 
    const [places, setPlaces] = useState([]);
      const [selectedPlace, setSelectedPlace] = useState(null);   
      const [errorMessage, setErrorMessage] = useState('');
        const [successMessage, setSuccessMessage] = useState('');
        const [errorOpen, setErrorOpen] = useState(false);
        const [successOpen, setSuccessOpen] = useState(false);
          const [validador, setValidador] = useState(true);
            const [ventasData, setVentasData] = useState([]); 
    const [idVentas, setIdVentas] = useState(0);
    const [idReferencia, setIdReferencia] = useState(0);
    const handleErrorClose = () => setErrorOpen(false);
  const handleSuccessClose = () => setSuccessOpen(false);


    const handleDeleteVenta = (index) => {
      setSelectedItems(prevData => prevData.filter((_, i) => i !== index));
      };
        

    useEffect(() => {
        showJWT();
        fetchInventaryGET();
        
    }, []);

    const decodeJWT = (token) => {
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
        try {
          const decodedPayload = atob(payload);
          return JSON.parse(decodedPayload);
        } catch (error) {
          console.error("Error decoding token payload:", error);
          return null;
        }
      };
    

    const showJWT = () => {
        const decodedData = decodeJWT(token);
        if (decodedData) {
          setFormData((prev) => ({
            ...prev,
            idUsuario: decodedData.userId || ''  // Asegúrate de que userId esté disponible
          }));
          //console.log("DecodeJWT:", decodedData.userId);
        } else {
          console.error("No se pudo decodificar el JWT o no contiene userId.");
        }
      };

    const fetchInventaryGET = async () => {
        try {
            const response = await inventaryServices.getInventary();
            setData(response); // Asignar la respuesta al estado
        } catch (error) {
            console.error('Error fetching inventory:', error);
        }
    };

    const fetchInventarySales = async (nombreEmpresa, referenciaSerial, color, ubicacionDescripcion, talla) => {
      console.log("Empresa: "+nombreEmpresa+" Referencia : "+ referenciaSerial+" Color: "+color+" Ubicacion: "+ubicacionDescripcion+" Talla: "+talla);
      try {
        const response = await inventaryServices.updateDataQR(nombreEmpresa, referenciaSerial, color, ubicacionDescripcion, talla);
        setData(response);
        console.log("Response updateData Inventary : "+JSON.stringify(response, null, 2));
        
        if(response.body === null){
         setErrorMessage('Talla sin cantidad en [Inventario].');
          setErrorOpen(true);
          
        }else{
          setSuccessMessage("Inventario actualizado con éxito.");
          setSuccessOpen(true);
        }
        return ;
      } catch (error) {
        console.error('Error fetching inventory:', error);
        setErrorMessage('Error al actualizar el inventario.');
        setErrorOpen(true);
      }
    };

    // Filtrar los datos según la búsqueda
    const filteredData = Array.isArray(data) 
    ? data.filter(item => 
        (item.empresa && item.empresa.toLowerCase().includes(search.toLowerCase())) ||
        (item.referencia && item.referencia.toLowerCase().includes(search.toLowerCase()))
    ) 
    : [];


    // Manejar cambio en el input de búsqueda
    const handleSearchChange = (event) => {
        setSearch(event.target.value);
    };

    // Manejar clic en el botón para seleccionar el producto
    const handleSelect = (item) => {
      //console.log('DEBUG:', { item, tallaStr }); // Ver qué valores tiene item
  
      setSelectedItems((prevSelected) => [
          ...prevSelected,
          { 
              empresa: item.empresa, 
              referencia: item.referencia, 
              color: item.color, 
              valor: item.valor,
              publico: item.publico,
              talla: String(item.talla), 
              lugar: item.lugar,
          }
      ]);
  };
  
  
  

    // Manejar cambio de talla en la tabla
    const handleTallaChange = (event, index) => {
        const newSelectedItems = [...selectedItems];
        newSelectedItems[index].talla = event.target.value;  // Actualizar la talla
        setSelectedItems(newSelectedItems);
    };

    // Eliminar un producto de la lista seleccionada
    const handleDelete = (index) => {
        const newSelectedItems = selectedItems.filter((item, i) => i !== index);
        setSelectedItems(newSelectedItems);
    };

    const handleValorChange = (event, index) => {
        const newSelectedItems = [...selectedItems];
        newSelectedItems[index].valor = event.target.value; // Actualiza el valor
        setSelectedItems(newSelectedItems);
    };

    const fetchGetIDReferences = async (color, serial, tipopublico) => {
      if (!color || !serial || tipopublico == null) {
        console.error('Algunos valores están faltando:', { color, serial, tipopublico });
        setErrorMessage('Datos incompletos para tomar id referencia.');
        setErrorOpen(true);
        return;
      }
      try {
        const response = await VentasServices.GetReferenciaID(color, serial, tipopublico);
        //setCount(response.id);
        
        //alert(JSON.stringify(response, null, 2));
        //console.log("ID:"+response.id);
        return response.id;
      } catch (error) {
        console.error('Error registrando para tomar id referencia:', error);
        setErrorMessage('Error para tomar id referencia.');
        setErrorOpen(true);
      }
    };

    const fetchAddVentas = async (idUsuario, estado, serialReferencia,lugar,fk_idusuarios,id,valor ) => {
      //console.log(idUsuario+" / "+ estado+" / "+ serialReferencia+" / "+lugar+" / "+fk_idusuarios+" / "+id)
      if (!serialReferencia || !idUsuario || estado == null || lugar == null || fk_idusuarios == null || id == null) {
        
        console.error('Algunos valores están faltando:', { idUsuario,  serialReferencia, estado,lugar,fk_idusuarios,id,valor  });
        setErrorMessage('Datos incompletos para agregar venta.');
        setErrorOpen(true);
        return;
      }
      try {
        const response = await VentasServices.addVentas(serialReferencia, idUsuario, estado,lugar,fk_idusuarios,id,valor);
        console.log(JSON.stringify(response, null, 2));
  
        setValidador(true);
        return response;
      } catch (error) {
        console.error('Error registrando venta:', error);
        setErrorMessage('Error al agregar venta.');
        setErrorOpen(true);
        setValidador(false);
      }
    };
  
  
    const fetchGetCliente = async () => {
        try {
          const response = await clienteServices.getData();
          //alert('Clientes: ' + JSON.stringify(response, null, 2));
          setPlaces(response);
          //alert('Clientes: ' + JSON.stringify(places, null, 2));
          //setData(response);
          setSuccessMessage("Clientes obtenidos con éxito.");
          setSuccessOpen(true);
        } catch (error) {
          console.error('Error fetching inventory:', error);
          setErrorMessage('Error al actualizar el inventario.');
          setErrorOpen(true);
        }
      };

      const handleChange = (event, newValue) => {
        setSelectedPlace(newValue);
        setidClient(newValue.id);
        //alert(JSON.stringify(newValue.id, null, 2));
        setCliente(newValue.nombre);
        setCedula(newValue.cedula);
        setCorreo(newValue.correo);
        setTelefono(newValue.telefono);
      };

      const fetchAddCliente = async (nombre, cedula, telefono, correo) => {
        if (!nombre || !cedula ) {
          
          console.error('Algunos valores están faltando:', { nombre, cedula, telefono, correo });
          setErrorMessage('Datos incompletos para agregar cliente.');
          setErrorOpen(true);
          return;
        }
        try {
          const response = await clienteServices.addData(nombre, cedula, telefono, correo);
          //alert(JSON.stringify(response, null, 2));
          setSuccessMessage("Cliente agregado con éxito.");
          setSuccessOpen(true);
          return response;
    
        } catch (error) {
          console.error('Error registrando cliente:', error);
          setErrorMessage('Error al agregar cliente.');
          setErrorOpen(true);
          setValidador(false);
        }
      };

      const handleClients = () => {
        fetchAddCliente(cliente, cedula, telefono, correo);
        //alert('Cliente: ' + cliente + ' Cédula: ' + cedula + ' Correo: ' + correo + ' Teléfono: ' + telefono);
      }
    
    const handleDialogClose = () => {
        setDialogOpen(false);
      };

    const handleMetodoPago = (metodo) => {
        setMetodoPago(metodo);
        if( metodo === 'Débito') { setidPago(2); }
        if( metodo === 'Crédito') { setidPago(3); }
        if( metodo === 'Efectivo') { setidPago(1); }
          
        //alert('Método de pago seleccionado: ' + metodo);
      };
    
      const handleFacturaNormal = async () => {
        const cliente2 = 'CONSUMIDOR FINAL';
        const cedula2 = '222222222';
        const correo2 = 'NA';
        const telefono2 = '0000000000';
      
        try {
          // Obtener idUsuario del token
          showJWT(); 
          
          // Esperar a que se actualice el estado antes de usarlo
          setTimeout(async () => {
            for (const venta of selectedItems) {
              console.log(venta);
              var id = await fetchGetIDReferences(venta.color, venta.referencia, venta.publico);
              console.log('Empresa: ' + venta.empresa + ' Referencia: ' + venta.referencia +
                ' Color: ' + venta.color + ' Ubicacion: ' + venta.lugar + ' talla: ' + venta.talla +
                " Valor: " + venta.valor);
      
              // Llamar a fetchAddVentas con idUsuario obtenido del JWT
              await fetchAddVentas(formData.idUsuario, false, id, venta.lugar, 1, idPago,venta.valor);
               
                //console.log("venta :"+JSON.stringify(venta, null, 2));
              await fetchInventarySales(venta.empresa, venta.referencia, venta.color, venta.lugar, venta.talla);
            }
      
            generateReceipt2(selectedItems, cliente2, cedula2, correo2, telefono2, metodoPago);
            setSuccessMessage('Ventas registradas exitosamente.');
            setSuccessOpen(true);
          }, 100); // Pequeña pausa para asegurar que showJWT haya actualizado formData
      
        } catch (error) {
          console.error('Error procesando Factura Electrónica:', error);
          setErrorMessage('Error procesando Factura Electrónica: ' + error.message);
          setErrorOpen(true);
        }
      };
      

      const handleFacturaElectronica = async () => {
          var fk_idusuarios = idClient;

          //console.log('Respuesta de idPago:', idPago);
          
          try {
             if(!cliente || !cedula || !correo || !correo.includes('@')|| !telefono || !fk_idusuarios || !metodoPago || idPago==='') {
              setErrorMessage('Datos incompletos para la factura.');
              setErrorOpen(true);
              return;
            }
           
              for (const venta of selectedItems) {
                console.log(venta);
                var id = await fetchGetIDReferences(venta.color, venta.referencia, venta.publico);


                const response = await fetchInventarySales(venta.empresa, venta.referencia, venta.color, venta.lugar, venta.talla);
                const response2 = await fetchAddVentas(formData.idUsuario, true, id, venta.lugar,fk_idusuarios,idPago,venta.valor);
                  
                console.log('Respuesta de fetchAddVentas:'+ response2);
                console.log('Respuesta de fetchInventarySales:'+ response);
                }
      
                
              generateReceipt2(selectedItems,cliente,cedula,correo,telefono,metodoPago);
              setSuccessMessage('Ventas registradas exitosamente.');
              setSuccessOpen(true);
          } catch (error) {
              console.error('Error procesando Factura Electrónica:', error);
              setErrorMessage('Error procesando Factura Electrónica: ' + error.message);
              setErrorOpen(true);
          }
      };

       const handleFactura = () => {
        //alert('Factura Normal seleccionada');
        
        setDialogOpen(true);
      };

    return (
        <Box sx={ { marginBottom: 3, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
            maxWidth: { xs: '350px', sm: '100%', md: '100%', lg: '100%', xl: '100%' } 

        }}>

            <Box sx={{ marginTop: 3,marginBottom:3, width: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                <Typography variant="h6" sx={{ marginBottom: 2 }}>Productos Seleccionados</Typography>
                <TableContainer component={Paper}>
                    <Table sx={{ backgroundColor: 'rgba(227, 226, 226, 0.25)',
                    boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.4)',
                    borderRadius: '8px',
                    minWidth: 700 }} aria-label="Productos seleccionados">
                        <TableHead>
                            <TableRow>
                                <TableCell sx={{ textAlign: 'center' }}><strong>Empresa</strong></TableCell>
                                <TableCell sx={{ textAlign: 'center' }}><strong>Referencia</strong></TableCell>
                                <TableCell sx={{ textAlign: 'center' }}><strong>Color</strong></TableCell>
                                <TableCell sx={{ textAlign: 'center' }}><strong>Valor</strong></TableCell>
                                <TableCell sx={{ textAlign: 'center' }}><strong>publico</strong></TableCell>

                                <TableCell><strong>Talla</strong></TableCell>
                                <TableCell><strong>Acciones</strong></TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {selectedItems.map((item, index) => (
                                <TableRow key={index}>
                                    <TableCell sx={{ textAlign: 'center' }}>{item.empresa}</TableCell>
                                    <TableCell sx={{ textAlign: 'center' }}>{item.referencia}</TableCell>
                                    <TableCell sx={{ textAlign: 'center' }}>{item.color}</TableCell>
                                    <TableCell sx={{ textAlign: 'center' }}>
                                    <TextField
                                        type="number"
                                        value={item.valor}
                                        onChange={(event) => handleValorChange(event, index)}
                                        variant="outlined"
                                        size="small"
                                        
                                    />
                                </TableCell>

                                    <TableCell sx={{ textAlign: 'center' }}>{item.publico}</TableCell>

                                    <TableCell>
                                        <FormControl fullWidth>
                                            <InputLabel>Talla</InputLabel>
                                            <Select
                                                value={item.talla}
                                                label="Talla"
                                                onChange={(event) => handleTallaChange(event, index)}
                                            >
                                                    <MenuItem value="21">21</MenuItem>
                                                    <MenuItem value="22">22</MenuItem>
                                                    <MenuItem value="23">23</MenuItem>
                                                    <MenuItem value="24">24</MenuItem>
                                                    <MenuItem value="25">25</MenuItem>
                                                    <MenuItem value="26">26</MenuItem>
                                                    <MenuItem value="27">27</MenuItem>
                                                    <MenuItem value="28">28</MenuItem>
                                                    <MenuItem value="29">29</MenuItem>
                                                    <MenuItem value="30">30</MenuItem>
                                                    <MenuItem value="31">31</MenuItem>
                                                    <MenuItem value="32">32</MenuItem>
                                                    <MenuItem value="33">33</MenuItem>
                                                    <MenuItem value="34">34</MenuItem>
                                                    <MenuItem value="35">35</MenuItem>
                                                    <MenuItem value="36">36</MenuItem>
                                                    <MenuItem value="37">37</MenuItem>
                                                    <MenuItem value="38">38</MenuItem>
                                                    <MenuItem value="39">39</MenuItem>
                                                    <MenuItem value="40">40</MenuItem>
                                                    <MenuItem value="41">41</MenuItem>
                                                    <MenuItem value="42">42</MenuItem>
                                                    <MenuItem value="43">43</MenuItem>
                                            </Select>
                                        </FormControl>
                                    </TableCell>
                                    <TableCell>
                                        <IconButton 
                                            color="error" 
                                            onClick={() => handleDelete(index)}
                                        >
                                            <DeleteIcon />
                                        </IconButton>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Box>

            <Button variant="contained" color="success" sx={{ marginTop: 3,marginBottom:3 }} onClick={() => handleFactura()}>
              Factura
            </Button>

            <TextField
                label="Buscar"
                variant="outlined"
                value={search}
                onChange={handleSearchChange}
                sx={searchStyle}
            />
            <Grid container spacing={1} justifyContent="center" sx={{ width: '100%' }}>
                {filteredData.map((item) => (
                    <Grid item key={item.id} xs={6} sm={3} md={4} lg={2}>
                        <Button 
                            
                            sx={buttonStyle} 
                            onClick={() => handleSelect(item)}
                        >
                            <Box>
                            <strong>{item.id}</strong>
                                <p>{item.empresa}</p>
                                <p>{item.referencia}</p>
                                <p>{item.color}</p>
                                <strong>{item.valor}</strong>
                                
                                
                            </Box>
                        </Button>
                    </Grid>
                ))}
            </Grid>

            <Dialog open={dialogOpen} onClose={handleDialogClose}>
     {/* <DialogTitle>Cliente Datos</DialogTitle>*/} 
      <Box sx={{ display: 'flex', justifyContent: 'center' }}>
      <Button variant="contained" color="secondary" sx={{ width: '60%',justifyContent:'center',marginTop: 2 }}  
      onClick={() => {
        setShowContent((prev) => !prev);
        if(showContent === false){fetchGetCliente();}
       }}>
        {showContent ? 'Ocultar' : 'Cliente'}
        
      </Button>
      
      </Box>
      <Grid item xs={12} sm={6}  sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center',marginTop: 2 }}>
        <FormControl sx={{ width: '80%',color:'withe' }}>
          <InputLabel></InputLabel>
          <Autocomplete
          value={selectedPlace}
          onChange={handleChange}
          options={places} 
          getOptionLabel={(option) => option.nombre || ''} 
          isOptionEqualToValue={(option, value) => option.id === value?.id}
          renderInput={(params) => <TextField {...params} label="Cliente" variant="outlined" />}
          fullWidth
          disableClearable  // Si deseas evitar que se borre la selección
        />
        </FormControl>
      </Grid>
      
      <DialogContent>
      {showContent && (
        <>
        <TextField
            label="Nombre"
            type="text"
            fullWidth
            variant="standard"
            value={cliente}
            onChange={(e) => setCliente(e.target.value)}
          />
          <TextField
            label="Cédula"
            margin="dense"
            type="number"
            fullWidth
            variant="standard"
            value={cedula}
            onChange={(e) => setCedula(e.target.value)}
          />
          <TextField
            label="Correo"
            margin="dense"
            type="email"
            fullWidth
            variant="standard"
            value={correo}
            onChange={(e) => setCorreo(e.target.value)}
          />
          <TextField
            label="Teléfono"
            margin="dense"
            type="number"
            fullWidth
            variant="standard"
            value={telefono}
            onChange={(e) => setTelefono(e.target.value)}
          />
          <Box marginTop={1} sx={{
            display: 'flex',        
            justifyContent: 'center', 
            alignItems: 'center',       
          }}>
            <Button
              variant="contained"
              color="secondary"
              sx={{ marginTop: 1 }}
              onClick={handleClients}
            >
              AGREGAR
            </Button>
          </Box>
      </>
        )}
        <Box marginTop={1}>
          
          <Box display="flex" justifyContent="space-around" >
            <Button
              variant={metodoPago === 'Débito' ? 'contained' : 'outlined'}
              color="success"
              onClick={() => handleMetodoPago('Débito')}
            >
              Débito
            </Button>
            <Button
              variant={metodoPago === 'Crédito' ? 'contained' : 'outlined'}
              color="success"
              onClick={() => handleMetodoPago('Crédito')}
            >
              Crédito
            </Button>
            <Button
              variant={metodoPago === 'Efectivo' ? 'contained' : 'outlined'}
              color="success"
              onClick={() => handleMetodoPago('Efectivo')}
            >
              Efectivo
            </Button>
          </Box>
        </Box>
        <DialogContentText>
          Aquí están los datos de ventas escaneados:
        </DialogContentText>
        {selectedItems.map((venta, index) => (
          <Box key={index} display="flex" alignItems="center" justifyContent="space-between">
            <Typography variant="body1">
              {venta.empresa}/{venta.referencia}/{venta.color}/{venta.lugar}/{venta.talla}/{venta.publico}/
              {venta.valor}
            </Typography>
            <IconButton onClick={() => handleDeleteVenta(index)}>
              <DeleteIcon />
            </IconButton>
          </Box>
        ))}
      </DialogContent>
      
      <DialogActions>
      <Button
            variant="contained"
            color="warning"
            sx={{ marginTop: 0 }}
            onClick={handleFacturaElectronica}
          >
            Electrónica
          </Button>
          <Button
            variant="contained"
            color="primary"
            sx={{ marginTop: 0 }}
            onClick={handleFacturaNormal}
          >
            NORMAL
          </Button>
        <Button onClick={handleDialogClose} color="primary">
          Cerrar
        </Button>
      </DialogActions>
    </Dialog>

    <SuccessAlert open={successOpen} handleClose={handleSuccessClose} message={successMessage} />
    <ErrorAlert open={errorOpen} handleClose={handleErrorClose} message={errorMessage} />
        </Box>
    );
}

export default Store;
