import React, { useState, useEffect } from 'react';
import {
    Button,Container, TextField, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper,
    Box
} from '@mui/material';
import { jsPDF } from 'jspdf';
import QRCode from 'qrcode';

import inventaryServices from '../../../service/inventary.services';

function Inventary() {
    const [search, setSearch] = useState('');
    const [data, setData] = useState([]);
    const [filteredData, setFilteredData] = useState([]);

    useEffect(() => {
        fetchInventary();
    }, []);

    const handleSearchChange = (event) => {
        const value = event.target.value;
        setSearch(value);
        
        // Filtra los datos según la búsqueda
        const filtered = data.filter(item => 
            item.empresa.toLowerCase().includes(value.toLowerCase()) ||
            item.referencia.toLowerCase().includes(value.toLowerCase()) ||
            item.color.toLowerCase().includes(value.toLowerCase()) ||
            item.lugar.toLowerCase().includes(value.toLowerCase())
        );
        setFilteredData(filtered);
    };

    const fetchInventary = async () => {
        try {
            const response = await inventaryServices.getInventary();
            //console.log('Response from backend:', response); // Verifica la estructura de los datos aquí

            setData(response); // Asignar la respuesta al estado
            setFilteredData(response); // Inicializar también filteredData
        } catch (error) {
            console.error('Error fetching inventory:', error);
        }
    };

    const handlePdfClick = async (item) => {
        const doc = new jsPDF();

        // Agregar contenido al PDF
        //doc.setFontSize(20);
        //doc.text("Detalles del Item", 10, 20);
        doc.setFontSize(12);
        doc.setLineWidth(0.5);
        //doc.text(`ID: ${item.idinventario}`, 20, 25);
        //doc.text(`Empresa: ${item.empresa}`, 20, 30);
        //doc.text(`Referencia: ${item.referencia}`, 20, 35);
        //doc.text(`Color: ${item.color}`, 20, 40);
        //doc.text(`Ubicación: ${item.lugar}`, 20, 45);

        // Generar el QR en base64
        try {
            const qrDataUrl34 = await QRCode.toDataURL(item.empresa+'/'+item.referencia+'/'+item.color+'/'+item.lugar+'/'+34, { errorCorrectionLevel: 'H' });
            doc.rect(10, 20, 180, 20);
            doc.addImage(qrDataUrl34, 'PNG', 10,  20, 20, 20);
            doc.addImage(qrDataUrl34, 'PNG', 30,  20, 20, 20);
            doc.addImage(qrDataUrl34, 'PNG', 50,  20, 20, 20);
            doc.addImage(qrDataUrl34, 'PNG', 70,  20, 20, 20);
            doc.addImage(qrDataUrl34, 'PNG', 90,  20, 20, 20);
            doc.addImage(qrDataUrl34, 'PNG', 110, 20, 20, 20);
            doc.addImage(qrDataUrl34, 'PNG', 130, 20, 20, 20);
            doc.addImage(qrDataUrl34, 'PNG', 150, 20, 20, 20);
            doc.addImage(qrDataUrl34, 'PNG', 170, 20, 20, 20);
            doc.text(`${item.empresa+'/'+item.referencia+'/'+item.color+'/'+item.lugar+'/'}34`, 
                80, 45);

            const qrDataUrl35 = await QRCode.toDataURL(item.empresa+'/'+item.referencia+'/'+item.color+'/'+item.lugar+'/'+35, { errorCorrectionLevel: 'H' });
            doc.rect(10, 50, 180, 20);
            doc.addImage(qrDataUrl35, 'PNG', 10,  50, 20, 20);
            doc.addImage(qrDataUrl35, 'PNG', 30,  50, 20, 20);
            doc.addImage(qrDataUrl35, 'PNG', 50,  50, 20, 20);
            doc.addImage(qrDataUrl35, 'PNG', 70,  50, 20, 20);
            doc.addImage(qrDataUrl35, 'PNG', 90,  50, 20, 20);
            doc.addImage(qrDataUrl35, 'PNG', 110, 50, 20, 20);
            doc.addImage(qrDataUrl35, 'PNG', 130, 50, 20, 20);
            doc.addImage(qrDataUrl35, 'PNG', 150, 50, 20, 20);
            doc.addImage(qrDataUrl35, 'PNG', 170, 50, 20, 20);
            doc.text(`${item.empresa+'/'+item.referencia+'/'+item.color+'/'+item.lugar+'/'}35`,
                 80, 75);

            const qrDataUrl36 = await QRCode.toDataURL(item.empresa+'/'+item.referencia+'/'+item.color+'/'+item.lugar+'/'+36, { errorCorrectionLevel: 'H' });
            doc.rect(10, 80, 180, 20); 
            doc.addImage(qrDataUrl36, 'PNG', 10,  80, 20, 20);
            doc.addImage(qrDataUrl36, 'PNG', 30,  80, 20, 20);
            doc.addImage(qrDataUrl36, 'PNG', 50,  80, 20, 20);
            doc.addImage(qrDataUrl36, 'PNG', 70,  80, 20, 20);
            doc.addImage(qrDataUrl36, 'PNG', 90,  80, 20, 20);
            doc.addImage(qrDataUrl36, 'PNG', 110, 80, 20, 20);
            doc.addImage(qrDataUrl36, 'PNG', 130, 80, 20, 20);
            doc.addImage(qrDataUrl36, 'PNG', 150, 80, 20, 20);
            doc.addImage(qrDataUrl36, 'PNG', 170, 80, 20, 20);
            doc.text(`${item.empresa+'/'+item.referencia+'/'+item.color+'/'+item.lugar+'/'}36`,
                 80, 105);

            const qrDataUrl37 = await QRCode.toDataURL(item.empresa+'/'+item.referencia+'/'+item.color+'/'+item.lugar+'/'+37, { errorCorrectionLevel: 'H' });
            doc.rect(10, 110, 180, 20); 
            doc.addImage(qrDataUrl37, 'PNG', 10,  110, 20, 20);
            doc.addImage(qrDataUrl37, 'PNG', 30,  110, 20, 20);
            doc.addImage(qrDataUrl37, 'PNG', 50,  110, 20, 20);
            doc.addImage(qrDataUrl37, 'PNG', 70,  110, 20, 20);
            doc.addImage(qrDataUrl37, 'PNG', 90,  110, 20, 20);
            doc.addImage(qrDataUrl37, 'PNG', 110, 110, 20, 20);
            doc.addImage(qrDataUrl37, 'PNG', 130, 110, 20, 20);
            doc.addImage(qrDataUrl37, 'PNG', 150, 110, 20, 20);
            doc.addImage(qrDataUrl37, 'PNG', 170, 110, 20, 20);
            doc.text(`${item.empresa+'/'+item.referencia+'/'+item.color+'/'+item.lugar+'/'}37`,
                 80, 135);
                 
            const qrDataUrl38 = await QRCode.toDataURL(item.empresa+'/'+item.referencia+'/'+item.color+'/'+item.lugar+'/'+38, { errorCorrectionLevel: 'H' });
            doc.rect(10, 140, 180, 20); 
            doc.addImage(qrDataUrl38, 'PNG', 10,  140, 20, 20);
            doc.addImage(qrDataUrl38, 'PNG', 30,  140, 20, 20);
            doc.addImage(qrDataUrl38, 'PNG', 50,  140, 20, 20);
            doc.addImage(qrDataUrl38, 'PNG', 70,  140, 20, 20);
            doc.addImage(qrDataUrl38, 'PNG', 90,  140, 20, 20);
            doc.addImage(qrDataUrl38, 'PNG', 110, 140, 20, 20);
            doc.addImage(qrDataUrl38, 'PNG', 130, 140, 20, 20);
            doc.addImage(qrDataUrl38, 'PNG', 150, 140, 20, 20);
            doc.addImage(qrDataUrl38, 'PNG', 170, 140, 20, 20);

            doc.text(`${item.empresa+'/'+item.referencia+'/'+item.color+'/'+item.lugar+'/'}38`,
                 80, 165);
            doc.rect(10, 170, 180, 20); 
            const qrDataUrl39 = await QRCode.toDataURL(item.empresa+'/'+item.referencia+'/'+item.color+'/'+item.lugar+'/'+39, { errorCorrectionLevel: 'H' });
            doc.addImage(qrDataUrl39, 'PNG', 10,  170, 20, 20);
            doc.addImage(qrDataUrl39, 'PNG', 30,  170, 20, 20);
            doc.addImage(qrDataUrl39, 'PNG', 50,  170, 20, 20);
            doc.addImage(qrDataUrl39, 'PNG', 70,  170, 20, 20);
            doc.addImage(qrDataUrl39, 'PNG', 90,  170, 20, 20);
            doc.addImage(qrDataUrl39, 'PNG', 110, 170, 20, 20);
            doc.addImage(qrDataUrl39, 'PNG', 130, 170, 20, 20);
            doc.addImage(qrDataUrl39, 'PNG', 150, 170, 20, 20);
            doc.addImage(qrDataUrl39, 'PNG', 170, 170, 20, 20);

            doc.text(`${item.empresa+'/'+item.referencia+'/'+item.color+'/'+item.lugar+'/'}39`,
                 80, 195);
            // Guardar el PDF
            doc.save(`QR_${item.empresa+' '+item.referencia+' '+item.color}.pdf`);
        } catch (error) {
            console.error('Error generating QR code:', error);
        }
    };

    

    return (
        <Container
        maxWidth="lg"
        sx={{
            backgroundColor: '#121212',
            color: 'white',
            border: '2px solid #333',
            borderRadius: '8px',
            opacity: 0.9,
            boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.7)',
            padding: '20px',
        }}
    >
        <Box display="flex" alignItems="center" sx={{ padding: '20px 0px' }}>
            <TextField
                label="Buscar por Empresa, Referencia, Color o Lugar"
                variant="outlined"
                value={search}
                onChange={handleSearchChange}
                sx={{ width: '80%', margin: 'normal', height: '56px' }}
                InputLabelProps={{ style: { color: 'white' } }}
                InputProps={{
                    style: {
                        color: 'white',
                        backgroundColor: '#333',
                    },
                }}
            />
            <Button
                variant="outlined"
                color='primary'
                sx={{ borderColor: 'white', color: 'white', height: '56px', marginLeft: '8px', width: '20%' }}
                onClick={fetchInventary}
            >
                ACTUALIZAR
            </Button>
        </Box>

        {/* Contenedor de la tabla con barra de desplazamiento */}
        <Box sx={{  maxHeight: { xs: '300px', sm: '400px', md: '500px' },
                overflowY: 'auto',
                maxWidth: {
                    xs: '100%',  // Ancho completo en pantallas extra pequeñas
                    sm: 'auto', // Ancho máximo de 300px en pantallas pequeñas
                    md: 'auto'  // Ancho máximo de 500px en pantallas medianas y más grandes
                },
                width: '100%',
                margin: '0 auto',
                backgroundColor: '#121212',
                color: 'white',
                border: '2px solid #333',
                borderRadius: '8px',
                padding: '20px', }}> {/* Ajusta la altura máxima según sea necesario */}
            <TableContainer component={Paper} sx={{ backgroundColor: '#333', borderRadius: '8px' }}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell sx={{ color: 'white' }}>ID</TableCell>
                            <TableCell sx={{ color: 'white' }}>Empresa</TableCell>
                            <TableCell sx={{ color: 'white' }}>Referencia</TableCell>
                            <TableCell sx={{ color: 'white' }}>Color</TableCell>
                            <TableCell sx={{ color: 'white' }}>Ubicación</TableCell>
                            <TableCell sx={{ color: 'white' }}>34</TableCell>
                            <TableCell sx={{ color: 'white' }}>35</TableCell>
                            <TableCell sx={{ color: 'white' }}>36</TableCell>
                            <TableCell sx={{ color: 'white' }}>37</TableCell>
                            <TableCell sx={{ color: 'white' }}>38</TableCell>
                            <TableCell sx={{ color: 'white' }}>39</TableCell>
                            <TableCell sx={{ color: 'white' }}>40</TableCell>
                            <TableCell sx={{ color: 'white' }}>Buttons</TableCell>

                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {filteredData.map((item) => (
                            <TableRow key={item.idinventario}>
                                <TableCell sx={{ color: 'white' }}>{item.idinventario}</TableCell>
                                <TableCell sx={{ color: 'white' }}>{item.empresa}</TableCell>
                                <TableCell sx={{ color: 'white' }}>{item.referencia}</TableCell>
                                <TableCell sx={{ color: 'white' }}>{item.color}</TableCell>
                                <TableCell sx={{ color: 'white' }}>{item.lugar}</TableCell>
                                <TableCell sx={{ color: 'white' }}>{item.t34 || 0}</TableCell>
                                <TableCell sx={{ color: 'white' }}>{item.t35 || 0}</TableCell>
                                <TableCell sx={{ color: 'white' }}>{item.t36 || 0}</TableCell>
                                <TableCell sx={{ color: 'white' }}>{item.t37 || 0}</TableCell>
                                <TableCell sx={{ color: 'white' }}>{item.t38 || 0}</TableCell>
                                <TableCell sx={{ color: 'white' }}>{item.t39 || 0}</TableCell>
                                <TableCell sx={{ color: 'white' }}>{item.t40 || 0}</TableCell>
                                <Box sx={{display: 'flex',justifyContent: 'center',alignItems: 'center',height: '100px',  }}>
                                    <Button variant="outlined" color="primary"sx={{borderColor: 'white',color: 'white',}} onClick={() => handlePdfClick(item)} >
                                        PDF
                                    </Button>
                                </Box>

                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Box>
    </Container>
    );
}

export default Inventary;
