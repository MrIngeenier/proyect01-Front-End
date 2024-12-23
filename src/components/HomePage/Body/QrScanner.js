import React, { useState, useEffect } from 'react';
import { Button, Box, Typography, Select, MenuItem, InputLabel, FormControl } from '@mui/material';
import { Html5QrcodeScanner } from 'html5-qrcode';
import ErrorAlert from '../../Alerts/ErrorAlert';
import SuccessAlert from '../../Alerts/SuccesAlert';
import inventaryServices from '../../../service/inventary.services';
import VentasServices from '../../../service/ventas.services';
import { decryptText } from '../../../utils/Encript';
import DeleteIcon from '@mui/icons-material/Delete';
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, IconButton } from '@mui/material';

const QrScanner = () => {
  const [result, setResult] = useState('No result');
  const [scanner, setScanner] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [errorOpen, setErrorOpen] = useState(false);
  const [successOpen, setSuccessOpen] = useState(false);
  const [data, setData] = useState([]);
  //const [count, setCount] = useState(0);
  const [validador, setValidador] = useState(true);
  const [formData, setFormData] = useState({
    idUsuario: '',
    estado: false,
    serialReferencia: '1'
  });
  const token = localStorage.getItem('token');
  const [showButtons, setShowButtons] = useState(false); 
  const handleErrorClose = () => setErrorOpen(false);
  const handleSuccessClose = () => setSuccessOpen(false);
  const [zoom, setZoom] = useState(2); // Valor inicial del zoom
  const [ventasData, setVentasData] = useState([]); 
  const [isIdReferenceProcessed, setIsIdReferenceProcessed] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false); // Estado para controlar la apertura del diálogo
  var validator = false;
  var validatorID = false;
  var idReferences;
  
  const fetchInventaryQR = async (nombreEmpresa, referenciaSerial, color, ubicacionDescripcion, talla) => {
    try {
      await inventaryServices.updateDataQR(nombreEmpresa, referenciaSerial, color, ubicacionDescripcion, talla);
      //setData(response);
      setSuccessMessage("Inventario actualizado con éxito.");
      setSuccessOpen(true);
    } catch (error) {
      console.error('Error fetching inventory:', error);
      setErrorMessage('Error al actualizar el inventario.');
      setErrorOpen(true);
    }
  };
  
  const fetchAddVentas = async (idUsuario, estado, serialReferencia,lugar) => {
    if (!serialReferencia || !idUsuario || estado == null || lugar == null) {
      
      console.error('Algunos valores están faltando:', { idUsuario,  serialReferencia, estado,lugar });
      setErrorMessage('Datos incompletos para agregar venta.');
      setErrorOpen(true);
      return;
    }
    try {
      const response = await VentasServices.addVentas(serialReferencia, idUsuario, estado,lugar);
      alert(JSON.stringify(response, null, 2));
      setValidador(true);
    } catch (error) {
      console.error('Error registrando venta:', error);
      setErrorMessage('Error al agregar venta.');
      setErrorOpen(true);
      setValidador(false);
    }
  };

  const fetchGetIDReferences = async (color, serial, tipopublico,html5QrcodeScanner) => {
    if (!color || !serial || tipopublico == null) {
      console.error('Algunos valores están faltando:', { color, serial, tipopublico });
      setErrorMessage('Datos incompletos para tomar id referencia.');
      setErrorOpen(true);
      return;
    }
    try {
      const response = await VentasServices.GetReferenciaID(color, serial, tipopublico);
      //setCount(response.id);
      html5QrcodeScanner.clear();
      //alert(JSON.stringify(response, null, 2));
      //alert(response.id);
      return response.id;
    } catch (error) {
      console.error('Error registrando para tomar id referencia:', error);
      setErrorMessage('Error para tomar id referencia.');
      setErrorOpen(true);
    }
  };

  const startScanning = () => {
    const windowWidth = window.innerWidth;
    let qrboxSize;
    //console.log('Ancho Pantalla'+windowWidth);
    if (windowWidth <= 500) {
      // Móvil
      qrboxSize = { width: 150, height: 150 };
      console.log('Ancho Pantalla'+qrboxSize.width+' '+qrboxSize.height);
    }
    if (windowWidth > 500 && windowWidth <= 1024) {
      // Móvil
      qrboxSize = { width: 600, height: 500 };
      console.log('Ancho Pantalla'+qrboxSize.width+' '+qrboxSize.height);
    }  if(windowWidth > 1024 ) {
      qrboxSize = { width: 450, height: 400 };
    }
    //const html5QrcodeScanner = new Html5QrcodeScanner("qr-reader", 
      //{ fps: 10, qrbox: qrboxSize, // Tamaño del área de escaneo
    //},
       //false);

       const html5QrcodeScanner = new Html5QrcodeScanner(
        'qr-reader',
        {
          fps: 5,
          qrbox: qrboxSize,
          videoConstraints: {
            facingMode: 'environment',
            width: { ideal: 1000 },
            height: { ideal: 720 },
            aspectRatio: { ideal: 1.77 },
            advanced: [{ zoom: zoom }],
          },
        },
        false
      );
    html5QrcodeScanner.render(
      (decodedText) => handleScanSuccess(decodedText, html5QrcodeScanner),
      handleScanError
    );
    setScanner(html5QrcodeScanner);
    setShowButtons(true);
    setIsIdReferenceProcessed(true);
    validator = false;
    validatorID = false;
    

  };

  const handleScanSuccess = async(decodedText, html5QrcodeScanner) => {

    


    setResult(decodedText);
    
    const decrypt = decryptText(decodedText);
    const qrData = decrypt.split('/').map(item => item.replace(/^'|'$/g, '').trim());
    setData(decrypt);


    if (qrData.length === 6) {
      const [nombreEmpresa, serial, color, ubicacionDescripcion, talla, tipopublico] = qrData;
      //console.log(qrData);
      if(isIdReferenceProcessed === false){
        html5QrcodeScanner.clear();
      }

      if(validatorID === false){
        idReferences = await fetchGetIDReferences(color, serial, tipopublico,html5QrcodeScanner);
        console.log('ID Referencia:', idReferences+ ' / '+ validatorID);
        validatorID = true;
        //setIsIdReferenceProcessed(false);
        
      }
      
      
      
      
      if(validator === false){
        //console.log(validator);
        if (formData.idUsuario) {
          //fetchAddVentas(formData.idUsuario, formData.estado, formData.serialReferencia,ubicacionDescripcion);
          setVentasData(prevData => [
            ...prevData,
            {
                idUsuario: formData.idUsuario,
                estado: formData.estado,
                serialReferencia: idReferences,
                ubicacionDescripcion: ubicacionDescripcion,
                qrData: qrData
            }
        ]);
        validator = true;
          if (validador) {
           // fetchInventaryQR(nombreEmpresa, serial, color, ubicacionDescripcion, talla);
          }
  
          setSuccessMessage("¡Código QR escaneado con éxito!");
          setSuccessOpen(true);
        } else {
          console.error('idUsuario no está disponible:', formData.idUsuario);
          setErrorMessage('El usuario no está configurado. Por favor, inténtalo de nuevo.');
          setErrorOpen(true);
        }
      }
      

      //console.log(count.id + "/", formData.estado, "/", formData.idUsuario);
    } else {
      console.error('Formato de código QR inválido:', decodedText);
      setErrorMessage('El formato del código QR es inválido. Asegúrate de que tenga el formato empresa/referencia/color/ubicación/talla.');
      setErrorOpen(true);
    }

    html5QrcodeScanner.clear(); // Detener escaneo después de leer
  };

  const handleScanError = (error) => {
    const message = error.message.includes("NotFoundException")
      ? "No se encontró un código QR. Asegúrate de que el código esté dentro del campo de la cámara e inténtalo nuevamente."
      : "Ocurrió un error inesperado. Por favor, inténtalo de nuevo.";
    setErrorMessage(message);
    setErrorOpen(true);
  };

  const stopScanning = () => {
    if (scanner) {
      scanner.clear();
    }
    setShowButtons(false);
  };

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

  const handleZoomChange = (event) => {
    setZoom(event.target.value);
    if (scanner) {
      scanner.clear();
      startScanning(); // Reiniciar el escaneo con el nuevo zoom
    }
  };

  useEffect(() => {
    showJWT();
    
  }, []);

  const handleFacturaElectronica = async () => {
    try {
        alert('Factura Electrónica seleccionada: ' + JSON.stringify(ventasData, null, 2));

        for (const venta of ventasData) {
           var response= await fetchAddVentas(venta.idUsuario, venta.estado, venta.serialReferencia, venta.ubicacionDescripcion);
           console.log('Respuesta de fetchAddVentas:', response);
          }

        setSuccessMessage('Ventas registradas exitosamente.');
        setSuccessOpen(true);
    } catch (error) {
        console.error('Error procesando Factura Electrónica:', error);
        setErrorMessage('Error procesando Factura Electrónica: ' + error.message);
        setErrorOpen(true);
    }
};

  const handleFacturaNormal = () => {
    //alert('Factura Normal seleccionada');
    alert('Factura Electrónica seleccionada: ' + JSON.stringify(ventasData, null, 2));
    //setDialogOpen(true);
  };

  const handleFactura = () => {
    //alert('Factura Normal seleccionada');
    //alert('Factura Electrónica seleccionada: ' + JSON.stringify(scannedData, null, 2));
    setDialogOpen(true);
  };

  const handleDialogClose = () => {
    setDialogOpen(false);
  };

  const handleDeleteVenta = (index) => {
    setVentasData(prevData => prevData.filter((_, i) => i !== index));
  };
  return (
<Box
  sx={{padding: 2,textAlign: 'center',
    width: {lg: '50%'},margin: {lg: '0 auto', },marginTop: {lg: '-20px'},
  }}
>      <Typography variant="h6" gutterBottom>
        Escanea el código QR
      </Typography>
      <Box id="qr-reader" sx={{ margin: 'auto' }}></Box>
      <Box>
      {showButtons && (
        <>
          
          <Button
            variant="contained"
            color="success"
            sx={{ marginTop: 2 }}
            onClick={handleFactura}
          >
            Factura
          </Button>
        </>
      )}

      </Box>
      <Button
        variant="contained"
        color="primary"
        sx={{ marginTop: 2 }}
        onClick={startScanning}
      >
        Iniciar Escaneo
      </Button>
      <Button
        variant="contained"
        color="secondary"
        sx={{ marginTop: 2 }}
        onClick={stopScanning}
      >
        Detener Escaneo
      </Button>
      <Typography variant="body1" sx={{ marginTop: 2 }}>
        Resultado: {result}
      </Typography>

      <FormControl fullWidth sx={{ marginTop: 2 }}>
        <InputLabel>Zoom</InputLabel>
        <Select value={zoom} onChange={handleZoomChange}>
          <MenuItem value={2}>2x</MenuItem>
          <MenuItem value={4}>4x</MenuItem>
          <MenuItem value={6}>6x</MenuItem>
          <MenuItem value={8}>8x</MenuItem>
          <MenuItem value={10}>10x</MenuItem>
        </Select>
      </FormControl>

      <Dialog open={dialogOpen} onClose={handleDialogClose}>
      <DialogTitle>Ventas Data</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Aquí están los datos de ventas escaneados:
        </DialogContentText>
        {ventasData.map((venta, index) => (
          <Box key={index} display="flex" alignItems="center" justifyContent="space-between">
            <Typography variant="body1">
              {venta.qrData}
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
};

export default QrScanner;
