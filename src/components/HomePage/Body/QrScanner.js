import React, { useState,useEffect } from 'react';
import { Box, Button, Typography } from '@mui/material';
import { Html5QrcodeScanner } from 'html5-qrcode';
import ErrorAlert from '../../Alerts/ErrorAlert';
import SuccessAlert from '../../Alerts/SuccesAlert';
import inventaryServices from '../../../service/inventary.services';
import VentasServices from '../../../service/ventas.services';

const QrScanner = () => {
  const [result, setResult] = useState('No result');
  const [scanner, setScanner] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [errorOpen, setErrorOpen] = useState(false);
  const [successOpen, setSuccessOpen] = useState(false);
  const [data, setData] = useState([]);
  const [count, setCount] = useState(0);


  const handleErrorClose = () => setErrorOpen(false);
  const handleSuccessClose = () => setSuccessOpen(false);
  const token = localStorage.getItem('token');
  const [formData, setFormData] = useState({
    idUsuario: '',
    estado: 'false',
    serialReferencia: '1'
  });

  const fetchInventaryQR = async (nombreEmpresa, referenciaSerial, color, ubicacionDescripcion, talla) => {
    try {
      const response = await inventaryServices.updateDataQR(
        nombreEmpresa,
        referenciaSerial,
        color,
        ubicacionDescripcion,
        talla
      );

      setData(response);
      setSuccessMessage("Inventario actualizado con éxito.");
      setSuccessOpen(true);
     
    } catch (error) {
      console.error('Error fetching inventory:', error);
      setErrorMessage('Error al actualizar el inventario.');
      setErrorOpen(true);
    }
  };

  const fetchAddVentas = async (idUsuario, estado, serialReferencia) => {
    if (!serialReferencia || !idUsuario || estado == null) {
        console.error('Algunos valores están faltando:', { serialReferencia, idUsuario, estado });
        setErrorMessage('Datos incompletos para agregar venta.');
        setErrorOpen(true);
        return;
    }
    try {
        const response = await VentasServices.addVentas(serialReferencia, idUsuario, estado);
        console.log(response);
    } catch (error) {
        console.error('Error registrando venta:', error);
        setErrorMessage('Error al agregar venta.');
        setErrorOpen(true);
    }
};

const fetchGetIDReferences = async (color,serial,tipopublico) => {
  if (!color || !serial || tipopublico == null) {
      console.error('Algunos valores están faltando:', { color,serial,tipopublico });
      setErrorMessage('Datos incompletos para tomar id referencia.');
      setErrorOpen(true);
      return;
  }
  try {
      const response = await VentasServices.GetReferenciaID(color,serial,tipopublico);
      //console.log(response);
      setCount(response);
  } catch (error) {
      console.error('Error registrando para tomar id referencia:', error);
      setErrorMessage('Error para tomar id referencia.');
      setErrorOpen(true);
  }
};



  const startScanning = () => {
    const html5QrcodeScanner = new Html5QrcodeScanner(
      "qr-reader",
      { fps: 10, qrbox: 500 },
      false
    );

    html5QrcodeScanner.render(
      (decodedText) => {
        setResult(decodedText);
        setSuccessMessage("¡Código QR escaneado con éxito!");
        setSuccessOpen(true);

        // Dividir el texto escaneado usando el separador '/'
        const qrData = decodedText.split('/');

        // Validar que tenga el formato esperado
        if (qrData.length === 6) {
          const [nombreEmpresa, serial, color, ubicacionDescripcion, talla,tipopublico] = qrData;
          //console.log(qrData);
          // Llamar a la función para actualizar el inventario con los datos extraídos
          fetchGetIDReferences(color,serial,tipopublico);
          fetchInventaryQR(nombreEmpresa, serial, color, ubicacionDescripcion, talla);
          fetchAddVentas(formData.idUsuario, formData.estado, count.id);
        console.log(formData.idUsuario+"/", formData.estado,"/", count.id);
        } else {
          console.error('Formato de código QR inválido:', decodedText);
          setErrorMessage('El formato del código QR es inválido. Asegúrate de que tenga el formato empresa/referencia/color/ubicación/talla.');
          setErrorOpen(true);
        }

        // Detener el escáner después de leer el código QR
        html5QrcodeScanner.clear();
      },
      (error) => {
        const message = error.message.includes("NotFoundException")
          ? "No se encontró un código QR. Asegúrate de que el código esté dentro del campo de la cámara e inténtalo nuevamente."
          : "Ocurrió un error inesperado. Por favor, inténtalo de nuevo.";
        setErrorMessage(message);
        setErrorOpen(true);
      }
    );

    setScanner(html5QrcodeScanner);
  };

  const stopScanning = () => {
    if (scanner) {
      scanner.clear();
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
     console.log("DecodeJWT:", decodedData.userId);
  }

  useEffect(() => {
    showJWT();
  }, []);

  

  return (
    <Box sx={{ padding: 2, textAlign: 'center' }}>
      <Typography variant="h6" gutterBottom>
        Escanea el código QR
      </Typography>
      <Box id="qr-reader" sx={{ margin: 'auto', width: '40%', height: '40%' }}></Box>
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
      <SuccessAlert open={successOpen} handleClose={handleSuccessClose} message={successMessage} />
      <ErrorAlert open={errorOpen} handleClose={handleErrorClose} message={errorMessage} />
    </Box>
  );
};

export default QrScanner;
