import React, { useState } from 'react';
import { Box, Button, Typography } from '@mui/material';
import { Html5QrcodeScanner } from 'html5-qrcode';
import ErrorAlert from '../../Alerts/ErrorAlert';
import SuccessAlert from '../../Alerts/SuccesAlert';


const QrScanner = () => {
  const [result, setResult] = useState('No result');
  const [scanner, setScanner] = useState(null);

  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const [errorOpen, setErrorOpen] = useState(false);
  const [successOpen, setSuccessOpen] = useState(false);

  const handleErrorClose = () => setErrorOpen(false);
  const handleSuccessClose = () => setSuccessOpen(false);

  const startScanning = () => {
    const html5QrcodeScanner = new Html5QrcodeScanner(
      "qr-reader",
      { fps: 10, qrbox: 500 },
      false
    );

    html5QrcodeScanner.render(
      (decodedText, decodedResult) => {
        setResult(decodedText);
        setSuccessMessage("QR code scanned successfully!");
        setSuccessOpen(true);
        html5QrcodeScanner.clear(); 
      },
      (error) => {
        //console.error(error);
        const message = error.message.includes("NotFoundException")
          ? "No QR code found. Please ensure the code is within the camera view and try again."
          : "An unexpected error occurred. Please try again.";
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
