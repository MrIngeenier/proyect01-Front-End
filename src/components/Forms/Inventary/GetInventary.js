import React, { useState, useEffect } from 'react';
import {
    Button,Container, TextField, Table, TableBody, TableCell, TableContainer, 
    TableHead, TableRow, Paper,
    Box,Dialog, DialogContent, DialogActions 
} from '@mui/material';



import { jsPDF } from 'jspdf';
import QRCode from 'qrcode';
import { encryptText } from '../../../utils/Encript';
import inventaryServices from '../../../service/inventary.services';
import EmpresaServices from '../../../service/empresa.services';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import UpdateIcon from '@mui/icons-material/Update';
import SuccessAlert from '../../Alerts/SuccesAlert';
import ErrorAlert from '../../Alerts/ErrorAlert';
import UpdateInventary from './UpdateInventary';

function Inventary( ) {
    const [search, setSearch] = useState('');
    const [data, setData] = useState([]);
    const [filteredData, setFilteredData] = useState([]);
    const [filters, setFilters] = useState([]);
    const [openDialog, setOpenDialog] = useState(false);
    const [openDialogUpdate, setOpenDialogUpdate] = useState(false);
    const [errorOpen, setErrorOpen] = useState(false);
    const [successOpen, setSuccessOpen] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

    const handleErrorClose = () => setErrorOpen(false);
    const handleSuccessClose = () => setSuccessOpen(false);
    const [mostrar, setMostrar] = useState(false);

  

    const handleCloseDialog = () => {
        setOpenDialog(false);
    };

    const handleCloseDialogUpdate = () => {
        setOpenDialogUpdate(false);
    };
    const handleShowUpdate = (show) => {
        setMostrar(show);
        localStorage.setItem('show', show);
    };
    useEffect(() => {
        fetchInventary();
    }, []);

    // Busqueda segun el filtro de datos
    const applyFilters = (searchValue, filters) => {
        let filtered = data; // Aquí asumes que ya tienes `data` cargado con los datos originales
    
        // Aplicar búsqueda general
        if (searchValue) {
            filtered = filtered.filter(item => 
                item.empresa.toLowerCase().includes(searchValue.toLowerCase()) ||
                item.referencia.toLowerCase().includes(searchValue.toLowerCase()) ||
                item.color.toLowerCase().includes(searchValue.toLowerCase()) ||
                item.lugar.toLowerCase().includes(searchValue.toLowerCase())
            );
        }
    
        // Aplicar filtros específicos
        if (filters.empresa) {
            filtered = filtered.filter(item => 
                item.empresa.toLowerCase().includes(filters.empresa.toLowerCase())
            );
        }
        if (filters.referencia) {
            filtered = filtered.filter(item => 
                item.referencia.toLowerCase().includes(filters.referencia.toLowerCase())
            );
        }
        if (filters.color) {
            filtered = filtered.filter(item => 
                item.color.toLowerCase().includes(filters.color.toLowerCase())
            );
        }
        if (filters.lugar) {
            filtered = filtered.filter(item => 
                item.lugar.toLowerCase().includes(filters.lugar.toLowerCase())
            );
        }
    
        setFilteredData(filtered); // Actualizas `filteredData` con los resultados filtrados
    };
    
    // Toma de datos segun el filtro
    const handleFilterChange = (event) => {
        const { name, value } = event.target;
        setFilters((prevFilters) => {
            const updatedFilters = {
                ...prevFilters,
                [name]: value
            };
            applyFilters(search, updatedFilters); // Aplica búsqueda y filtros
            return updatedFilters;
        });
    };
    
    const fetchInventary = async () => {
        try {
            const response = await inventaryServices.getInventary();
            //console.log('Response from backend:', response); // Verifica la estructura de los datos aquí
            //console.log('Datos cargados correctamente: '+JSON.stringify(response, null, 2));
        
            setData(response); // Asignar la respuesta al estado
            setFilteredData(response); // Inicializar también filteredData
            //console.log(response);
        } catch (error) {
            console.error('Error fetching inventory:', error);
        }
    };

    const handleSearchChange = (event) => {
        const value = event.target.value;
        setSearch(value);
        applyFilters(value, filters); // Aplica búsqueda y filtros
    };
    
    // Generador de QR
    const handlePdfClick = async (item) => {
        const doc = new jsPDF();
        doc.setFontSize(12);
        doc.setLineWidth(0.5);
       
        // Generar el QR en base64
        try {
            if(item.publico === 'hombre' || item.publico === 'mujer' ){
                const qrText = `${item.empresa}/${item.referencia}/${item.color}/${item.lugar}/${item.publico}`;
                const qrText33 = `${item.empresa}/${item.referencia}/${item.color}/${item.lugar}/${33}/${item.publico}`;
                const qrText34 = `${item.empresa}/${item.referencia}/${item.color}/${item.lugar}/${34}/${item.publico}`;
                const qrText35 = `${item.empresa}/${item.referencia}/${item.color}/${item.lugar}/${35}/${item.publico}`;
                const qrText36 = `${item.empresa}/${item.referencia}/${item.color}/${item.lugar}/${36}/${item.publico}`;
                const qrText37 = `${item.empresa}/${item.referencia}/${item.color}/${item.lugar}/${37}/${item.publico}`;
                const qrText38 = `${item.empresa}/${item.referencia}/${item.color}/${item.lugar}/${38}/${item.publico}`;
                const qrText39 = `${item.empresa}/${item.referencia}/${item.color}/${item.lugar}/${39}/${item.publico}`;
                const qrText40 = `${item.empresa}/${item.referencia}/${item.color}/${item.lugar}/${40}/${item.publico}`;
                const qrText41 = `${item.empresa}/${item.referencia}/${item.color}/${item.lugar}/${41}/${item.publico}`;
                const qrText42 = `${item.empresa}/${item.referencia}/${item.color}/${item.lugar}/${42}/${item.publico}`;
                const qrText43 = `${item.empresa}/${item.referencia}/${item.color}/${item.lugar}/${43}/${item.publico}`;

                const encryptedQrText33 = encryptText(qrText33);
                const encryptedQrText34 = encryptText(qrText34);
                const encryptedQrText35 = encryptText(qrText35);
                const encryptedQrText36 = encryptText(qrText36);
                const encryptedQrText37 = encryptText(qrText37);
                const encryptedQrText38 = encryptText(qrText38);
                const encryptedQrText39 = encryptText(qrText39);
                const encryptedQrText40 = encryptText(qrText40);
                const encryptedQrText41 = encryptText(qrText41);
                const encryptedQrText42 = encryptText(qrText42);
                const encryptedQrText43 = encryptText(qrText43);

                const qrDataUrl33 = await QRCode.toDataURL(encryptedQrText33, { errorCorrectionLevel: 'H' });
                const qrDataUrl34 = await QRCode.toDataURL(encryptedQrText34, { errorCorrectionLevel: 'H' });
                const qrDataUrl35 = await QRCode.toDataURL(encryptedQrText35, { errorCorrectionLevel: 'H' });
                const qrDataUrl36 = await QRCode.toDataURL(encryptedQrText36, { errorCorrectionLevel: 'H' });       
                const qrDataUrl37 = await QRCode.toDataURL(encryptedQrText37, { errorCorrectionLevel: 'H' });   
                const qrDataUrl38 = await QRCode.toDataURL(encryptedQrText38, { errorCorrectionLevel: 'H' });        
                const qrDataUrl39 = await QRCode.toDataURL(encryptedQrText39, { errorCorrectionLevel: 'H' });
                const qrDataUrl40 = await QRCode.toDataURL(encryptedQrText40, { errorCorrectionLevel: 'H' });
                const qrDataUrl41 = await QRCode.toDataURL(encryptedQrText41, { errorCorrectionLevel: 'H' });
                const qrDataUrl42 = await QRCode.toDataURL(encryptedQrText42, { errorCorrectionLevel: 'H' });
                const qrDataUrl43 = await QRCode.toDataURL(encryptedQrText43, { errorCorrectionLevel: 'H' });
                
                const increment = 23; // Incremento en la posición Y
                let startY = 20;
                for (let i = 33; i <= 43; i++) {
                    doc.text(`/${i}`, 195, startY);
                    startY += increment; // Aumenta la posición Y para el siguiente número
                }

                    // Horizontal - Vertical x Ancho x Alto
                    doc.rect(10, 10, 180, 20);
                    doc.addImage(qrDataUrl33, 'PNG', 10,  10, 20, 20);
                    doc.addImage(qrDataUrl33, 'PNG', 30,  10, 20, 20);
                    doc.addImage(qrDataUrl33, 'PNG', 50,  10, 20, 20);
                    doc.addImage(qrDataUrl33, 'PNG', 70,  10, 20, 20);
                    doc.addImage(qrDataUrl33, 'PNG', 90,  10, 20, 20);
                    doc.addImage(qrDataUrl33, 'PNG', 110, 10, 20, 20);
                    doc.addImage(qrDataUrl33, 'PNG', 130, 10, 20, 20);
                    doc.addImage(qrDataUrl33, 'PNG', 150, 10, 20, 20);
                    doc.addImage(qrDataUrl33, 'PNG', 170, 10, 20, 20);
                    doc.text(qrText, 70, 290); 

                    // Horizontal - Vertical x Ancho x Alto
                    doc.rect(10, 33, 180, 20);
                    doc.addImage(qrDataUrl34, 'PNG', 10,  33, 20, 20);
                    doc.addImage(qrDataUrl34, 'PNG', 30,  33, 20, 20);
                    doc.addImage(qrDataUrl34, 'PNG', 50,  33, 20, 20);
                    doc.addImage(qrDataUrl34, 'PNG', 70,  33, 20, 20);
                    doc.addImage(qrDataUrl34, 'PNG', 90,  33, 20, 20);
                    doc.addImage(qrDataUrl34, 'PNG', 110, 33, 20, 20);
                    doc.addImage(qrDataUrl34, 'PNG', 130, 33, 20, 20);
                    doc.addImage(qrDataUrl34, 'PNG', 150, 33, 20, 20);
                    doc.addImage(qrDataUrl34, 'PNG', 170, 33, 20, 20);
                
                    doc.rect(10, 56, 180, 20); 
                    // Horizontal - Vertical x Ancho x Alto
                    doc.addImage(qrDataUrl35, 'PNG', 10,  56, 20, 20);
                    doc.addImage(qrDataUrl35, 'PNG', 30,  56, 20, 20);
                    doc.addImage(qrDataUrl35, 'PNG', 50,  56, 20, 20);
                    doc.addImage(qrDataUrl35, 'PNG', 70,  56, 20, 20);
                    doc.addImage(qrDataUrl35, 'PNG', 90,  56, 20, 20);
                    doc.addImage(qrDataUrl35, 'PNG', 110, 56, 20, 20);
                    doc.addImage(qrDataUrl35, 'PNG', 130, 56, 20, 20);
                    doc.addImage(qrDataUrl35, 'PNG', 150, 56, 20, 20);
                    doc.addImage(qrDataUrl35, 'PNG', 170, 56, 20, 20);
                
                    doc.rect(10, 79, 180, 20); 
                    // Horizontal - Vertical x Ancho x Alto
                    doc.addImage(qrDataUrl36, 'PNG', 10,  79, 20, 20);
                    doc.addImage(qrDataUrl36, 'PNG', 30,  79, 20, 20);
                    doc.addImage(qrDataUrl36, 'PNG', 50,  79, 20, 20);
                    doc.addImage(qrDataUrl36, 'PNG', 70,  79, 20, 20);
                    doc.addImage(qrDataUrl36, 'PNG', 90,  79, 20, 20);
                    doc.addImage(qrDataUrl36, 'PNG', 110, 79, 20, 20);
                    doc.addImage(qrDataUrl36, 'PNG', 130, 79, 20, 20);
                    doc.addImage(qrDataUrl36, 'PNG', 150, 79, 20, 20);
                    doc.addImage(qrDataUrl36, 'PNG', 170, 79, 20, 20);

                    doc.rect(10, 102, 180, 20);
                    // Horizontal - Vertical x Ancho x Alto
                    doc.addImage(qrDataUrl37, 'PNG', 10,  102, 20, 20);
                    doc.addImage(qrDataUrl37, 'PNG', 30,  102, 20, 20);
                    doc.addImage(qrDataUrl37, 'PNG', 50,  102, 20, 20);
                    doc.addImage(qrDataUrl37, 'PNG', 70,  102, 20, 20);
                    doc.addImage(qrDataUrl37, 'PNG', 90,  102, 20, 20);
                    doc.addImage(qrDataUrl37, 'PNG', 110, 102, 20, 20);
                    doc.addImage(qrDataUrl37, 'PNG', 130, 102, 20, 20);
                    doc.addImage(qrDataUrl37, 'PNG', 150, 102, 20, 20);
                    doc.addImage(qrDataUrl37, 'PNG', 170, 102, 20, 20);

                    // Horizontal - Vertical x Ancho x Alto
                    doc.rect(10, 125, 180, 20);
                    doc.addImage(qrDataUrl38, 'PNG', 10,  125, 20, 20);
                    doc.addImage(qrDataUrl38, 'PNG', 30,  125, 20, 20);
                    doc.addImage(qrDataUrl38, 'PNG', 50,  125, 20, 20);
                    doc.addImage(qrDataUrl38, 'PNG', 70,  125, 20, 20);
                    doc.addImage(qrDataUrl38, 'PNG', 90,  125, 20, 20);
                    doc.addImage(qrDataUrl38, 'PNG', 110, 125, 20, 20);
                    doc.addImage(qrDataUrl38, 'PNG', 130, 125, 20, 20);
                    doc.addImage(qrDataUrl38, 'PNG', 150, 125, 20, 20);
                    doc.addImage(qrDataUrl38, 'PNG', 170, 125, 20, 20);
                
                    // Horizontal - Vertical x Ancho x Alto
                    doc.rect(10, 148, 180, 20); 
                    doc.addImage(qrDataUrl39, 'PNG', 10,  148, 20, 20);
                    doc.addImage(qrDataUrl39, 'PNG', 30,  148, 20, 20);
                    doc.addImage(qrDataUrl39, 'PNG', 50,  148, 20, 20);
                    doc.addImage(qrDataUrl39, 'PNG', 70,  148, 20, 20);
                    doc.addImage(qrDataUrl39, 'PNG', 90,  148, 20, 20);
                    doc.addImage(qrDataUrl39, 'PNG', 110, 148, 20, 20);
                    doc.addImage(qrDataUrl39, 'PNG', 130, 148, 20, 20);
                    doc.addImage(qrDataUrl39, 'PNG', 150, 148, 20, 20);
                    doc.addImage(qrDataUrl39, 'PNG', 170, 148, 20, 20);
        
                    // Horizontal - Vertical x Ancho x Alto
                    doc.rect(10, 171, 180, 20); 
                    doc.addImage(qrDataUrl40, 'PNG', 10,  171, 20, 20);
                    doc.addImage(qrDataUrl40, 'PNG', 30,  171, 20, 20);
                    doc.addImage(qrDataUrl40, 'PNG', 50,  171, 20, 20);
                    doc.addImage(qrDataUrl40, 'PNG', 70,  171, 20, 20);
                    doc.addImage(qrDataUrl40, 'PNG', 90,  171, 20, 20);
                    doc.addImage(qrDataUrl40, 'PNG', 110, 171, 20, 20);
                    doc.addImage(qrDataUrl40, 'PNG', 130, 171, 20, 20);
                    doc.addImage(qrDataUrl40, 'PNG', 150, 171, 20, 20);
                    doc.addImage(qrDataUrl40, 'PNG', 170, 171, 20, 20);
                
                    doc.rect(10, 194, 180, 20); 
                    doc.addImage(qrDataUrl41, 'PNG', 10,  194, 20, 20);
                    doc.addImage(qrDataUrl41, 'PNG', 30,  194, 20, 20);
                    doc.addImage(qrDataUrl41, 'PNG', 50,  194, 20, 20);
                    doc.addImage(qrDataUrl41, 'PNG', 70,  194, 20, 20);
                    doc.addImage(qrDataUrl41, 'PNG', 90,  194, 20, 20);
                    doc.addImage(qrDataUrl41, 'PNG', 110, 194, 20, 20);
                    doc.addImage(qrDataUrl41, 'PNG', 130, 194, 20, 20);
                    doc.addImage(qrDataUrl41, 'PNG', 150, 194, 20, 20);
                    doc.addImage(qrDataUrl41, 'PNG', 170, 194, 20, 20);
            

                    doc.rect(10, 217, 180, 20);
                    doc.addImage(qrDataUrl42, 'PNG', 10,  217, 20, 20);
                    doc.addImage(qrDataUrl42, 'PNG', 30,  217, 20, 20);
                    doc.addImage(qrDataUrl42, 'PNG', 50,  217, 20, 20);
                    doc.addImage(qrDataUrl42, 'PNG', 70,  217, 20, 20);
                    doc.addImage(qrDataUrl42, 'PNG', 90,  217, 20, 20);
                    doc.addImage(qrDataUrl42, 'PNG', 110, 217, 20, 20);
                    doc.addImage(qrDataUrl42, 'PNG', 130, 217, 20, 20);
                    doc.addImage(qrDataUrl42, 'PNG', 150, 217, 20, 20);
                    doc.addImage(qrDataUrl42, 'PNG', 170, 217, 20, 20);

                    doc.rect(10, 240, 180, 20);
                    doc.addImage(qrDataUrl43, 'PNG', 10,  240, 20, 20);
                    doc.addImage(qrDataUrl43, 'PNG', 30,  240, 20, 20);
                    doc.addImage(qrDataUrl43, 'PNG', 50,  240, 20, 20);
                    doc.addImage(qrDataUrl43, 'PNG', 70,  240, 20, 20);
                    doc.addImage(qrDataUrl43, 'PNG', 90,  240, 20, 20);
                    doc.addImage(qrDataUrl43, 'PNG', 110, 240, 20, 20);
                    doc.addImage(qrDataUrl43, 'PNG', 130, 240, 20, 20);
                    doc.addImage(qrDataUrl43, 'PNG', 150, 240, 20, 20);
                    doc.addImage(qrDataUrl43, 'PNG', 170, 240, 20, 20);
            // Guardar el PDF
            //doc.save(`QR_${item.empresa+' '+item.referencia+' '+item.color}.pdf`);
            }
           
            if(item.publico === 'niña'){

                const qrText = `${item.empresa}/${item.referencia}/${item.color}/${item.lugar}/${item.publico}`;
                const qrText21 = `${item.empresa}/${item.referencia}/${item.color}/${item.lugar}/${21}/${item.publico}`;
                const qrText22 = `${item.empresa}/${item.referencia}/${item.color}/${item.lugar}/${22}/${item.publico}`;
                const qrText23 = `${item.empresa}/${item.referencia}/${item.color}/${item.lugar}/${23}/${item.publico}`;
                const qrText24 = `${item.empresa}/${item.referencia}/${item.color}/${item.lugar}/${24}/${item.publico}`;
                const qrText25 = `${item.empresa}/${item.referencia}/${item.color}/${item.lugar}/${25}/${item.publico}`;
                const qrText26 = `${item.empresa}/${item.referencia}/${item.color}/${item.lugar}/${26}/${item.publico}`;
                const qrText27 = `${item.empresa}/${item.referencia}/${item.color}/${item.lugar}/${27}/${item.publico}`;
                const qrText28 = `${item.empresa}/${item.referencia}/${item.color}/${item.lugar}/${28}/${item.publico}`;
                const qrText29 = `${item.empresa}/${item.referencia}/${item.color}/${item.lugar}/${29}/${item.publico}`;
                const qrText30 = `${item.empresa}/${item.referencia}/${item.color}/${item.lugar}/${30}/${item.publico}`;
                const qrText31 = `${item.empresa}/${item.referencia}/${item.color}/${item.lugar}/${31}/${item.publico}`;
                const qrText32 = `${item.empresa}/${item.referencia}/${item.color}/${item.lugar}/${32}/${item.publico}`;
                const qrText33 = `${item.empresa}/${item.referencia}/${item.color}/${item.lugar}/${33}/${item.publico}`;
                const qrText34 = `${item.empresa}/${item.referencia}/${item.color}/${item.lugar}/${34}/${item.publico}`;
                const qrText35 = `${item.empresa}/${item.referencia}/${item.color}/${item.lugar}/${35}/${item.publico}`;
                const qrText36 = `${item.empresa}/${item.referencia}/${item.color}/${item.lugar}/${36}/${item.publico}`;

                const encryptedQrText21 = encryptText(qrText21);
                const encryptedQrText22 = encryptText(qrText22);
                const encryptedQrText23 = encryptText(qrText23);
                const encryptedQrText24 = encryptText(qrText24);
                const encryptedQrText25 = encryptText(qrText25);
                const encryptedQrText26 = encryptText(qrText26);
                const encryptedQrText27 = encryptText(qrText27);
                const encryptedQrText28 = encryptText(qrText28);
                const encryptedQrText29 = encryptText(qrText29);
                const encryptedQrText30 = encryptText(qrText30);
                const encryptedQrText31 = encryptText(qrText31);
                const encryptedQrText32 = encryptText(qrText32);
                const encryptedQrText33 = encryptText(qrText33);
                const encryptedQrText34 = encryptText(qrText34);
                const encryptedQrText35 = encryptText(qrText35);
                const encryptedQrText36 = encryptText(qrText36);
                
                const qrDataUrl21 = await QRCode.toDataURL(encryptedQrText21, { errorCorrectionLevel: 'H' });   
                const qrDataUrl22 = await QRCode.toDataURL(encryptedQrText22, { errorCorrectionLevel: 'H' });        
                const qrDataUrl23 = await QRCode.toDataURL(encryptedQrText23, { errorCorrectionLevel: 'H' });
                const qrDataUrl24 = await QRCode.toDataURL(encryptedQrText24, { errorCorrectionLevel: 'H' });
                const qrDataUrl25 = await QRCode.toDataURL(encryptedQrText25, { errorCorrectionLevel: 'H' });
                const qrDataUrl26 = await QRCode.toDataURL(encryptedQrText26, { errorCorrectionLevel: 'H' });
                const qrDataUrl27 = await QRCode.toDataURL(encryptedQrText27, { errorCorrectionLevel: 'H' });
                const qrDataUrl28 = await QRCode.toDataURL(encryptedQrText28, { errorCorrectionLevel: 'H' });
                const qrDataUrl29 = await QRCode.toDataURL(encryptedQrText29, { errorCorrectionLevel: 'H' });
                const qrDataUrl30 = await QRCode.toDataURL(encryptedQrText30, { errorCorrectionLevel: 'H' });
                const qrDataUrl31 = await QRCode.toDataURL(encryptedQrText31, { errorCorrectionLevel: 'H' });
                const qrDataUrl32 = await QRCode.toDataURL(encryptedQrText32, { errorCorrectionLevel: 'H' });
                const qrDataUrl33 = await QRCode.toDataURL(encryptedQrText33, { errorCorrectionLevel: 'H' });
                const qrDataUrl34 = await QRCode.toDataURL(encryptedQrText34, { errorCorrectionLevel: 'H' });
                const qrDataUrl35 = await QRCode.toDataURL(encryptedQrText35, { errorCorrectionLevel: 'H' });
                const qrDataUrl36 = await QRCode.toDataURL(encryptedQrText36, { errorCorrectionLevel: 'H' });       
                

                const increment = 23; // Incremento en la posición Y
                let startY = 20;
                for (let i = 21; i <= 32; i++) {
                    doc.text(`/${i}`, 195, startY);
                    startY += increment; // Aumenta la posición Y para el siguiente número
                }
                doc.rect(10, 10, 180, 20);
                doc.addImage(qrDataUrl21, 'PNG', 10,  10, 20, 20);
                doc.addImage(qrDataUrl21, 'PNG', 30,  10, 20, 20);
                doc.addImage(qrDataUrl21, 'PNG', 50,  10, 20, 20);
                doc.addImage(qrDataUrl21, 'PNG', 70,  10, 20, 20);
                doc.addImage(qrDataUrl21, 'PNG', 90,  10, 20, 20);
                doc.addImage(qrDataUrl21, 'PNG', 110, 10, 20, 20);
                doc.addImage(qrDataUrl21, 'PNG', 130, 10, 20, 20);
                doc.addImage(qrDataUrl21, 'PNG', 150, 10, 20, 20);
                doc.addImage(qrDataUrl21, 'PNG', 170, 10, 20, 20);
                doc.text(qrText, 70, 290); 

                // Horizontal - Vertical x Ancho x Alto
                doc.rect(10, 33, 180, 20);
                doc.addImage(qrDataUrl22, 'PNG', 10,  33, 20, 20);
                doc.addImage(qrDataUrl22, 'PNG', 30,  33, 20, 20);
                doc.addImage(qrDataUrl22, 'PNG', 50,  33, 20, 20);
                doc.addImage(qrDataUrl22, 'PNG', 70,  33, 20, 20);
                doc.addImage(qrDataUrl22, 'PNG', 90,  33, 20, 20);
                doc.addImage(qrDataUrl22, 'PNG', 110, 33, 20, 20);
                doc.addImage(qrDataUrl22, 'PNG', 130, 33, 20, 20);
                doc.addImage(qrDataUrl22, 'PNG', 150, 33, 20, 20);
                doc.addImage(qrDataUrl22, 'PNG', 170, 33, 20, 20);
            
                doc.rect(10, 56, 180, 20); 
                // Horizontal - Vertical x Ancho x Alto
                doc.addImage(qrDataUrl23, 'PNG', 10,  56, 20, 20);
                doc.addImage(qrDataUrl23, 'PNG', 30,  56, 20, 20);
                doc.addImage(qrDataUrl23, 'PNG', 50,  56, 20, 20);
                doc.addImage(qrDataUrl23, 'PNG', 70,  56, 20, 20);
                doc.addImage(qrDataUrl23, 'PNG', 90,  56, 20, 20);
                doc.addImage(qrDataUrl23, 'PNG', 110, 56, 20, 20);
                doc.addImage(qrDataUrl23, 'PNG', 130, 56, 20, 20);
                doc.addImage(qrDataUrl23, 'PNG', 150, 56, 20, 20);
                doc.addImage(qrDataUrl23, 'PNG', 170, 56, 20, 20);
            
                doc.rect(10, 79, 180, 20); 
                // Horizontal - Vertical x Ancho x Alto
                doc.addImage(qrDataUrl24, 'PNG', 10,  79, 20, 20);
                doc.addImage(qrDataUrl24, 'PNG', 30,  79, 20, 20);
                doc.addImage(qrDataUrl24, 'PNG', 50,  79, 20, 20);
                doc.addImage(qrDataUrl24, 'PNG', 70,  79, 20, 20);
                doc.addImage(qrDataUrl24, 'PNG', 90,  79, 20, 20);
                doc.addImage(qrDataUrl24, 'PNG', 110, 79, 20, 20);
                doc.addImage(qrDataUrl24, 'PNG', 130, 79, 20, 20);
                doc.addImage(qrDataUrl24, 'PNG', 150, 79, 20, 20);
                doc.addImage(qrDataUrl24, 'PNG', 170, 79, 20, 20);

                doc.rect(10, 102, 180, 20);
                // Horizontal - Vertical x Ancho x Alto
                doc.addImage(qrDataUrl25, 'PNG', 10,  102, 20, 20);
                doc.addImage(qrDataUrl25, 'PNG', 30,  102, 20, 20);
                doc.addImage(qrDataUrl25, 'PNG', 50,  102, 20, 20);
                doc.addImage(qrDataUrl25, 'PNG', 70,  102, 20, 20);
                doc.addImage(qrDataUrl25, 'PNG', 90,  102, 20, 20);
                doc.addImage(qrDataUrl25, 'PNG', 110, 102, 20, 20);
                doc.addImage(qrDataUrl25, 'PNG', 130, 102, 20, 20);
                doc.addImage(qrDataUrl25, 'PNG', 150, 102, 20, 20);
                doc.addImage(qrDataUrl25, 'PNG', 170, 102, 20, 20);

                // Horizontal - Vertical x Ancho x Alto
                doc.rect(10, 125, 180, 20);
                doc.addImage(qrDataUrl26, 'PNG', 10,  125, 20, 20);
                doc.addImage(qrDataUrl26, 'PNG', 30,  125, 20, 20);
                doc.addImage(qrDataUrl26, 'PNG', 50,  125, 20, 20);
                doc.addImage(qrDataUrl26, 'PNG', 70,  125, 20, 20);
                doc.addImage(qrDataUrl26, 'PNG', 90,  125, 20, 20);
                doc.addImage(qrDataUrl26, 'PNG', 110, 125, 20, 20);
                doc.addImage(qrDataUrl26, 'PNG', 130, 125, 20, 20);
                doc.addImage(qrDataUrl26, 'PNG', 150, 125, 20, 20);
                doc.addImage(qrDataUrl26, 'PNG', 170, 125, 20, 20);
            
                // Horizontal - Vertical x Ancho x Alto
                doc.rect(10, 148, 180, 20); 
                doc.addImage(qrDataUrl27, 'PNG', 10,  148, 20, 20);
                doc.addImage(qrDataUrl27, 'PNG', 30,  148, 20, 20);
                doc.addImage(qrDataUrl27, 'PNG', 50,  148, 20, 20);
                doc.addImage(qrDataUrl27, 'PNG', 70,  148, 20, 20);
                doc.addImage(qrDataUrl27, 'PNG', 90,  148, 20, 20);
                doc.addImage(qrDataUrl27, 'PNG', 110, 148, 20, 20);
                doc.addImage(qrDataUrl27, 'PNG', 130, 148, 20, 20);
                doc.addImage(qrDataUrl27, 'PNG', 150, 148, 20, 20);
                doc.addImage(qrDataUrl27, 'PNG', 170, 148, 20, 20);
    
                // Horizontal - Vertical x Ancho x Alto
                doc.rect(10, 171, 180, 20); 
                doc.addImage(qrDataUrl28, 'PNG', 10,  171, 20, 20);
                doc.addImage(qrDataUrl28, 'PNG', 30,  171, 20, 20);
                doc.addImage(qrDataUrl28, 'PNG', 50,  171, 20, 20);
                doc.addImage(qrDataUrl28, 'PNG', 70,  171, 20, 20);
                doc.addImage(qrDataUrl28, 'PNG', 90,  171, 20, 20);
                doc.addImage(qrDataUrl28, 'PNG', 110, 171, 20, 20);
                doc.addImage(qrDataUrl28, 'PNG', 130, 171, 20, 20);
                doc.addImage(qrDataUrl28, 'PNG', 150, 171, 20, 20);
                doc.addImage(qrDataUrl28, 'PNG', 170, 171, 20, 20);
            
                doc.rect(10, 194, 180, 20); 
                doc.addImage(qrDataUrl29, 'PNG', 10,  194, 20, 20);
                doc.addImage(qrDataUrl29, 'PNG', 30,  194, 20, 20);
                doc.addImage(qrDataUrl29, 'PNG', 50,  194, 20, 20);
                doc.addImage(qrDataUrl29, 'PNG', 70,  194, 20, 20);
                doc.addImage(qrDataUrl29, 'PNG', 90,  194, 20, 20);
                doc.addImage(qrDataUrl29, 'PNG', 110, 194, 20, 20);
                doc.addImage(qrDataUrl29, 'PNG', 130, 194, 20, 20);
                doc.addImage(qrDataUrl29, 'PNG', 150, 194, 20, 20);
                doc.addImage(qrDataUrl29, 'PNG', 170, 194, 20, 20);
        

                doc.rect(10, 217, 180, 20);
                doc.addImage(qrDataUrl30, 'PNG', 10,  217, 20, 20);
                doc.addImage(qrDataUrl30, 'PNG', 30,  217, 20, 20);
                doc.addImage(qrDataUrl30, 'PNG', 50,  217, 20, 20);
                doc.addImage(qrDataUrl30, 'PNG', 70,  217, 20, 20);
                doc.addImage(qrDataUrl30, 'PNG', 90,  217, 20, 20);
                doc.addImage(qrDataUrl30, 'PNG', 110, 217, 20, 20);
                doc.addImage(qrDataUrl30, 'PNG', 130, 217, 20, 20);
                doc.addImage(qrDataUrl30, 'PNG', 150, 217, 20, 20);
                doc.addImage(qrDataUrl30, 'PNG', 170, 217, 20, 20);

                doc.rect(10, 240, 180, 20);
                doc.addImage(qrDataUrl31, 'PNG', 10,  240, 20, 20);
                doc.addImage(qrDataUrl31, 'PNG', 30,  240, 20, 20);
                doc.addImage(qrDataUrl31, 'PNG', 50,  240, 20, 20);
                doc.addImage(qrDataUrl31, 'PNG', 70,  240, 20, 20);
                doc.addImage(qrDataUrl31, 'PNG', 90,  240, 20, 20);
                doc.addImage(qrDataUrl31, 'PNG', 110, 240, 20, 20);
                doc.addImage(qrDataUrl31, 'PNG', 130, 240, 20, 20);
                doc.addImage(qrDataUrl31, 'PNG', 150, 240, 20, 20);
                doc.addImage(qrDataUrl31, 'PNG', 170, 240, 20, 20);

                doc.rect(10, 263, 180, 20);
                doc.addImage(qrDataUrl32, 'PNG', 10,  263, 20, 20);
                doc.addImage(qrDataUrl32, 'PNG', 30,  263, 20, 20);
                doc.addImage(qrDataUrl32, 'PNG', 50,  263, 20, 20);
                doc.addImage(qrDataUrl32, 'PNG', 70,  263, 20, 20);
                doc.addImage(qrDataUrl32, 'PNG', 90,  263, 20, 20);
                doc.addImage(qrDataUrl32, 'PNG', 110, 263, 20, 20);
                doc.addImage(qrDataUrl32, 'PNG', 130, 263, 20, 20);
                doc.addImage(qrDataUrl32, 'PNG', 150, 263, 20, 20);
                doc.addImage(qrDataUrl32, 'PNG', 170, 263, 20, 20);
                
                doc.addPage(); // ----------- NEW PAGE -----------------

                const increment2 = 23; // Incremento en la posición Y
                let startY2 = 20;
                for (let i = 33; i <= 36; i++) {
                    doc.text(`/${i}`, 195, startY2);
                    startY2 += increment2; // Aumenta la posición Y para el siguiente número
                }
                doc.rect(10, 10, 180, 20);
                doc.addImage(qrDataUrl33, 'PNG', 10,  10, 20, 20);
                doc.addImage(qrDataUrl33, 'PNG', 30,  10, 20, 20);
                doc.addImage(qrDataUrl33, 'PNG', 50,  10, 20, 20);
                doc.addImage(qrDataUrl33, 'PNG', 70,  10, 20, 20);
                doc.addImage(qrDataUrl33, 'PNG', 90,  10, 20, 20);
                doc.addImage(qrDataUrl33, 'PNG', 110, 10, 20, 20);
                doc.addImage(qrDataUrl33, 'PNG', 130, 10, 20, 20);
                doc.addImage(qrDataUrl33, 'PNG', 150, 10, 20, 20);
                doc.addImage(qrDataUrl33, 'PNG', 170, 10, 20, 20);
                doc.text(qrText, 70, 290); 

                // Horizontal - Vertical x Ancho x Alto
                doc.rect(10, 33, 180, 20);
                doc.addImage(qrDataUrl34, 'PNG', 10,  33, 20, 20);
                doc.addImage(qrDataUrl34, 'PNG', 30,  33, 20, 20);
                doc.addImage(qrDataUrl34, 'PNG', 50,  33, 20, 20);
                doc.addImage(qrDataUrl34, 'PNG', 70,  33, 20, 20);
                doc.addImage(qrDataUrl34, 'PNG', 90,  33, 20, 20);
                doc.addImage(qrDataUrl34, 'PNG', 110, 33, 20, 20);
                doc.addImage(qrDataUrl34, 'PNG', 130, 33, 20, 20);
                doc.addImage(qrDataUrl34, 'PNG', 150, 33, 20, 20);
                doc.addImage(qrDataUrl34, 'PNG', 170, 33, 20, 20);
            
                doc.rect(10, 56, 180, 20); 
                // Horizontal - Vertical x Ancho x Alto
                doc.addImage(qrDataUrl35, 'PNG', 10,  56, 20, 20);
                doc.addImage(qrDataUrl35, 'PNG', 30,  56, 20, 20);
                doc.addImage(qrDataUrl35, 'PNG', 50,  56, 20, 20);
                doc.addImage(qrDataUrl35, 'PNG', 70,  56, 20, 20);
                doc.addImage(qrDataUrl35, 'PNG', 90,  56, 20, 20);
                doc.addImage(qrDataUrl35, 'PNG', 110, 56, 20, 20);
                doc.addImage(qrDataUrl35, 'PNG', 130, 56, 20, 20);
                doc.addImage(qrDataUrl35, 'PNG', 150, 56, 20, 20);
                doc.addImage(qrDataUrl35, 'PNG', 170, 56, 20, 20);
            
                doc.rect(10, 79, 180, 20); 
                // Horizontal - Vertical x Ancho x Alto
                doc.addImage(qrDataUrl36, 'PNG', 10,  79, 20, 20);
                doc.addImage(qrDataUrl36, 'PNG', 30,  79, 20, 20);
                doc.addImage(qrDataUrl36, 'PNG', 50,  79, 20, 20);
                doc.addImage(qrDataUrl36, 'PNG', 70,  79, 20, 20);
                doc.addImage(qrDataUrl36, 'PNG', 90,  79, 20, 20);
                doc.addImage(qrDataUrl36, 'PNG', 110, 79, 20, 20);
                doc.addImage(qrDataUrl36, 'PNG', 130, 79, 20, 20);
                doc.addImage(qrDataUrl36, 'PNG', 150, 79, 20, 20);
                doc.addImage(qrDataUrl36, 'PNG', 170, 79, 20, 20);
            }

            doc.save(`QR_${item.empresa+' '+item.referencia+' '+item.color+' '+item.publico}.pdf`);

            
        } catch (error) {
            setErrorMessage('Error generating QR code:'+ error);
            setErrorOpen(true);
        }
    };
    
    const handleDelete = async (item) => {
    try {
         await inventaryServices.DeleteInventary(item.empresa,item.referencia,item.color,item.lugar,item.publico);
        //console.log('Response from backend:', response); // Verifica la estructura de los datos aquí
         await EmpresaServices.deleteEmpresa(item.empresa,item.color,item.referencia);
        
        setSuccessMessage(
            "Éxito Borrando.\n" +
            "Empresa: [" + item.empresa + "] " + 
            "Ref: [" + item.referencia + "] " +
            "Color: [" + item.color+"]"
        );
        setSuccessOpen(true);
        fetchInventary();
    } catch (error) {
        setErrorMessage('Error Delete Inventary:'+ error);
        setErrorOpen(true);
    }
    };
    const handleUpdate = async (item) => {
        //onUpdate(true);
        //alert("Mostrar")
        handleShowUpdate();
    }



    return (
        <Container
            
            sx={{
                backgroundColor: '#121212',
                color: 'white',
                border: '2px solid #333',
                borderRadius: '8px',
                opacity: 0.9,
                boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.7)',
                maxWidth: { xs: '350px', sm:'700px', md:'1000px'},
                padding: '20px',
                marginBottom: { xs: '100px'},
                
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
                    sx={{ borderColor: 'white', color: 'white', height: '56px', marginLeft: '8px'}}
                    onClick={fetchInventary}
                >
                    ACTUALIZAR
                </Button>
            </Box>
    
            <Box display="flex" sx={{ padding: '20px 0px' }}>
                <TextField
                    label="Filtro Empresa"
                    variant="outlined"
                    name="empresa"
                    onChange={handleFilterChange}
                    sx={{ width: '25%', margin: '0 8px' }}
                    InputLabelProps={{ style: { color: 'white' } }}
                    InputProps={{
                        style: {
                            color: 'white',
                            backgroundColor: '#333',
                        },
                    }}
                />
                <TextField
                    label="Filtro Referencia"
                    variant="outlined"
                    name="referencia"
                    onChange={handleFilterChange}
                    sx={{ width: '25%', margin: '0 8px' }}
                    InputLabelProps={{ style: { color: 'white' } }}
                    InputProps={{
                        style: {
                            color: 'white',
                            backgroundColor: '#333',
                        },
                    }}
                />
                <TextField
                    label="Filtro Color"
                    variant="outlined"
                    name="color"
                    onChange={handleFilterChange}
                    sx={{ width: '25%', margin: '0 8px' }}
                    InputLabelProps={{ style: { color: 'white' } }}
                    InputProps={{
                        style: {
                            color: 'white',
                            backgroundColor: '#333',
                        },
                    }}
                />
                <TextField
                    label="Filtro Lugar"
                    variant="outlined"
                    name="lugar"
                    onChange={handleFilterChange}
                    sx={{ width: '25%', margin: '0 8px' }}
                    InputLabelProps={{ style: { color: 'white' } }}
                    InputProps={{
                        style: {
                            color: 'white',
                            backgroundColor: '#333',
                        },
                    }}
                />
            </Box>
    
            {/* Contenedor de la tabla con barra de desplazamiento */}
            <Box sx={{
                maxHeight: { xs: '300px', sm: '400px', md: '500px' },
                overflowY: 'auto',
                maxWidth: { xs: '100%', sm: 'auto', md: 'auto' },
                width: '100%',
                margin: '0 auto',
                backgroundColor: '#121212',
                color: 'white',
                border: '2px solid #333',
                borderRadius: '8px',
                padding: '20px',
            }}>
                <TableContainer component={Paper} sx={{ backgroundColor: '#333', borderRadius: '8px' }}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell sx={{ color: 'white' }}>ID</TableCell>
                                <TableCell sx={{ color: 'white' }}>Empresa</TableCell>
                                <TableCell sx={{ color: 'white' }}>Referencia</TableCell>
                                <TableCell sx={{ color: 'white' }}>Color</TableCell>
                                <TableCell sx={{ color: 'white' }}>Lugar</TableCell>
                                <TableCell sx={{ color: 'white' }}>Público</TableCell>
                                <TableCell sx={{ color: 'white' }}>Estado</TableCell>
                                <TableCell sx={{ color: 'white' }}>Valor</TableCell>
                                <TableCell sx={{ color: 'white' }}>21</TableCell>
                                <TableCell sx={{ color: 'white' }}>22</TableCell>
                                <TableCell sx={{ color: 'white' }}>23</TableCell>
                                <TableCell sx={{ color: 'white' }}>24</TableCell>
                                <TableCell sx={{ color: 'white' }}>25</TableCell>
                                <TableCell sx={{ color: 'white' }}>26</TableCell>
                                <TableCell sx={{ color: 'white' }}>27</TableCell>
                                <TableCell sx={{ color: 'white' }}>28</TableCell>
                                <TableCell sx={{ color: 'white' }}>29</TableCell>
                                <TableCell sx={{ color: 'white' }}>30</TableCell>
                                <TableCell sx={{ color: 'white' }}>31</TableCell>
                                <TableCell sx={{ color: 'white' }}>32</TableCell>
                                <TableCell sx={{ color: 'white' }}>33</TableCell>
                                <TableCell sx={{ color: 'white' }}>34</TableCell>
                                <TableCell sx={{ color: 'white' }}>35</TableCell>
                                <TableCell sx={{ color: 'white' }}>36</TableCell>
                                <TableCell sx={{ color: 'white' }}>37</TableCell>
                                <TableCell sx={{ color: 'white' }}>38</TableCell>
                                <TableCell sx={{ color: 'white' }}>39</TableCell>
                                <TableCell sx={{ color: 'white' }}>40</TableCell>
                                <TableCell sx={{ color: 'white' }}>41</TableCell>
                                <TableCell sx={{ color: 'white' }}>42</TableCell>
                                <TableCell sx={{ color: 'white' }}>43</TableCell>
                                {/* Agrega más celdas según sea necesario */}
                                <TableCell sx={{ color: 'white',textAlign: 'center' }}>Acciones</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {filteredData.map((item) => (
                                <TableRow key={item.id}>
                                    <TableCell sx={{ color: 'white' }}>{item.id}</TableCell>
                                    <TableCell sx={{ color: 'white' }}>{item.empresa}</TableCell>
                                    <TableCell sx={{ color: 'white' }}>{item.referencia}</TableCell>
                                    <TableCell sx={{ color: 'white' }}>{item.color}</TableCell>
                                    <TableCell sx={{ color: 'white' }}>{item.lugar}</TableCell>
                                    <TableCell sx={{ color: 'white' }}>{item.publico}</TableCell>
                                    <TableCell sx={{ color: 'white' }}>{item.estado}</TableCell>
                                    <TableCell sx={{ color: 'white' }}>{item.valor}</TableCell>
                                    <TableCell sx={{ color: 'white' }}>{item.t21}</TableCell>
                                    <TableCell sx={{ color: 'white' }}>{item.t22}</TableCell>
                                    <TableCell sx={{ color: 'white' }}>{item.t23}</TableCell>
                                    <TableCell sx={{ color: 'white' }}>{item.t24}</TableCell>
                                    <TableCell sx={{ color: 'white' }}>{item.t25}</TableCell>
                                    <TableCell sx={{ color: 'white' }}>{item.t26}</TableCell>
                                    <TableCell sx={{ color: 'white' }}>{item.t27}</TableCell>
                                    <TableCell sx={{ color: 'white' }}>{item.t28}</TableCell>
                                    <TableCell sx={{ color: 'white' }}>{item.t29}</TableCell>
                                    <TableCell sx={{ color: 'white' }}>{item.t30}</TableCell>
                                    <TableCell sx={{ color: 'white' }}>{item.t31}</TableCell>
                                    <TableCell sx={{ color: 'white' }}>{item.t32}</TableCell>
                                    <TableCell sx={{ color: 'white' }}>{item.t33}</TableCell>
                                    <TableCell sx={{ color: 'white' }}>{item.t34}</TableCell>
                                    <TableCell sx={{ color: 'white' }}>{item.t35}</TableCell>
                                    <TableCell sx={{ color: 'white' }}>{item.t36}</TableCell>
                                    <TableCell sx={{ color: 'white' }}>{item.t37}</TableCell>
                                    <TableCell sx={{ color: 'white' }}>{item.t38}</TableCell>
                                    <TableCell sx={{ color: 'white' }}>{item.t39}</TableCell>
                                    <TableCell sx={{ color: 'white' }}>{item.t40}</TableCell>
                                    <TableCell sx={{ color: 'white' }}>{item.t41}</TableCell>
                                    <TableCell sx={{ color: 'white' }}>{item.t42}</TableCell>
                                    <TableCell sx={{ color: 'white' }}>{item.t43}</TableCell>
                                    <TableCell sx={{ textAlign: 'center', display:'flex', gap:'0px 5px' }}>
                                        <Button
                                            variant="outlined"
                                            color="primary"
                                            sx={{ borderColor: 'white', color: 'white' }}
                                            onClick={() => handlePdfClick(item)}
                                        >
                                            PDF
                                        </Button>
                                        <Button
                                            variant="outlined"
                                            color="secondary"
                                            sx={{ borderColor: 'white', color: 'white' }}
                                            onClick={() => handleDelete(item)}
                                        >
                                            <DeleteForeverIcon />
                                        </Button>
                                        <Button
                                            variant="outlined"
                                            color="secondary"
                                            sx={{ borderColor: 'white', color: 'white' }}
                                            onClick={() => handleUpdate(item)}
                                        >
                                            <UpdateIcon />
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Box>
            {mostrar && <UpdateInventary />}

            <Dialog open={openDialog} onClose={handleCloseDialog}>
                <DialogContent>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseDialog} color="primary">
                        Cancelar
                    </Button>
                </DialogActions>
            </Dialog>

            <Dialog open={openDialogUpdate} onClose={handleCloseDialogUpdate}>
                <DialogContent>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseDialogUpdate} color="primary">
                        Cancelar
                    </Button>
                </DialogActions>
            </Dialog>
            <SuccessAlert open={successOpen} handleClose={handleSuccessClose} message={successMessage} />
            <ErrorAlert  open={errorOpen} handleClose={handleErrorClose} message={errorMessage} />
        </Container>
    );
    
    
    
    
}

export default Inventary;
