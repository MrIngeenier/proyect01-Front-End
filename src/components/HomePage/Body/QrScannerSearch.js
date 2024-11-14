import React, { useState } from 'react';
import { Html5QrcodeScanner } from 'html5-qrcode';
import ErrorAlert from '../../Alerts/ErrorAlert';
import SuccessAlert from '../../Alerts/SuccesAlert';
import inventaryServices from '../../../service/inventary.services';
import { Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Box, Typography } from '@mui/material';

const QrScannerSearch = () => {
  const [result, setResult] = useState('No result');
  const [scanner, setScanner] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [errorOpen, setErrorOpen] = useState(false);
  const [successOpen, setSuccessOpen] = useState(false);
  const [data, setData] = useState(null); // Cambiado a null, ya que solo es un solo objeto

  const handleErrorClose = () => setErrorOpen(false);
  const handleSuccessClose = () => setSuccessOpen(false);

  const startScanning = () => {
    const html5QrcodeScanner = new Html5QrcodeScanner("qr-reader", { fps: 10, qrbox: 500 }, false);

    const fetchInventary = async (empresa, serial, color, lugar, publico) => {
      try {
        const response = await inventaryServices.searchQR(empresa, serial, color, lugar, publico);
        setData(response.body[0]); // Asegúrate de que estás tomando el primer objeto del array
      } catch (error) {
        console.error('Error fetching inventory:', error);
      }
    };

    html5QrcodeScanner.render(
      (decodedText) => {
        setResult(decodedText);
        setSuccessMessage("¡Código QR escaneado con éxito!");
        setSuccessOpen(true);

        // Dividir el texto escaneado usando el separador '/'
        const qrData = decodedText.split('/').map(item => item.replace(/^'|'$/g, '').trim());

        // Validar que tenga el formato esperado
        if (qrData.length === 6) {
          const [empresa, serial, color, lugar, talla, publico] = qrData;
          fetchInventary(empresa, serial, color, lugar, publico);
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

  return (
    <Box sx={{ padding: 2, textAlign: 'center' }}>
      <Typography variant="h6" gutterBottom>
        QR Busqueda
      </Typography>
      <Box id="qr-reader" sx={{ margin: 'auto', width: '40%', height: '40%' }}></Box>
      <Button variant="contained" color="primary" sx={{ marginTop: 2 }} onClick={startScanning}>
        Iniciar Escaneo
      </Button>
      <Button variant="contained" color="secondary" sx={{ marginTop: 2 }} onClick={stopScanning}>
        Detener Escaneo
      </Button>
      <Typography variant="body1" sx={{ marginTop: 2 }}>
        Resultado: {result}
      </Typography>

      {data && (
        <TableContainer component={Paper} sx={{ backgroundColor: '#333', borderRadius: '8px', justifyContent: 'center', overflowX: 'auto', width: 'auto' }}>
          <Table size="small" sx={{ tableLayout: 'fixed', width: { xs: '400%', md: '100%' } }}>
            <TableHead>
              <TableRow>
                <TableCell sx={{ color: 'white', width: '6%' }}>Empresa</TableCell>
                <TableCell sx={{ color: 'white', width: '8%' }}>Referencia</TableCell>
                <TableCell sx={{ color: 'white', width: '6%' }}>Color</TableCell>
                <TableCell sx={{ color: 'white', width: '6%' }}>Lugar</TableCell>
                <TableCell sx={{ color: 'white', width: '6%' }}>Público</TableCell>
                <TableCell sx={{ color: 'white', width: '4%' }}>Estado</TableCell>
                <TableCell sx={{ color: 'white', width: '3%' }}>34</TableCell>
                <TableCell sx={{ color: 'white', width: '3%' }}>35</TableCell>
                <TableCell sx={{ color: 'white', width: '3%' }}>36</TableCell>
                <TableCell sx={{ color: 'white', width: '3%' }}>37</TableCell>
                <TableCell sx={{ color: 'white', width: '3%' }}>38</TableCell>
                <TableCell sx={{ color: 'white', width: '3%' }}>39</TableCell>
                <TableCell sx={{ color: 'white', width: '3%' }}>40</TableCell>
                <TableCell sx={{ color: 'white', width: '3%' }}>41</TableCell>
                <TableCell sx={{ color: 'white', width: '3%' }}>42</TableCell>
                <TableCell sx={{ color: 'white', width: '3%' }}>43</TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              <TableRow>
                <TableCell sx={{ color: 'white' }}>{data.empresa}</TableCell>
                <TableCell sx={{ color: 'white' }}>{data.referencia}</TableCell>
                <TableCell sx={{ color: 'white' }}>{data.color}</TableCell>
                <TableCell sx={{ color: 'white' }}>{data.lugar}</TableCell>
                <TableCell sx={{ color: 'white' }}>{data.publico}</TableCell>
                <TableCell sx={{ color: 'white' }}>{data.estado}</TableCell>
                <TableCell sx={{ color: 'white' }}>{data.t34}</TableCell>
                <TableCell sx={{ color: 'white' }}>{data.t35}</TableCell>
                <TableCell sx={{ color: 'white' }}>{data.t36}</TableCell>
                <TableCell sx={{ color: 'white' }}>{data.t37}</TableCell>
                <TableCell sx={{ color: 'white' }}>{data.t38}</TableCell>
                <TableCell sx={{ color: 'white' }}>{data.t39}</TableCell>
                <TableCell sx={{ color: 'white' }}>{data.t40}</TableCell>
                <TableCell sx={{ color: 'white' }}>{data.t41}</TableCell>
                <TableCell sx={{ color: 'white' }}>{data.t42}</TableCell>
                <TableCell sx={{ color: 'white' }}>{data.t43}</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      )}

      <SuccessAlert open={successOpen} handleClose={handleSuccessClose} message={successMessage} />
      <ErrorAlert open={errorOpen} handleClose={handleErrorClose} message={errorMessage} />
    </Box>
  );
};

export default QrScannerSearch;
